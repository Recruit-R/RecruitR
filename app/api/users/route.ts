import Roles from "@/app/types/roles";
import { auth, firestore } from '@/firebase/server';
import { splitName } from "@/lib/utils";
import { DecodedIdToken } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import addData from "../addData";
import validateUser from "../validateUser";


export async function GET(
    request: NextRequest,
) {
    try {
        // verify firestore is available
        if (!firestore) return new NextResponse("No Firestore", { status: 500 });

        // validate authentication and get user from bearer token
        const userId = request.nextUrl.searchParams.get('uid')
        const authToken: string | undefined = getAuthToken(request);
        if (authToken === undefined) return new NextResponse("Unauthorized - bad token", { status: 401 });
        let user: DecodedIdToken | null = await validateUser(authToken) ?? null;

        // validate that user requesting role type is requesting it for themselves
        const valid = user?.uid === userId;
        if (!valid) return new NextResponse("Unauthorized - bad userid", { status: 401 });

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
        const authToken = getAuthToken(request);
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
        let name = splitName(body.name);

        const userData = {
            id: user!.uid,
            first_name: name[0],
            last_name: name[1],
            email: body.email,
            signup_time: new Date().toISOString(),
            role: role
        }
        // verify user does not already exist
        const userDocument = await firestore.doc(`users/${user!.uid}`).get();
        if (userDocument.exists) {
            const tmpUserData = userDocument.data();
            // manage partially setup user
            if (tmpUserData!.role === undefined && tmpUserData!.first_name && tmpUserData!.last_name) {
                userData.first_name = tmpUserData!.first_name;
                userData.last_name = tmpUserData!.last_name;
            } else {
                // handle user already existing
                return new NextResponse("User already exists", { status: 409 });
            }
        }

        const whiteListDocId = whiteList.docs.find((doc) => doc.data().email === body.email)?.id;

        // push user data to firestore and add custom claims data
        addData('users', user!.uid, userData);
        if (whiteListDocId) {
            addData('whitelist', whiteListDocId, { joined: true })
        }
        await auth!.setCustomUserClaims(user!.uid, customClaims);
        return NextResponse.json(customClaims, { status: 201 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

function getAuthToken(request: NextRequest) {
    return request.headers.get("authorization")?.split("Bearer ")[1];
}