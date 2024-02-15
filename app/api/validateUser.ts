import { auth } from '@/firebase/server';


export default async function validateUser(authToken: string | undefined) {
    if (auth && authToken) {
        try {
            // return await auth.getIdToken(authToken);
            const user = await auth.verifyIdToken(authToken, true);
            return user;

        } catch (error: any) {
            if (error.code === "auth/id-token-expired") {
                return error.code;
            }
            return null;
        }
    }
}