import { NextResponse } from "next/server";
import { pool } from "@/shared/lib/db"
import { supabase } from "@/shared/lib/supabase";
import { validarAdmin } from "@/shared/utils/backend-funcs";

/**
 * @swagger
 * /api/sucursales/{id}:
 *   get:
 *     summary: Obtener la sucursal por id
 *     description: Consulta la base de datos y devuelve una lista con los registros de la tabla sucursales de acuerdo al id.
 *     tags:
 *       - Sucursales
 *     parameters:
 *      - in: path
 *       name: id
 *       required: true
 *       schema:
 *       type: integer
 *       minimum: 1
 *     responses:
 *       200:
 *         description: Lista la sucursal recuperada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 2
 *                   nombre:
 *                     type: string
 *                     example: "Sucursal Centro"
 *                   direccion:
 *                     type: string
 *                     example: "Av. Principal 123"
 *                   telefono:
 *                     type: string
 *                     example: "314 125 7959"
 *                   info_contacto:
 *                     type: string
 *                     example: "Esta es la información de contacto"
 *                   estado:
 *                     type: boolean
 *                     example: true
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-09-04T17:24:00Z"
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-09-04T17:25:00Z"
/**
 * @swagger
 * /api/sucursales/{id}:
 *   get:
 *     summary: Obtener la sucursal por ID
 *     description: Devuelve la información de una sucursal.
 *     tags:
 *       - Sucursales
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sucursal
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Información de la sucursal obtenida.
 *       400:
 *         description: ID no válido.
 *       401:
 *         description: Sesión inválida o token faltante.
 *       403:
 *         description: Sin permiso para consultar la sucursal.
 *       404:
 *         description: Sucursal no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */

export async function GET(
    request: Request,
    { params } : { params: Promise<{ id : string }> }
) {
    try {

        const authHeader = request.headers.get("Authorization")

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "No autorizado. Falta el token de sesión." },
                { status: 401 }
            )
        }

        const token = authHeader.split(" ")[1]

        const { data: { user }, error: authError } = await supabase.auth.getUser(token)

        if (authError || !user) {
            return NextResponse.json(
                { error: "Sesión expirada o token inválido" },
                { status: 401 }
            )
        }

        const resolvedParams = await params;
        const branchId = parseInt(resolvedParams.id, 10);

        const response = await pool.query(
            `SELECT * FROM sucursales WHERE id = $1;`, [branchId]
        );

        const branch = response.rows[0];

        const usersResponse = await pool.query(
            `SELECT id, name, last_name, email, rol_id
            FROM usuarios
            WHERE branch_id = $1;`,
            [branchId]
        );

        return NextResponse.json(
            { 
                message: "Has obtenido la información de las sucursales con éxito.",
                data: {
                    ...branch,
                    usuarios: usersResponse.rows
                }
            },
            { status: 200 }
        )

        } catch (error) {
            console.error(error)
            return NextResponse.json(
                { error: "No se pudo obtener la información de las sucursales" },
                { status: 500 }
            )
        }
}
/**
 * @swagger
 * /api/sucursales/{id}:
 *   put:
 *     summary: Modificar una sucursal propia
 *     tags: [Sucursales]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, direccion, estado]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Sucursal Centro
 *               direccion:
 *                 type: string
 *                 example: Av. Principal 123
 *               telefono:
 *                 type: string
 *                 nullable: true
 *                 example: "3141257959"
 *               info_contacto:
 *                 type: string
 *                 nullable: true
 *                 example: Atención de lunes a sábado
 *               estado:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Sucursal actualizada. Devuelve message y data.
 *       400:
 *         description: ID, JSON o campos no válidos.
 *       401:
 *         description: Sesión inválida.
 *       403:
 *         description: Se requiere una cuenta ADMIN activa.
 *       404:
 *         description: Sucursal inexistente o que no pertenece al administrador.
 *       500:
 *         description: Error interno del servidor.
 */

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const adminId = await validarAdmin(request, id);

    if (adminId instanceof NextResponse) {
        return adminId;
    }

    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return NextResponse.json(
            { error: "Debes enviar un objeto JSON" },
            { status: 400 }
        );
    }

    const { nombre, direccion, telefono, info_contacto, estado } = body;

    if (
        typeof nombre !== "string" || !nombre.trim() ||
        typeof direccion !== "string" || !direccion.trim() ||
        typeof estado !== "boolean" ||
        (telefono != null && typeof telefono !== "string") ||
        (info_contacto != null && typeof info_contacto !== "string")
    ) {
        return NextResponse.json(
            { error: "Revisa nombre, dirección, teléfono, contacto y estado" },
            { status: 400 }
        );
    }

    const response = await pool.query(
        `UPDATE public.sucursales
        SET nombre = $1,
            direccion = $2,
            telefono = $3,
            info_contacto = $4,
            estado = $5,
            updated_at = now()
        WHERE id = $6 AND admin_id = $7
        RETURNING *`,
        [
            nombre.trim(),
            direccion.trim(),
            telefono?.trim() || null,
            info_contacto?.trim() || null,
            estado,
            id,
            adminId,
        ]
    );

    if (!response.rows[0]) {
        return NextResponse.json(
            { error: "Sucursal no encontrada en tu cuenta" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        {
            message: "Sucursal actualizada con éxito",
            data: response.rows[0],
        },
        { status: 200 }
    );
    } catch (error) {
    if (error instanceof SyntaxError) {
        return NextResponse.json(
            { error: "El JSON enviado no es válido" },
            { status: 400 }
        );
    }

    console.error("Error al modificar sucursal:", error);

    return NextResponse.json(
        { error: "No se pudo modificar la sucursal" },
        { status: 500 }
        );
    }
}

