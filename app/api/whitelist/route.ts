import Roles from "@/app/types/roles";
import { checkEnvironment } from "@/checkEnvironment";
import { firestore } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "../sendEmail";
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
        const email = body.email;
        const isEmailInWhiteList = (await firestore!.collection('whitelist').where('email', '==', email).get()).empty;
        if (!isEmailInWhiteList) {
            return new NextResponse("Email already exists", { status: 403 });
        }
        await firestore!.collection('whitelist').add({ email: email, role: Roles.RECRUITER });

        sendEmail(email, "RecruitR Invitation", `You're invited to join RecruitR. <a href='${checkEnvironment().BASE_URL}/auth/signup/' target='_blank'>Sign Up</a>`);
        return new NextResponse("Email added to whitelist", { status: 200 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    request: NextRequest
) {
    try {
        const authToken: string | null = request.headers.get("authorization")?.split("Bearer ")[1] || null;
        if (!verifyUserIsCoordinator(authToken)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const whiteList = await firestore!.collection("whitelist").get();
        const whietListedRecruiters = whiteList.docs.map((doc) => doc.data());
        return new NextResponse(JSON.stringify(whietListedRecruiters), { status: 200 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest
) {
    try {
        const authToken: string | null = request.headers.get("authorization")?.split("Bearer ")[1] || null;
        if (!verifyUserIsCoordinator(authToken)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const body = await request.json();
        const email = body.email;
        const whiteList = await firestore!.collection("whitelist").where('email', '==', email).get();
        if (whiteList.empty) {
            return new NextResponse("Email not found", { status: 404 });
        }
        whiteList.forEach(async (doc) => {
            await doc.ref.delete();
        });
        return new NextResponse("Email removed from whitelist", { status: 200 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}