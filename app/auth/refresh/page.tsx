'use client'
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Refresh = () => {
    // This hook is something like https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/utils/auth/useUser.js
    const [refresh, setRefresh] = useState<boolean>(false);
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        const currentUser = auth!.currentUser;

        const refresh = async () => {
            if (currentUser) {
                const res = await auth!.refresh(currentUser!);
                setRefresh(res);
            }
        }
        refresh();
    }, [auth!.currentUser])

    useEffect(() => {
        if (refresh) {
            router.back();
        }
    }, [refresh])


    return (
        // Show a simple loading while refreshing token?
        <div>
            Refreshing...
        </div>
    )
}

export default Refresh
