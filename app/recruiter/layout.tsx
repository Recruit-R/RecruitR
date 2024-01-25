import { getUser } from "@/components/get-user";
import NavBar from "@/components/nav-bar";
import { DecodedIdToken } from "firebase-admin/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function RecruiterLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    const user: DecodedIdToken | null = await getUser();
    if (user === null || (user.role === "recruiter" || user.role === "coordinator")) {
        return redirect("/auth/login");
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