import Roles from "@/app/types/roles";
import { firestore } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import validateUser from "../validateUser";

async function verifyUserIsCoordinator(authToken: string | null) {
    if (authToken === null) return false;
    const user: DecodedIdToken | undefined | string = await validateUser(authToken) ?? undefined;
    if (user === undefined || user === null || typeof user === 'string') return false;
    if (user.role !== Roles.COORDINATOR) return false;
    return true
}

export async function POST(
    request: NextRequest,
) {
    try {
        const authToken: string | null = request.headers.get("authorization")?.split("Bearer ")[1] || null;
        if (!verifyUserIsCoordinator(authToken)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        console.log('got here');
        const email = body.email;
        const isEmailInWhiteList = (await firestore!.collection('whitelist').where('email', '==', email).get()).empty;
        if (!isEmailInWhiteList) {
            return new NextResponse("Email already exists", { status: 403 });
        }
        await firestore!.collection('whitelist').add({ email: email, role: Roles.RECRUITER });
        return new NextResponse("Email added to whitelist", { status: 200 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}