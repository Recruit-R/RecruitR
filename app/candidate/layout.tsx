import React from "react";
import NavBar from "@/components/nav-bar";

export default function StudentLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex h-screen-dynamic flex-col grow-0 md:overflow-y-hidden">
            <div className="flex-0 px-4 border-y"><NavBar studentNav={true}/></div>
            <div className="flex-1 md:overflow-y-hidden">
                {children}
            </div>
        </section>
    )
}