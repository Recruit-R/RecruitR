import { auth } from '@/firebase/server';


export default async function validateUser(authToken: string | undefined) {
    if (auth && authToken) {
        try {
            // return await auth.getIdToken(authToken);
            try {
                const user = await auth.verifyIdToken(authToken, true);
            } catch (error) {
                return null;
            }


        } catch (error) {
            return null;
        }
    }
}