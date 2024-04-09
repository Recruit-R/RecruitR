import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import app from "../../firebase.config";

const db = getFirestore(app)
export default async function deleteData(collection: string, id: string) {
    let result = null;
    let error = null;
    let status = 200;

    try {
        result = await deleteDoc(doc(db, collection, id));
    } catch (e) {
        error = e;
        status = 500;
    }

    return { status, result, error };
}