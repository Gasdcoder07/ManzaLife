import pool from "@/shared/lib/db"
import { supabase } from "@/shared/lib/supabase"
import { NextResponse } from "next/server"

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener lista de usuarios
 *     description: Retorna la lista de usuarios del sistema según el rol del solicitante. Los Administradores (rol_id 1) ven a todos los usuarios. Los Gerentes (rol_id 2) solo ven a los usuarios de su propia sucursal. Requiere autenticación JWT.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios extraída con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Datos extraídos con éxito"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Bad Request. El perfil del gerente no tiene una sucursal asignada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tu perfil de gerente no tiene una sucursal asignada"
 *       401:
 *         description: Unauthorized. Token ausente, inválido o sesión vencida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Sesión vencida o token inválido"
 *       403:
 *         description: Forbidden. El usuario no tiene permisos (ej. rol 3) para ver el listado general.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No tienes permiso para ver la lista de usuarios"
 *       404:
 *         description: Not Found. No se encontró el perfil del usuario autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No se encontró un perfil de usuario asociado a esta sesión"
 *       500:
 *         description: Internal Server Error. Fallo en la base de datos o backend.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno en el backend"
 */
export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("Authorization")

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Sesión vencida o token inválido" },
                { status: 401 }
            )
        }

        const token = authHeader.split(" ")[1]

        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token)

        if (authError || !authUser) return NextResponse.json(
            { error: `Ocurrió un error al obtener la información del usuario ${authError}` },
            { status: 401 }
        )

        const currentUserQuery = await pool.query(
            `SELECT rol_id, branch_id, company_id FROM usuarios WHERE auth_user_id = $1`,
            [authUser.id]
        );

        const currentUser = currentUserQuery.rows[0]

        if (!currentUser) {
            return NextResponse.json(
                { error: "No se encontró un perfil de usuario asociado a esta sesión" },
                { status: 404 }
            )
        }

        let query = ``
        let queryParams: unknown[] = []

        if (Number(currentUser.rol_id) === 1) {
            query = `SELECT * FROM usuarios where company_id = $1`;
            queryParams = [currentUser.company_id]
            
        } else if (Number(currentUser.rol_id) === 2) { 
            if (!currentUser.branch_id) {
                return NextResponse.json(
                    { error: "Tu perfil de gerente no tiene una sucursal asignada" },
                    { status: 400 }
                )
            }
            
            query = `SELECT * FROM usuarios WHERE branch_id = $1 AND company_id = $2`;
            queryParams = [currentUser.branch_id, currentUser.company_id];
            
        } else {
            return NextResponse.json(
                { error: "No tienes permiso para ver la lista de usuarios" },
                { status: 403 }
            )
        }

        const response = await pool.query(query, queryParams)

        return NextResponse.json(
            { message: "Datos extraídos con éxito", data: response.rows },
            { status: 200 }
        )

    } catch(err) {
        return NextResponse.json(
            { error: `Error interno en el backend ${err}` },
            { status: 500 }
        )
    }
}