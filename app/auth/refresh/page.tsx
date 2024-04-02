'use client'
import { useAuth } from '@/components/auth-provider';
import { useEffect } from 'react';

const Refresh = () => {
    // This hook is something like https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/utils/auth/useUser.js
    const auth = useAuth();

    useEffect(() => {
        const currentUser = auth!.currentUser;
        const refresh = async () => {
            await auth!.refresh(currentUser!);
        }
        if (currentUser) {
            refresh();
        }
    }, [auth, auth?.currentUser])

    return (
        // Show a simple loading while refreshing token?
        <div>
            Refreshing...
        </div>
    )
}

export default Refresh
