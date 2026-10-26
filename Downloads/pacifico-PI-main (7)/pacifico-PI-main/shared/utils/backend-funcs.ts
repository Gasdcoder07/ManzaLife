import { NextResponse } from "next/server";
import { supabase } from "../lib/supabase";
import { pool } from "../lib/db"

export async function validarAdmin(request: Request, id: string) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.match(/^Bearer\s+(\S+)$/i)?.[1];

    if (!token) {
        return NextResponse.json(
            { error: "Falta el token de sesión" },
            { status: 401 }
        );
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return NextResponse.json(
        { error: "Sesión expirada o token inválido" },
        { status: 401 }
        );
    }

    if (
        !/^[1-9][0-9]{0,18}$/.test(id) ||
        BigInt(id) > BigInt("9223372036854775807")
    ) {
        return NextResponse.json(
        { error: "ID de sucursal no válido" },
        { status: 400 }
        );
    }

    const { rows } = await pool.query(
        `SELECT id::text
        FROM public.usuarios
        WHERE auth_user_id = $1
        AND rol_id = 1
        AND status = true`,
        [user.id]
    );

    if (!rows[0]) {
        return NextResponse.json(
            { error: "Solo un administrador activo puede realizar esta operación" },
            { status: 403 }
        );
    }
    return rows[0].id as string;
}