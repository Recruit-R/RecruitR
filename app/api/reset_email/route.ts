import sendEmail from "@/app/api/sendEmail";
import { auth } from "@/firebase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const email = body.email;
    try {
        const user = await auth!.getUserByEmail(email);
        if (user.providerData.some((userInfo) => userInfo.providerId === "password")) {
            const resetLink = await auth!.generatePasswordResetLink(email);
            sendEmail(email, "RecruitR Passowrd Reset", `Click the link to reset your password: <a href='${resetLink}' target='_blank'>Reset Password</a>`);
        }

        return new NextResponse("Email Sent", { status: 200 });
    } catch (error) {
        return new NextResponse("User does not exist", { status: 404 });
    }
}
