import { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import picture from "@/resources/assets/logo-v2.svg";
import Image from "next/image";
import { UserAuthForm } from "../../components/user-auth-form";
export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default async function LoginPage({ params }: { params: { eventId: string } }) {
    const eventId = params?.eventId?.[0];
    console.log(params);
    return (
        <>
            <div className="relative flex items-center justify-center align-center h-screen">
                <Link
                    href={`/auth/signup` + (eventId ? `/${eventId}` : "")}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Sign Up
                </Link>
                <div className="lg:p-8 w-full flex align-center">
                    <div className="m-auto flex w-full px-4 sm:w-3/4 md:w-1/2 lg:w-1/3 flex-col justify-center space-y-6">
                        <UserAuthForm signup={false} eventId={eventId} />
                    </div>
                </div>
            </div>
        </>
    )
}