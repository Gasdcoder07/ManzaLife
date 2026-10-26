import { Pool } from "pg"

const globalForPg = globalThis as unknown as {
    pgPool: Pool | undefined;
}

if (!process.env.DATABASE_URL) {
    throw new Error("Error al obtener la url de la base de datos por parte del .env")
}

export const pool = globalForPg.pgPool ?? 
    new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
        idleTimeoutMillis: 30000,
        ssl: { rejectUnauthorized: false }
        //ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
    })

if (process.env.NODE_ENV !== 'production') {
    globalForPg.pgPool = pool
}

export default pool