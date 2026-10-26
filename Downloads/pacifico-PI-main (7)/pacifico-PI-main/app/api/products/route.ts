import { NextResponse } from "next/server";
import {
  apiError,
  checkBranches,
  getActor,
  HttpError,
  readAllocations,
  readBody,
  transaction,
  validId,
} from "@/shared/utils/inventory-access";

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductBranchAllocation:
 *       type: object
 *       required: [branch_id, quantity]
 *       properties:
 *         branch_id:
 *           type: string
 *           example: "1"
 *         quantity:
 *           type: integer
 *           minimum: 0
 *           maximum: 2147483647
 *           example: 20
 *         min_stock:
 *           type: integer
 *           minimum: 0
 *           maximum: 2147483647
 *           example: 5
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear producto y asignarlo a sucursales
 *     description: ADMIN selecciona sucursales de su empresa. GERENTE solo puede seleccionar su sucursal. La operación completa es transaccional.
 *     tags: [Productos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, category_id, branches]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sabritas Sal 170g
 *               description:
 *                 type: string
 *                 nullable: true
 *                 example: Papas fritas con sal
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 example: 25.50
 *               category_id:
 *                 type: string
 *                 example: "2"
 *               foto_public_id:
 *                 type: string
 *                 nullable: true
 *               foto_url:
 *                 type: string
 *                 nullable: true
 *               branches:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   $ref: '#/components/schemas/ProductBranchAllocation'
 *     responses:
 *       201:
 *         description: Devuelve success, data con el producto e inventory con las existencias creadas.
 *       400:
 *         description: Datos no válidos.
 *       401:
 *         description: Sesión inválida.
 *       403:
 *         description: Rol no permitido o sucursal fuera del alcance.
 *       404:
 *         description: Categoría o sucursal no disponible en la empresa.
 *       409:
 *         description: Conflicto con los datos.
 *       500:
 *         description: Error interno.
 */
export async function POST(request: Request) {
  try {
    const actor = await getActor(request, [1, 2]);
    const body = await readBody(request);

    if (typeof body.name !== "string" || !body.name.trim()) {
      throw new HttpError(400, "El nombre del producto es obligatorio");
    }

    const name = body.name.trim();
    const categoryId = validId(body.category_id);
    const branches = readAllocations(body.branches);

    // Precio no negativo, hasta 10 enteros y 2 decimales.
    if (
      !["number", "string"].includes(typeof body.price) ||
      !/^\d{1,10}(\.\d{1,2})?$/.test(String(body.price))
    ) {
      throw new HttpError(400, "El precio debe ser no negativo y tener máximo dos decimales");
    }

    for (const field of ["description", "foto_url", "foto_public_id"]) {
      if (body[field] != null && typeof body[field] !== "string") {
        throw new HttpError(400, `El campo ${field} debe ser texto`);
      }
    }

    const result = await transaction(async (client) => {
      const category = await client.query(
        `SELECT id
                FROM public.categorias
                WHERE id = $1 AND company_id = $2
                FOR SHARE`,
        [categoryId, actor.company_id],
      );

      if (!category.rows[0]) {
        throw new HttpError(404, "Categoría no encontrada en tu empresa");
      }

      await checkBranches(
        client,
        actor,
        branches.map((item) => item.branch_id),
      );

      const adminId = actor.rol_id === 1 ? actor.id : actor.admin_id;

      const product = await client.query(
        `INSERT INTO public.productos (
            company_id, 
            name, 
            description, 
            price,
            category_id, 
            foto_public_id, 
            foto_url, 
            admin_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *`,
        [
          actor.company_id,
          name,
          body.description ?? null,
          body.price,
          categoryId,
          body.foto_public_id ?? null,
          body.foto_url ?? null,
          adminId,
        ],
      );

      const inventory = [];

      for (const branch of branches) {
        const stock = await client.query(
          `INSERT INTO public.inventario (
                        company_id, branch_id, product_id, quantity, min_stock
                    )
                    VALUES ($1, $2, $3, $4, $5)
                     RETURNING *`,
          [
            actor.company_id,
            branch.branch_id,
            product.rows[0].id,
            branch.quantity,
            branch.min_stock ?? 5,
          ],
        );

        inventory.push(stock.rows[0]);
      }

      return { data: product.rows[0], inventory };
    });

    return NextResponse.json(
      { success: "Producto e inventario creados con éxito", ...result },
      { status: 201 },
    );
  } catch (error) {
    return apiError(error);
  }
}

/**
 * @swagger
 * /api/products:
 *   delete:
 *     summary: Retirar un producto de sucursales seleccionadas
 *     description: Elimina las filas de inventario y sus existencias en las sucursales seleccionadas. Conserva el catálogo y las ventas anteriores. GERENTE solo puede retirar de su sucursal.
 *     tags: [Productos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id]
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "25"
 *               branch_ids:
 *                 type: array
 *                 minItems: 1
 *                 description: Obligatorio para ADMIN. Para GERENTE puede omitirse y se utiliza su sucursal.
 *                 items:
 *                   type: string
 *                 example: ["1", "2"]
 *     responses:
 *       200:
 *         description: Devuelve success, product_id y data con los registros de inventario retirados.
 *       400:
 *         description: Datos no válidos.
 *       401:
 *         description: Sesión inválida.
 *       403:
 *         description: Rol o sucursal no permitidos.
 *       404:
 *         description: Producto, sucursal o asignación no encontrados.
 *       409:
 *         description: Conflicto con registros relacionados.
 *       500:
 *         description: Error interno.
 */
export async function DELETE(request: Request) {
  try {
    const actor = await getActor(request, [1, 2]);
    const body = await readBody(request);
    const productId = validId(body.product_id);

    const requestedBranches =
      body.branch_ids === undefined && actor.rol_id === 2 ? [actor.branch_id] : body.branch_ids;

    if (!Array.isArray(requestedBranches) || requestedBranches.length === 0) {
      throw new HttpError(400, "Debes enviar branch_ids");
    }

    const branchIds = requestedBranches.map(validId);

    if (new Set(branchIds).size !== branchIds.length) {
      throw new HttpError(400, "No repitas sucursales");
    }

    const removed = await transaction(async (client) => {
      const product = await client.query(
        `SELECT id
                FROM public.productos
                WHERE id = $1 AND company_id = $2
                FOR UPDATE`,
        [productId, actor.company_id],
      );

      if (!product.rows[0]) {
        throw new HttpError(404, "Producto no encontrado en tu empresa");
      }

      await checkBranches(client, actor, branchIds);

      const result = await client.query(
        `DELETE FROM public.inventario
                WHERE company_id = $1
                    AND product_id = $2
                    AND branch_id = ANY($3::bigint[])
                 RETURNING *`,
        [actor.company_id, productId, branchIds],
      );

      // Si falta alguna asignación, se revierte toda la operación.
      if (result.rows.length !== branchIds.length) {
        throw new HttpError(
          404,
          "El producto no está asignado a todas las sucursales seleccionadas",
        );
      }

      return result.rows;
    });

    return NextResponse.json({
      success: "Producto retirado de las sucursales seleccionadas",
      product_id: productId,
      data: removed,
    });
  } catch (error) {
    return apiError(error);
  }
}

