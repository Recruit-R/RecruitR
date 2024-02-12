import { auth } from '@/firebase/server';

export default async function validateUser(authToken: string | undefined) {
    if (auth && authToken) {
        try {
            return await auth.verifyIdToken(authToken);
        } catch (error) {
            return null;
        }
    }
}