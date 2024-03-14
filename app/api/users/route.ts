import Roles from "@/app/types/roles";
import { auth, firestore } from '@/firebase/server';
import { DecodedIdToken } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import validateUser from "../validateUser";


export async function POST(
    request: NextRequest,
) {
    const body = await request.json();
    try {
        if (!firestore)
            return new NextResponse("No Firestore", { status: 500 });

        const authToken =
            request.headers.get("authorization")?.split("Bearer ")[1] || undefined;

        let user: DecodedIdToken | null = await validateUser(authToken) ?? null;

        // validate that user requesting role type is requesting it for themselves
        const valid = user?.uid === body.uid;
        if (!valid) return new NextResponse("Unauthorized", { status: 401 });

        const whiteList = await firestore.collection("whitelist").get();
        const whiteListedRecruiters = new Set(whiteList.docs.map((doc) => doc.data()).filter((doc) => doc.role === Roles.RECRUITER).map((doc) => doc.email));
        const whiteListedCoordinators = new Set(whiteList.docs.map((doc) => doc.data()).filter((doc) => doc.role === Roles.COORDINATOR).map((doc) => doc.email));
        let userDocument = await firestore
            .collection("users")
            .doc(body.uid)
            .get();



        if (!userDocument.exists) {
            const whiteList = await firestore.collection("whitelist").get();
            const whiteListedCoordinators = new Set(whiteList.docs.map((doc) => doc.data().role == Roles.COORDINATOR ? doc.data().email : null).filter((email) => email));
            const whiteListedRecruiters = new Set(whiteList.docs.map((doc) => doc.data().role == Roles.RECRUITER ? doc.data().email : null).filter((email) => email));
            const role = whiteListedCoordinators.has(user!.email!) ? Roles.COORDINATOR : whiteListedRecruiters.has(user!.email!) ? Roles.RECRUITER : Roles.CANDIDATE;
            const customClaims = { role: role };
            let name = body.name ? body.name.split(" ") : ['Johne', 'Doe'];
            if (name.length == 1) {
                name = [body.name, ""];
            } else if (name.length > 2) {
                name = [name[0], name.slice(1).join(" ")]
            }
            const userData = {
                first_name: name[0],
                last_name: name[1],
                email: body.email,
                role: role
            }
            await firestore.doc(`users/${user!.uid}`).create(userData);
            await auth!.setCustomUserClaims(user!.uid, customClaims);
            return NextResponse.json({ role });
        }

        const userData = userDocument.data();
        return NextResponse.json(userData);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}


// export async function POST(
//     request: NextRequest
// ) {
//     const data = await request.json();
//     // const { first}

// }