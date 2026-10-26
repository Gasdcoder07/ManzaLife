"use server";

import { cookies } from "next/headers";

export async function setLocale(locale: "es" | "en") {
    (await cookies()).set("locale", locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
    });
}