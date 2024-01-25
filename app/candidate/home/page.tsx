import { DecodedIdToken } from "firebase-admin/auth";
import { redirect } from "next/navigation";

import { getUser } from "@/components/get-user";
import SignOut from "../components/signout-button";

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