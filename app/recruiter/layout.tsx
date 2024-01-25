import React from "react";
import NavBar from "@/components/nav-bar";
import { DecodedIdToken } from "firebase-admin/auth";
import { getUser } from "@/components/get-user";
import { redirect } from "next/navigation";

export default async function RecruiterLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    const user: DecodedIdToken | null = await getUser();
    if (user === null) {
        return redirect("/auth/login");
    } else if (user.role === "recruiter" || user.role === "coordinator") {
        return redirect("/recruiter/home");
    }
    return (
        <section className="flex h-screen flex-col grow-0 overflow-y-hidden">
            <div className="flex-0 px-4 border-y"><NavBar /></div>
            <div className="flex-1 overflow-y-hidden">
                {children}
            </div>
        </section>
    )
}