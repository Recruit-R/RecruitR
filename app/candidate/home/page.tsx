'use client'
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignOut from "../components/signout-button";

export default function CandidateHome() {
    const router = useRouter();
    const auth = useAuth();
    useEffect(() => {
        if (!auth?.currentUser) {
            router.push("/auth/login");
        } else if (auth?.isCoordinator || auth?.isRecruiter) {
            router.push("/recruiter/home");
        }
    }, []);

    return (
        <div>
            Candidate Home
            <SignOut />
        </div>
    )
}