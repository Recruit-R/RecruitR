import { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserAuthForm } from "../components/user-auth-form";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default async function SignUpPage() {
    return (
        <>
            <div className="relative flex items-center justify-center align-center h-screen">
                <Link
                    href="/auth/login"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Login
                </Link>
                <div className="p-8 lg:p-8 w-full flex align-center">
                    <div className="m-auto flex md:w-1/4 flex-col justify-center space-y-6">
                        <UserAuthForm signup={true} />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By signing up, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}