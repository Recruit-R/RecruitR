'use client'
import { useAuth } from '@/components/auth-provider';
import { Icons } from '@/components/ui/icons';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Refresh = () => {
    // This hook is something like https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/utils/auth/useUser.js
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (auth) {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                router.push('/auth/login')
            } else {
                const refresh = async () => {
                    await auth.refresh(currentUser!);
                }
                refresh();
            }
        } else {
            router.push('/auth/login')
        }
    }, [auth, auth?.currentUser])

    return (
        <div className='h-full flex justify-center items-center gap-4'>
            <span className="text-3xl my-auto">Refreshing...</span>
            <Icons.spinner className="h-54 w-54 animate-spin" />
        </div>
    )
}

export default Refresh
