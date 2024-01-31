import { DecodedIdToken } from "firebase-admin/auth";
import { redirect } from "next/navigation";

import Roles from "@/app/types/roles";
import { getUser } from "@/components/get-user";
import SignOut from "../components/signout-button";

export default async function CandidateHome() {
    const user: DecodedIdToken | null = await getUser();
    console.log('candidate home', user);
    if (user === null) {
        return redirect("/auth/login");
    } else if (user.role === Roles.RECRUITER || user.role === Roles.COORDINATOR) {
        return redirect("/recruiter/home");
    }

    return (
        <div>
            Candidate Home
            <SignOut />
        </div>
    )
}