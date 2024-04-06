import { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserAuthForm } from "../components/user-auth-form";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default async function LoginPage() {
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
                    <div className="m-auto flex md:w-1/4 flex-col justify-center space-y-6">
                        <UserAuthForm signup={false} />
                        <div className="flex flex-col">
                            <Button asChild variant={"link"}>
                                <Link href="/auth/reset" target="_blank">Forgot password?</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}