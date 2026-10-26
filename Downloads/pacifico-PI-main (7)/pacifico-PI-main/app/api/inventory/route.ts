import pool from "@/shared/lib/db";
import { NextResponse } from "next/server";
import {apiError,checkBranches,getActor,HttpError,readAllocations,readBody,transaction,validId,
} from "@/shared/utils/inventory-access";
import { supabase } from "@/shared/lib/supabase";

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Consultar inventario según empresa y rol
 *     description: ADMIN consulta su empresa. GERENTE y CAJERO consultan únicamente su sucursal activa. El acceso de CAJERO es de lectura para ventas.
 *     tags: [Inventario]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Array agrupado por branch_id con productos. Devuelve [] si no hay existencias registradas.
 *       401:
 *         description: Sesión inválida.
 *       403:
 *         description: Usuario, empresa o sucursal no autorizados.
 *       500:
 *         description: Error interno.
 */
export async function GET(request: Request) {
    try {
        const actor = await getActor(request, [1, 2, 3]);

        const { rows } = await pool.query(
            `SELECT
                i.branch_id::text AS branch_id,
                jsonb_agg(
                    jsonb_build_object(
                        'inventario_id', i.id::text,
                        'product_id', p.id::text,
                        'name', p.name,
                        'foto_url', p.foto_url,
                        'description', p.description,
                        'price', p.price,
                        'quantity', i.quantity,
                        'min_stock', i.min_stock,
                        'updated_at', i.updated_at
                    )
                    ORDER BY p.name, p.id
                ) AS productos
            FROM public.inventario i
            JOIN public.productos p
                ON p.id = i.product_id
                AND p.company_id = i.company_id
            JOIN public.sucursales s
                ON s.id = i.branch_id
                AND s.company_id = i.company_id
            WHERE i.company_id = $1
                AND p.status = true
                AND s.status = true
                AND ($2::bigint IS NULL OR i.branch_id = $2)
            GROUP BY i.branch_id
            ORDER BY i.branch_id`,
            [
                actor.company_id,
                actor.rol_id === 1 ? null : actor.branch_id,
            ]
        );

        return NextResponse.json(rows, {
            headers: { "Cache-Control": "no-store" },
        });
    } catch (error) {
        return apiError(error);
    }
}

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Agregar existencias de un producto registrado
 *     description: Suma quantity al inventario existente o crea su asignación. ADMIN elige sucursales de su empresa. GERENTE solo puede usar la propia. Si se omite min_stock, conserva el existente o utiliza 5 en un registro nuevo.
 *     tags: [Inventario]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id, branches]
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "25"
 *               branches:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   $ref: '#/components/schemas/ProductBranchAllocation'
 *     responses:
 *       200:
 *         description: Devuelve success y data con el inventario resultante.
 *       400:
 *         description: Datos no válidos.
 *       401:
 *         description: Sesión inválida.
 *       403:
 *         description: Rol o sucursal no permitidos.
 *       404:
 *         description: Producto activo o sucursales no encontrados.
 *       409:
 *         description: Conflicto con los datos o cantidad fuera de rango.
 *       500:
 *         description: Error interno.
 */
export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Sesión vencida o token inválido" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !authUser) {
            return NextResponse.json(
                { error: `Ocurrió un error al obtener la información del usuario ${authError?.message || authError}` },
                { status: 401 }
            );
        }

        const currentUserQuery = await pool.query(
            `SELECT rol_id, branch_id, company_id FROM usuarios WHERE auth_user_id = $1`,
            [authUser.id]
        );

        const currentUser = currentUserQuery.rows[0];

        if (!currentUser) {
            return NextResponse.json(
                { error: "No se encontró un perfil de usuario asociado a esta sesión" },
                { status: 404 }
            );
        }

        if (Number(currentUser.rol_id) !== 1 && Number(currentUser.rol_id) !== 2) {
            return NextResponse.json(
                { error: "No tienes permiso para actualizar el inventario" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const category_id = Number(body.category_id);
        const branches = body.branches;

        if (!category_id || isNaN(category_id)) {
            return NextResponse.json(
                { error: "El ID del producto es inválido o no fue enviado" },
                { status: 400 }
            );
        }

        if (!Array.isArray(branches) || branches.length === 0) {
            return NextResponse.json(
                { error: "Se requiere un arreglo de sucursales válido" },
                { status: 400 }
            );
        }

        for (const item of branches) {
            if (!item.branch_id || typeof item.quantity !== 'number') {
                return NextResponse.json(
                    { error: "Los datos de asignación de sucursales están incompletos (requiere branch_id y quantity)" },
                    { status: 400 }
                );
            }
        }

        const client = await pool.connect();
        const updatedInventory = [];

        try {
            await client.query('BEGIN');

            const productQuery = await client.query(
                `SELECT id
                FROM public.productos
                WHERE id = $1
                    AND company_id = $2
                    AND status = true
                FOR UPDATE`,
                [category_id, currentUser.company_id]
            );

            if (!productQuery.rows[0]) {
                await client.query('ROLLBACK');
                return NextResponse.json(
                    { error: "Producto activo no encontrado en tu empresa" },
                    { status: 404 }
                );
            }

            const branchIds = branches.map(item => item.branch_id);
            const checkBranchesQuery = await client.query(
                `SELECT id FROM public.sucursales WHERE id = ANY($1) AND company_id = $2`,
                [branchIds, currentUser.company_id]
            );

            if (checkBranchesQuery.rowCount !== branchIds.length) {
                await client.query('ROLLBACK');
                return NextResponse.json(
                    { error: "Una o más sucursales asignadas no pertenecen a tu empresa" },
                    { status: 403 }
                );
            }

            for (const branch of branches) {
                const result = await client.query(
                    `INSERT INTO public.inventario AS stock (
                        company_id, branch_id, product_id,
                        quantity, min_stock
                    )
                    VALUES ($1, $2, $3, $4, COALESCE($5::integer, 5))
                    ON CONFLICT (branch_id, product_id)
                    DO UPDATE SET
                        quantity = stock.quantity + EXCLUDED.quantity,
                        min_stock = COALESCE($5::integer, stock.min_stock),
                        updated_at = now()
                    WHERE stock.company_id = EXCLUDED.company_id
                    RETURNING *`,
                    [
                        currentUser.company_id,
                        branch.branch_id,
                        category_id,
                        branch.quantity,
                        branch.min_stock ?? null,
                    ]
                );

                if (!result.rows[0]) {
                    await client.query('ROLLBACK');
                    return NextResponse.json(
                        { error: "La asignación de inventario no corresponde a la empresa" },
                        { status: 409 }
                    );
                }

                updatedInventory.push(result.rows[0]);
            }

            await client.query('COMMIT');

        } catch (dbError) {
            await client.query('ROLLBACK');
            throw dbError;
        } finally {
            client.release();
        }

        return NextResponse.json(
            { message: "Existencias agregadas con éxito", data: updatedInventory },
            { status: 200 }
        );

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: `Error interno en el backend: ${err instanceof Error ? err.message : String(err)}` },
            { status: 500 }
        );
    }
}