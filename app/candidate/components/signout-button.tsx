'use client'
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignOut() {
    const auth = useAuth();
    const router = useRouter();

    return (
        <Button
            variant="outline"
            type="button"
            onClick={() => {
                auth?.logout().then(() => {
                    router.push("/auth/login");
                }).catch((error: any) => {
                    console.log(error);
                });
            }}
            className='w-full'>
            Sign out
        </Button>
    );
}