import { NextResponse } from "next/server";
import pool from "@/shared/lib/db";
import { supabase, supabaseAdmin } from "@/shared/lib/supabase";

/**
 * @swagger
 * /api/auth/register/manager:
 *   post:
 *     summary: Registrar un nuevo gerente
 *     description: Permite a administradores (rol 1) crear un gerente (rol 2) en su misma empresa. Crea la cuenta en Supabase Auth con el correo confirmado e inserta su perfil en la tabla usuarios.
 *     tags:
 *       - Gerentes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre(s) del gerente.
 *                 example: "Carlos"
 *               last_name:
 *                 type: string
 *                 description: Apellido(s) del gerente.
 *                 example: "Gómez"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico.
 *                 example: "carlos.gerente@empresa.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 writeOnly: true
 *                 description: Debe contener al menos 6 caracteres, una mayúscula y un símbolo.
 *                 example: "Gerente_123"
 *               foto_url:
 *                 type: string
 *                 description: URL de la foto de perfil (Opcional).
 *                 example: "https://midominio.com/foto.jpg"
 *               foto_public_id:
 *                 type: string
 *                 description: ID público de la imagen en el storage (Opcional).
 *                 example: "foto_12345"
 *     responses:
 *       201:
 *         description: Gerente creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Haz creado tu usuario con éxito"
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 15
 *                     nombre:
 *                       type: string
 *                       example: "Carlos"
 *                     apellido:
 *                       type: string
 *                       example: "Gómez"
 *                     correo:
 *                       type: string
 *                       example: "carlos.admin@empresa.com"
 *                     rol_id:
 *                       type: integer
 *                       example: 2
 *                     estado:
 *                       type: boolean
 *                       example: true
 *                     foto_url:
 *                       type: string
 *                       example: "https://midominio.com/foto.jpg"
 *       400:
 *         description: Faltan campos obligatorios, la contraseña no cumple los requisitos o Supabase rechazó la creación del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               camposFaltantes:
 *                 value:
 *                   error: "Hace falta alguno de estos campos: (name, last_name, email, password)"
 *               passwordInsegura:
 *                 value:
 *                   error: "La contraseña no es suficientemente segura: \n1.- 6 caracteres como mínimo\n2.- Un símbolo\n3.- Una mayúscula"
 *               errorSupabase:
 *                 value:
 *                   error: "Ha habido un error al crear usuario en SupaBase ..."
 *       401:
 *         description: Token ausente o usuario sin permisos para registrar gerentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               sinToken:
 *                 value:
 *                   error: "Error al obtener el token"
 *               sinPermisos:
 *                 value:
 *                   error: "No tienes permisos para registrar un nuevo Gerente"
 *       403:
 *         description: No se pudo validar la sesión con el token proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al adquirir la sesión actual"
 *       404:
 *         description: No existe un perfil asociado al usuario autenticado en la tabla usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener el usuario de la base de datos"
 *       500:
 *         description: Error inesperado en el servidor o al insertar el perfil en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Hubo un error al registrar el usuario. ..."
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            last_name,
            email,
            password,
            foto_public_id,
            foto_url,
            branch_id,
        } = body;

        const authHeader = request.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Error al obtener la sesión del usuario" },
                { status: 401 },
            );
        }

        const token = authHeader.replace("Bearer ", "");

        const {
            data: { user: authUser },
            error: authErrorUser,
        } = await supabase.auth.getUser(token);

        if (!authUser || authErrorUser) {
            return NextResponse.json(
                { error: "No se ha podido obtener un usuario con el token" },
                { status: 404 },
            );
        }

        const currentUserQuery = await pool.query(
            `SELECT rol_id, company_id from usuarios where auth_user_id = $1`,
            [authUser.id],
        );

        const currentUser = currentUserQuery.rows[0];

        if (!currentUser) {
            return NextResponse.json(
                { error: "Error al obtener el usuario de la base de datos" },
                { status: 404 },
            );
        }

        if (Number(currentUser.rol_id) !== 1) {
            return NextResponse.json(
                { error: "No tienes permiso para crear un nuevo Cajero" },
                { status: 403 },
            );
        }

        if (!name || !last_name || !email || !password) {
            return NextResponse.json(
                {
                    error: "Hace falta alguno de estos campos: (name, last_name, email, password)",
                },
                { status: 400 },
            );
        }

        const regexPass = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

        if (!regexPass.test(password)) {
            return NextResponse.json(
                {
                    error: "La contraseña no es suficientemente segura: \n1.- 6 caracteres como mínimo\n2.- Un símbolo\n3.- Una mayúscula",
                },
                { status: 400 },
            );
        }

        const { data: authData, error: authError } =
            await supabaseAdmin.auth.admin.createUser({
                email: email,
                password: password,
                email_confirm: true,
                user_metadata: {
                    name: name,
                    last_name: last_name,
                    rol_id: 2,
                    branch_id: branch_id,
                },
            });

        if (authError) {
            return NextResponse.json(
                {
                    error: `Ha habido un error al crear usuario en SupaBase ${authError.message}`,
                },
                { status: 400 },
            );
        }

        const userId = authData.user.id;

        const queryDB = `
            INSERT INTO public.usuarios (auth_user_id, company_id, name, last_name, email, rol_id, status, branch_id, foto_url, foto_public_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id, company_id, name, last_name, email, rol_id, status, branch_id, foto_url;
        `;

        const values = [
            userId,
            currentUser.company_id,
            name,
            last_name,
            email,
            2,
            true,
            branch_id,
            foto_url || null,
            foto_public_id || null,
        ];

        const response = await pool.query(queryDB, values);

        return NextResponse.json(
            {
                message: "Haz creado tu usuario con éxito",
                usuario: response.rows[0],
            },
            { status: 201 },
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: `Hubo un error al registrar el usuario. ${err}` },
            { status: 500 },
        );
    }
}
