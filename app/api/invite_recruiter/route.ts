import sendEmail from "@/app/api/sendEmail";
import Roles from "@/app/types/roles";
import { checkEnvironment } from "@/checkEnvironment";
import { firestore } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import validateUser from "../validateUser";

export async function POST(request: NextRequest) {
    const body = await request.json();
    // verify user is coordinator
    const authorizationToken = request.headers.get("authorization")!.split("Bearer ")[1];
    const user: DecodedIdToken = await validateUser(authorizationToken);
    if (user === undefined || user === null) return new NextResponse("Unauthorized", { status: 401 });
    if (user.role !== Roles.COORDINATOR) return new NextResponse("Unauthorized", { status: 401 });

    const email = body.email;
    // add email to whitelist
    await firestore!.collection("whitelist").add({ email: email, role: Roles.RECRUITER });


    // send invite email to recruiter
    sendEmail(email, "RecruitR Invitation", `${user.email} invited you to join RecruitR. <a href='${checkEnvironment().BASE_URL}/auth/signup/' target='_blank'>Sign Up</a>`);


    return new NextResponse("Email Sent", { status: 200 });
}
