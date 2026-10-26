import { NextRequest } from "next/server";

export function handleRoleRouting(request: NextRequest): string | null {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get("token")?.value;
    const userRole = request.cookies.get("user_role")?.value;

    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
    const ID_ROL_CAJERO = 3;

    if (!token && !isAuthRoute) {
        return "/login";
    }

    if (token && isAuthRoute) {
        return "/sell";
    }

    if (token && Number(userRole) === ID_ROL_CAJERO && !pathname.startsWith("/sell")) {
        return "/sell";
    }

    return null;
}