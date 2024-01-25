import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";

export async function getUser() {
    const cookieStore = cookies();
    const authToken = cookieStore.get("firebaseIdToken")?.value;
    let user: DecodedIdToken | null = null;
    try {
        if (auth && authToken) {
            user = await auth.verifyIdToken(authToken);
        }
    } catch (error) {
        // One possible error is the token being expired, return forbidden
        console.log(error);
    }
    return user;
}
