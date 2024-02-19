import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Refresh = () => {
    // This hook is something like https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/utils/auth/useUser.js
    const auth = useAuth();
    const router = useRouter();
    if (!auth) {
        router.replace('/auth/login')
        return null;
    }

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            router.replace('/auth/login')
            return;
        }
        const refresh = async () => {
            const res = await auth.refresh(currentUser);
            if (res) {
                router.back();
            } else {
                router.push('/auth/login');
            }
        }
        refresh();
    }, [])

    return (
        // Show a simple loading while refreshing token?
        <div>
            Refreshing...
        </div>
    )
}

export default Refresh
