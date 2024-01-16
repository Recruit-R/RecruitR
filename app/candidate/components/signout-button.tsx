'use client'
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";

export default function SignOut() {
    const auth = useAuth();


    return (
        <Button
            variant="outline"
            type="button"
            onClick={() => {
                auth?.logout().then(() => {
                    console.log("gotta redirect to login page");
                }).catch((error: any) => {
                    console.log(error);
                });
            }}
            className='w-full'>
            Sign out
        </Button>
    );
}