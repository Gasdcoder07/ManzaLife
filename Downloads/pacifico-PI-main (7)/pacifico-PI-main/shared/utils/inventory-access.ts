import pool from "@/shared/lib/db";
import { supabase } from "@/shared/lib/supabase";
import { NextResponse } from "next/server";
import type { PoolClient } from "pg";

export class HttpError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

export type Actor = {
    id: string;
    rol_id: number;
    company_id: string;
    branch_id: string | null;
    admin_id: string | null;
};

export type Allocation = {
    branch_id: string;
    quantity: number;
    min_stock?: number;
};

// Acepta IDs numéricos o cadenas, sin perder precisión de bigint.
export function validId(value: unknown): string {
    if (typeof value === "number" && !Number.isSafeInteger(value)) {
        throw new HttpError(400, "ID no válido");
    }

    const id = String(value ?? "");

    if (
        !/^[1-9][0-9]{0,18}$/.test(id) ||
        BigInt(id) > BigInt("9223372036854775807")
    ) {
        throw new HttpError(400, "ID no válido");
    }

    return id;
}

export function validQuantity(value: unknown): number {
    if (
        typeof value !== "number" ||
        !Number.isInteger(value) ||
        value < 0 ||
        value > 2147483647
    ) {
        throw new HttpError(
            400,
            "La cantidad y el stock mínimo deben ser enteros mayores o iguales a 0"
        );
    }

    return value;
}

export async function readBody(
    request: Request
): Promise<Record<string, unknown>> {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw new HttpError(400, "Debes enviar un objeto JSON válido");
    }

    return body;
}

export async function getActor(
    request: Request,
    roles: number[]
): Promise<Actor> {
    const authHeader = request.headers.get("Authorization")
    const token = authHeader?.split(" ")[1]

    if (!token) {
        throw new HttpError(401, "Falta el token de sesión");
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        throw new HttpError(401, "Sesión expirada o token inválido");
    }

    const { rows } = await pool.query(
        `SELECT
            u.id::text,
            u.rol_id,
            u.company_id::text,
            u.branch_id::text,
            u.admin_id::text,
            s.status AS branch_status
        FROM public.usuarios u
        JOIN public.empresas e ON e.id = u.company_id
        LEFT JOIN public.sucursales s
            ON s.id = u.branch_id
            AND s.company_id = u.company_id
        WHERE u.auth_user_id = $1
            AND u.status = true
            AND e.status = true`,
        [user.id]
    );

    const actor = rows[0];

    if (!actor) {
        throw new HttpError(403, "Usuario o empresa inexistente o inactiva");
    }

    actor.rol_id = Number(actor.rol_id);

    if (!roles.includes(actor.rol_id)) {
        throw new HttpError(403, "No tienes permiso para esta operación");
    }

    if (
        actor.rol_id !== 1 &&
        (!actor.branch_id || !actor.branch_status)
    ) {
        throw new HttpError(403, "No tienes una sucursal activa asignada");
    }

    return actor;
}

export function readAllocations(value: unknown): Allocation[] {
    if (!Array.isArray(value) || value.length === 0) {
        throw new HttpError(400, "Debes enviar al menos una sucursal en branches");
    }

    const allocations = value.map((item) => {
        if (!item || typeof item !== "object" || Array.isArray(item)) {
            throw new HttpError(400, "Los datos de branches no son válidos");
        }

        return {
            branch_id: validId(item.branch_id),
            quantity: validQuantity(item.quantity),
            min_stock: item.min_stock === undefined
                ? undefined
                : validQuantity(item.min_stock),
        };
    });

    const ids = allocations.map((item) => item.branch_id);

    if (new Set(ids).size !== ids.length) {
        throw new HttpError(400, "No repitas una sucursal en branches");
    }

    return allocations;
}

// Bloquea las sucursales durante la transacción.
export async function checkBranches(
    client: PoolClient,
    actor: Actor,
    ids: string[]
) {
    if (
        actor.rol_id !== 1 &&
        (ids.length !== 1 || ids[0] !== actor.branch_id)
    ) {
        throw new HttpError(403, "Solo puedes operar en tu sucursal");
    }

    const { rows } = await client.query(
        `SELECT id::text
        FROM public.sucursales
        WHERE company_id = $1
            AND id = ANY($2::bigint[])
            AND status = true
        ORDER BY id
        FOR SHARE`,
        [actor.company_id, ids]
    );

    if (rows.length !== ids.length) {
        throw new HttpError(
            404,
            "Alguna sucursal no existe, está inactiva o pertenece a otra empresa"
        );
    }
}

export async function transaction<T>(
    operation: (client: PoolClient) => Promise<T>
): Promise<T> {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const result = await operation(client);
        await client.query("COMMIT");
        return result;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}

export function apiError(error: unknown) {
    if (error instanceof HttpError) {
        return NextResponse.json(
            { error: error.message },
            { status: error.status }
        );
    }

    console.error("Error en productos/inventario:", error);

    const code = (error as { code?: string } | null)?.code;

    if (code === "23503") {
        return NextResponse.json(
            { error: "Los registros relacionados no son válidos" },
            { status: 409 }
        );
    }

    if (code === "23505") {
        return NextResponse.json(
            { error: "Ya existe un registro con esos datos" },
            { status: 409 }
        );
    }

    if (code === "22003") {
        return NextResponse.json(
            { error: "La cantidad o el importe supera el límite permitido" },
            { status: 409 }
        );
    }

    return NextResponse.json(
        { error: "Error interno del servidor" },
        { status: 500 }
    );
}