/**
 * @swagger
 * /api/sucursales/{id}:
 *   delete:
 *     summary: Eliminar una sucursal
 *     description: Elimina una sucursal por su ID. Solo accesible por administradores (rol 1) o el encargado asignado a dicha sucursal (rol 2).
 *     tags:
 *       - Sucursales
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID numérico de la sucursal a eliminar.
 *         example: "1"
 *     responses:
 *       200:
 *         description: Sucursal y registros asociados eliminados con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sucursal y todos sus registros asociados eliminados exitosamente"
 *       400:
 *         description: ID de sucursal no válido.
 *       401:
 *         description: No autorizado o token inválido.
 *       403:
 *         description: Permisos insuficientes para eliminar esta sucursal.
 *       404:
 *         description: La sucursal o el usuario no existe.
 *       500:
 *         description: Error interno del servidor.
 */
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: branch_id } = await params;

        if (!/^[1-9][0-9]*$/.test(branch_id)) {
            return NextResponse.json(
                { error: "ID de sucursal no válido" },
                { status: 400 }
            );
        }

        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.match(/^Bearer\s+(\S+)$/i)?.[1];

        if (!token) {
            return NextResponse.json(
                { error: "No autorizado. Falta el token de sesión" },
                { status: 401 }
            );
        }

        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !authUser) {
            return NextResponse.json(
                { error: "Sesión expirada o token inválido" },
                { status: 401 }
            );
        }

        const currentUserQuery = await pool.query(
            `SELECT id, rol_id, branch_id FROM public.usuarios WHERE auth_user_id = $1 AND status = true`,
            [authUser.id]
        );

        const currentUser = currentUserQuery.rows[0];

        if (!currentUser) {
            return NextResponse.json(
                { error: "No se ha encontrado un usuario activo asociado a esta sesión" },
                { status: 404 }
            );
        }

        const userRolId = Number(currentUser.rol_id);
        const userBranchId = Number(currentUser.branch_id);
        const targetBranchId = Number(branch_id);

        const isAdmin = userRolId === 1;
        const isBranchOwner = userRolId === 2 && userBranchId === targetBranchId;

        if (!isAdmin && !isBranchOwner) {
            return NextResponse.json(
                { error: "No tienes permisos para eliminar esta sucursal" },
                { status: 403 }
            );
        }

        const deleteResult = await pool.query(
            `DELETE FROM public.sucursales WHERE id = $1 RETURNING id`,
            [targetBranchId]
        );

        if (deleteResult.rowCount === 0) {
            return NextResponse.json(
                { error: "La sucursal no existe o ya fue eliminada" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Sucursal y todos sus registros asociados eliminados exitosamente" },
            { status: 200 }
        );

    } catch (err) {
        console.error("Error al eliminar sucursal:", err);
        return NextResponse.json(
            { error: "Error interno al procesar la eliminación" },
            { status: 500 }
        );
    }
}