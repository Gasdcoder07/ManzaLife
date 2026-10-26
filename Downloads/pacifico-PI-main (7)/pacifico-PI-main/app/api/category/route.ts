import { NextResponse } from "next/server";
import { pool } from "@/shared/lib/db";
import { supabase } from "@/shared/lib/supabase";

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         name:
 *           type: string
 *           example: "Tecnología"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Artículos relacionados a tecnología"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2026-09-04T17:24:00Z"
 *         admin_id:
 *           type: integer
 *           example: 1
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Mensaje descriptivo del error"
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Obtener todas las categorías
 *     description: Consulta la base de datos y devuelve una lista con todas las categorías registradas.
 *     tags:
 *       - Categorías
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías recuperada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categorías extraídas con éxito"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Categoria'
 *       401:
 *         description: No autorizado o token de sesión inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "No autorizado. Falta el token de sesión"
 *       500:
 *         description: Error al obtener las categorías desde la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Error al recibir las categorías"
 */
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No autorizado. Falta el token de sesión" },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Sesión expirada o token inválido" }, { status: 401 });
    }

    const currentUserQuery = await pool.query(
      `SELECT company_id FROM usuarios WHERE auth_user_id = $1`,
      [user.id],
    );
    const currentUser = currentUserQuery.rows[0];

    if (!currentUser) {
      return NextResponse.json(
        { error: "No se encontró el usuario en la base de datos" },
        { status: 404 },
      );
    }

    const response = await pool.query(`SELECT * FROM categorias where company_id = $1;`, [
      currentUser.company_id,
    ]);

    return NextResponse.json(
      { message: "Categorías extraídas con éxito", data: response.rows },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error al obtener categorías:", err);
    return NextResponse.json({ error: "Error al recibir las categorías" }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Crear una nueva categoría
 *     description: Permite únicamente a usuarios administradores (rol 1) registrar una nueva categoría.
 *     tags:
 *       - Categorías
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tecnología"
 *               description:
 *                 type: string
 *                 example: "Artículos relacionados a tecnología"
 *     responses:
 *       201:
 *         description: Categoría creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: 'Categoría Tecnología creada con éxito'
 *                 data:
 *                   $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Falta el nombre u otros datos obligatorios.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "El nombre de la categoría es obligatorio"
 *       401:
 *         description: No autorizado o token de sesión inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "No autorizado. Falta el token de sesión"
 *       403:
 *         description: Permisos insuficientes (requiere rol de administrador).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "No eres administrador, no puedes crear categorías"
 *       404:
 *         description: Usuario de sesión no registrado en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "No existe un usuario activo linkeado a esta sesión"
 *       500:
 *         description: Error interno en el servidor al intentar crear la categoría.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Error interno en el servidor al crear la categoría"
 */
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No autorizado. Falta el token de sesión" },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Sesión expirada o token inválido" }, { status: 401 });
    }

    const currentUserQuery = await pool.query(
      `SELECT id, rol_id, company_id FROM public.usuarios WHERE auth_user_id = $1 AND status = true;`,
      [user.id],
    );

    const currentUser = currentUserQuery.rows[0];

    if (!currentUser) {
      return NextResponse.json(
        { error: "No existe un usuario activo linkeado a esta sesión" },
        { status: 404 },
      );
    }

    if (Number(currentUser.rol_id) !== 1) {
      return NextResponse.json(
        { error: "No eres administrador, no puedes crear categorías" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { name, description } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "El nombre de la categoría es obligatorio" },
        { status: 400 },
      );
    }

    const response = await pool.query(
      `INSERT INTO categorias(
                name,
                company_id,
                description,
                created_at,
                admin_id
            ) VALUES ($1, $2, $3, NOW(), $4)
            RETURNING id, name, company_id, description, created_at, admin_id;`,
      [name.trim(), currentUser.company_id, description || null, currentUser.id],
    );

    const finalresponse = response.rows[0];

    if (!finalresponse) {
      return NextResponse.json(
        { error: "No se ha podido crear la nueva categoría" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: `Categoría ${name} creada con éxito`, data: finalresponse },
      { status: 201 },
    );
  } catch (err) {
    console.error("Error al crear categoría:", err);
    return NextResponse.json(
      { error: "Error interno en el servidor al crear la categoría" },
      { status: 500 },
    );
  }
}

