import { auth, firestore } from '@/firebase/server';
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import Roles from "@/app/types/roles";


export async function GET(
    request: NextRequest,
    { params }: { params: { userid: string } }
) {
    const wlcList = ['coordinator@example.com']
    const wlrList = ['recruiter@example.com']
    try {
        if (!firestore)
            return new NextResponse("No Firestore", { status: 500 });

        const authToken =
            request.headers.get("authorization")?.split("Bearer ")[1] || null;

        let user: DecodedIdToken | null = null;
        if (auth && authToken) {
            try {
                user = await auth.verifyIdToken(authToken);
            } catch (error) {
                // One possible error is the token being expired, return forbidden
                console.log(error);
            }
        }

        // validate that user requesting role type is requesting it for themselves
        const valid = user?.uid === params.userid;
        if (!valid) return new NextResponse("Unauthorized", { status: 401 });

        const userDocument = await firestore
            .collection("users")
            .doc(params.userid)
            .get();

        if (!userDocument.exists) {
            const role = wlcList.includes(user!.email!) ? Roles.COORDINATOR : wlrList.includes(user!.email!) ? Roles.RECRUITER : Roles.CANDIDATE;
            const customClaims = { role: role };
            await firestore.doc(`users/${user!.uid}`).create({
                role: role
            });
            await getAuth().setCustomUserClaims(user!.uid, customClaims);
            return NextResponse.json({ role });
        }

        const userData = userDocument.data();

        return NextResponse.json(userData);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
