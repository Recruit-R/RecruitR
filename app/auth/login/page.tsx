import { Metadata } from "next";
import { cookies } from 'next/headers';
import Link from "next/link";

import validateUser from "@/app/api/validateUser";
import Roles from "@/app/types/roles";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/firebase/server";
import { cn } from "@/lib/utils";
import { DecodedIdToken } from "firebase-admin/auth";
import { redirect } from "next/navigation";
import { UserAuthForm } from "../components/user-auth-form";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default async function LoginPage() {
    const cookieStore = cookies();
    const authToken = cookieStore.get("firebaseIdToken")?.value;
    if (authToken && auth) {
<<<<<<< HEAD
        let user: DecodedIdToken | null = null
        user = await auth.verifyIdToken(authToken);
        if (user.role === Roles.RECRUITER || user.role === Roles.COORDINATOR) {
            return redirect("/recruiter/home");
        } else {
            return redirect("/candidate/profile");
=======
        let user: DecodedIdToken | null | string = await validateUser(authToken);
        if (user === "auth/id-token-expired") {
            return redirect("/refresh");
        }
        if (typeof user !== "string") {
            if (user && (user.role === Roles.RECRUITER || user.role === Roles.COORDINATOR)) {
                return redirect("/recruiter/home");
            } else {
                return redirect("/candidate/home");
            }
>>>>>>> kw/authentication
        }
    }
    return (
        <>
            <div className="relative flex items-center justify-center align-center h-screen">
                <Link
                    href="/auth/signup"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Sign Up
                </Link>
                <div className="lg:p-8 w-full flex align-center">
                    <div className="m-auto flex w-1/4 flex-col justify-center space-y-6">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password below to login
                            </p>
                        </div>
                        <UserAuthForm signup={false} />
                    </div>
                </div>
            </div>
        </>
    )
}