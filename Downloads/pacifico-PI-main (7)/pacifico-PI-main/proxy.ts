import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { handleRoleRouting } from "./features/auth/utils/role-guard";

export function proxy(request : NextRequest) {
    const redirectPath = handleRoleRouting(request);

    if (redirectPath) {
        return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};