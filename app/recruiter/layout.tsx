'use client'
import { useAuth } from "@/components/auth-provider";
import NavBar from "@/components/nav-bar";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RecruiterLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const router = useRouter();

    const auth = useAuth();
    useEffect(() => {
        if (!(auth?.isCoordinator || auth?.isCoordinator)) {
            router.push("/login");
        }
    }, []);

    return (
        <section className="flex h-screen flex-col grow-0 overflow-y-hidden">
            <div className="flex-0 px-4 border-y"><NavBar /></div>
            <div className="flex-1 overflow-y-hidden">
                {children}
            </div>
        </section>
    )
}