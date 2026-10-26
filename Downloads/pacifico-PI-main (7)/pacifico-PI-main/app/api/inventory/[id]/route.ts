import pool from "@/shared/lib/db";
import { NextResponse } from "next/server";
import {apiError,getActor,HttpError,validId,
} from "@/shared/utils/inventory-access";

/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     summary: Obtener inventario de una sucursal autorizada
 *     description: ADMIN consulta sucursales de su empresa. GERENTE y CAJERO solo pueden consultar la propia.
 *     tags: [Inventario]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sucursal
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Array agrupado por branch_id con productos. Devuelve [] si la sucursal no tiene productos activos asignados.
 *       400:
 *         description: ID no válido.
 *       401:
 *         description: Sesión inválida.
 *       403:
 *         description: Sucursal fuera del alcance del usuario.
 *       404:
 *         description: Sucursal inexistente, inactiva o de otra empresa.
 *       500:
 *         description: Error interno.
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const actor = await getActor(request, [1, 2, 3]);
        const { id } = await params;
        const branchId = validId(id);

        if (actor.rol_id !== 1 && actor.branch_id !== branchId) {
            throw new HttpError(403, "Solo puedes consultar tu sucursal");
        }

        const branch = await pool.query(
            `SELECT id
            FROM public.sucursales
            WHERE id = $1
                AND company_id = $2
                AND status = true`,
            [branchId, actor.company_id]
        );

        if (!branch.rows[0]) {
            throw new HttpError(
                404,
                "Sucursal activa no encontrada en tu empresa"
            );
        }

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
                AND i.branch_id = $2
                AND p.status = true
                AND s.status = true
            GROUP BY i.branch_id`,
            [actor.company_id, branchId]
        );

        return NextResponse.json(rows, {
            headers: { "Cache-Control": "no-store" },
        });
    } catch (error) {
        return apiError(error);
    }
}