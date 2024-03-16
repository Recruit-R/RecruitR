import Roles from "@/app/types/roles";
import { auth, firestore } from '@/firebase/server';
import { DecodedIdToken } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import validateUser from "../validateUser";


export async function GET(
    request: NextRequest,
    params: { id: string }
) {
    try {
        // verify firestore is available
        if (!firestore) return new NextResponse("No Firestore", { status: 500 });

        // validate authentication and get user from bearer token
        const userId = params.id;
        const authToken: string | undefined = await getAuthToken(request);
        if (authToken === undefined) return new NextResponse("Unauthorized", { status: 401 });
        let user: DecodedIdToken | null = await validateUser(authToken) ?? null;

        // validate that user requesting role type is requesting it for themselves
        const valid = user?.uid === userId;
        if (!valid) return new NextResponse("Unauthorized", { status: 401 });

        // get user data from firestore
        let userDocument = await firestore
            .collection("users")
            .doc(userId)
            .get();

        // return user data
        const userData = userDocument.data();
        if (userData === undefined) return new NextResponse("User not found", { status: 404 });
        if (userData.role === undefined) return new NextResponse("Role not found", { status: 404 });
        return NextResponse.json({ role: userData.role }, { status: 200 });
    } catch (error) {
        console.log('get error', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function POST(
    request: NextRequest
) {
    try {
        // verify firestore is available
        if (!firestore) return new NextResponse("No Firestore", { status: 500 });

        // validate authentication and get user from bearer token
        const authToken = await getAuthToken(request);
        let user: DecodedIdToken | null = await validateUser(authToken) ?? null;
        const body = await request.json();

        // get user-role whitelists
        const whiteList = await firestore.collection("whitelist").get();
        const whiteListedCoordinators = new Set(whiteList.docs.map((doc) => doc.data().role == Roles.COORDINATOR ? doc.data().email : null).filter((email) => email));
        const whiteListedRecruiters = new Set(whiteList.docs.map((doc) => doc.data().role == Roles.RECRUITER ? doc.data().email : null).filter((email) => email));

        // get user role according to whitelists
        const role = whiteListedCoordinators.has(user!.email!) ? Roles.COORDINATOR : whiteListedRecruiters.has(user!.email!) ? Roles.RECRUITER : Roles.CANDIDATE;
        const customClaims = { role: role };

        // extract/create user data 
        let name = body.name ? body.name.split(" ") : ['John', 'Doe'];
        if (name.length == 1) {
            name = [body.name, ""];
        } else if (name.length > 2) {
            name = [name[0], name.slice(1).join(" ")]
        }

        const userData = {
            id: user!.uid,
            first_name: name[0],
            last_name: name[1],
            email: body.email,
            role: role
        }

        // push user data to firestore and add custom claims data
        await firestore.doc(`users/${user!.uid}`).create(userData);
        await auth!.setCustomUserClaims(user!.uid, customClaims);
        return NextResponse.json(customClaims, { status: 201 });
    } catch (error) {
        console.log('post error', error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function getAuthToken(request: NextRequest) {
    return request.headers.get("authorization")?.split("Bearer ")[1];
}