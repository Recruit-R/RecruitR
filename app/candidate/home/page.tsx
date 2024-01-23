import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SignOut from "../components/signout-button";

async function getUser() {
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
    return user
}

export default async function CandidateHome() {
    const user: DecodedIdToken | null = await getUser();
    if (user === null) {
        return redirect("/auth/login");
    } else if (user.role === "recruiter" || user.role === "coordinator") {
        return redirect("/recruiter/home");
    }

    return (
        <div>
            Candidate Home
            <SignOut />
        </div>
    )
}