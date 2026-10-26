import { NextResponse } from "next/server";
import { supabase } from "@/shared/lib/supabase";
import pool from "@/shared/lib/db";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica al usuario mediante Supabase Auth y recupera la información de su perfil (incluyendo el rol_id) desde la tabla usuarios.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@empresa.com
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "MiPassword123"
 *                 description: Contraseña de la cuenta
 *     responses:
 *       200:
 *         description: Login exitoso. Devuelve la sesión de Supabase y el perfil del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *                 session:
 *                   type: object
 *                   description: Objeto de sesión de Supabase Auth (contiene el access_token JWT)
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     apellido:
 *                       type: string
 *                     correo:
 *                       type: string
 *                     rol_id:
 *                       type: integer
 *                     estado:
 *                       type: boolean
 *                     foto_url:
 *                       type: string
 *       400:
 *         description: Bad Request. Faltan datos en la petición.
 *       401:
 *         description: Unauthorized. Credenciales inválidas.
 *       404:
 *         description: Not Found. El perfil del usuario no existe en la tabla.
 *       500:
 *         description: Internal Server Error.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { error: "Hacen falta datos (email, password)" },
                { status: 400 }
            )
        }

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (authError || !authData.user) {
            return NextResponse.json(
                { error: `Ha ocurrido un error al iniciar sesión. ${authError?.message}` },
                { status: 401 }
            )
        }

        const userId = authData.user.id;

        const queryDB = `
            SELECT
                u.*,
                CASE
                    WHEN u.rol_id IN (1, 2, 3) THEN e.name
                    ELSE s.name
                END AS context_name
            FROM public.usuarios u
            LEFT JOIN public.empresas e
                ON e.id = u.company_id
            LEFT JOIN public.sucursales s
                ON s.id = u.branch_id
            WHERE u.auth_user_id = $1;
        `;

        const response = await pool.query(queryDB, [userId])

        if (response.rows.length === 0) {
            return NextResponse.json(
                { error: "No se ha encontrado el perfil en la Base de datos." },
                { status: 404 }
            )
        }

        const usuario = response.rows[0]

        if (!usuario.status) {
            return NextResponse.json(
                { error: "Tu cuenta se encuentra inactiva :)" },
                { status: 403 }
            )
        }

        return NextResponse.json(
            { 
                message: "Haz iniciado sesión exitosamente",
                session: authData.session,
                usuario: usuario
            },
            { status: 200 }
        )
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { error: `Ha ocurrido un error interno ${err}` },
            { status: 500 }
        )
    }
}