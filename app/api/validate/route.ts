import type { DecodedIdToken } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import validateUser from "../validateUser";

export async function GET(
    request: NextRequest
) {
    try {
        const authToken: string | undefined = request.headers.get("authorization")!.split("Bearer ")[1];
        if (authToken === null) return new NextResponse("Unauthorized", { status: 401 })
        const user: DecodedIdToken | undefined | string = await validateUser(authToken) ?? undefined;
        if (user === undefined) return new NextResponse("Unauthorized", { status: 405 });
        if (user === "auth/id-token-expired") return new NextResponse("Refresh", { status: 302 });
        return NextResponse.json({ role: (user as DecodedIdToken).role }, { status: 200 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}