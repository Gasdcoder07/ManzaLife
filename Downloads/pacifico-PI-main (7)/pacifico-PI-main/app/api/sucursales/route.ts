import { NextResponse } from "next/server";
import { pool } from "@/shared/lib/db";
import { supabase } from "@/shared/lib/supabase";

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Mensaje descriptivo del error"
 *     Gerente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         foto_url:
 *           type: string
 *           nullable: true
 *     Sucursal:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Sucursal Centro"
 *         direction:
 *           type: string
 *           example: "Av. Principal 123"
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "3141234567"
 *         contact_info:
 *           type: string
 *           nullable: true
 *           example: "Horario de 9 AM a 6 PM"
 *         status:
 *           type: boolean
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         admin_id:
 *           type: integer
 *           nullable: true
 *         gerentes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Gerente'
 */

/**
 * @swagger
 * /api/sucursales:
 *   get:
 *     summary: Obtener todas las sucursales con sus gerentes
 *     tags:
 *       - Sucursales
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sucursales recuperada exitosamente.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.match(/^Bearer\s+(\S+)$/i)?.[1];

        if (!token) {
            return NextResponse.json(
                { error: "No autorizado. Falta el token de sesión." },
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
            `SELECT rol_id, company_id FROM public.usuarios WHERE auth_user_id = $1 AND status = true`,
            [authUser.id]
        );
        const currentUser = currentUserQuery.rows[0];

        if (!currentUser) {
            return NextResponse.json(
                { error: "Usuario no encontrado o inactivo en el sistema" },
                { status: 404 }
            );
        }

        const sucursalesResult = await pool.query(
            `SELECT s.*,
                COALESCE(
                    (   
                        SELECT json_agg(
                            json_build_object(
                                'id', u.id,
                                'name', u.name,
                                'last_name', u.last_name,
                                'email', u.email,
                                'foto_url', u.foto_url
                            ) ORDER BY u.id
                        )
                        FROM public.usuarios u
                        WHERE u.branch_id = s.id
                        AND u.company_id = $1
                        AND u.rol_id = 2
                        AND u.status = true
                    ),
                    '[]'::json
                ) AS gerentes
            FROM public.sucursales s
            WHERE s.company_id = $1
            ORDER BY s.id`,
            [currentUser.company_id]
        );

        return NextResponse.json(
            {
                message: "Has obtenido la información de las sucursales con éxito.",
                data: sucursalesResult.rows
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error al obtener sucursales:", error);
        return NextResponse.json(
            { error: "No se pudo obtener la información de las sucursales" },
            { status: 500 }
        );
    }
}

/**
 * @swagger
 * /api/sucursales:
 *   post:
 *     summary: Crear una nueva sucursal
 *     tags:
 *       - Sucursales
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - direction
 *             properties:
 *               name:
 *                 type: string
 *               direction:
 *                 type: string
 *               phone:
 *                 type: string
 *               contact_info:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sucursal creada con éxito.
 *       400:
 *         description: Datos requeridos faltantes.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Permisos insuficientes.
 *       500:
 *         description: Error interno del servidor.
 */
export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.match(/^Bearer\s+(\S+)$/i)?.[1];

        if (!token) {
            return NextResponse.json(
                { error: "No autorizado. Falta token de sesión" },
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
            `SELECT id, rol_id, company_id FROM public.usuarios WHERE auth_user_id = $1 AND status = true`,
            [authUser.id]
        );
        const currentUser = currentUserQuery.rows[0];

        if (!currentUser) {
            return NextResponse.json(
                { error: "Usuario no encontrado o inactivo en el sistema" },
                { status: 404 }
            );
        }

        if (Number(currentUser.rol_id) !== 1) {
            return NextResponse.json(
                { error: "No tienes permisos de administrador para crear sucursales" },
                { status: 403 }
            );
        }

        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { error: "Formato JSON inválido en la petición" },
                { status: 400 }
            );
        }

        const { name, direction, phone, contact_info } = body;

        if (!name || !direction) {
            return NextResponse.json(
                { error: "El nombre y la dirección son campos obligatorios" },
                { status: 400 }
            );
        }

        const insertResult = await pool.query(
            `INSERT INTO public.sucursales (
                name,
                company_id,
                direction,
                phone,
                contact_info,
                created_at,
                updated_at,
                admin_id
            ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6)
            RETURNING id, company_id, name, direction, phone, contact_info, status, created_at, updated_at, admin_id;`,
            [
                name,
                currentUser.company_id,
                direction,
                phone || null,
                contact_info || null,
                currentUser.id
            ]
        );

        return NextResponse.json(
            { success: `Sucursal "${name}" creada con éxito`, data: insertResult.rows[0] },
            { status: 201 }
        );

    } catch (err) {
        console.error("Error al crear sucursal:", err);
        return NextResponse.json(
            { error: "Error interno en el servidor al crear la sucursal" },
            { status: 500 }
        );
    }
}