import React from "react";
import NavBar from "@/components/nav-bar";

export default function RecruiterLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex h-screen-dynamic flex-col grow-0 overflow-y-hidden no-scrollbar">
            <div className="flex-0 px-4 border-y"><NavBar studentNav={false}/></div>
            <div className="flex-1 overflow-y-scroll no-scollbar">
                {children}
            </div>
        </section>
    )
}