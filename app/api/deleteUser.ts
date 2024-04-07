import { auth } from '@/firebase/server';
import deleteData from "./deleteData";

async function deleteUser(userId: string) {
    const authUserDeletion = await auth?.deleteUser(userId);
    const dbUserDeletion = await deleteData("users", userId);
    return { authUserDeletion, dbUserDeletion };
}