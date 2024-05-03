'use client'
import Loading from '@/app/loading';
import { useAuth } from '@/components/auth-provider';
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
                router.push('/auth/login');
            } else {
                const refresh = async () => {
                    await auth.refresh(currentUser!);
                }
                refresh();

            }
        }
    }, [auth, auth?.currentUser])

    return (
        <Loading loading_name='Refreshing...' />
    )
}

export default Refresh
