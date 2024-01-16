import { auth } from "@/firebase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignOut from "../components/signout-button";

export default function CandidateHome() {
    const cookieStore = cookies();
    const authToken = cookieStore.get("firebaseIdToken")?.value;

    if (!authToken || !auth) {
        return redirect("/");
    }

    return (
        <div>
            Candidate Home
            <SignOut />
        </div>
    )
}