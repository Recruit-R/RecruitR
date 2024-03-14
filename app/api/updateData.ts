import {doc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import app from "../../firebase.config";

const db = getFirestore(app)
export default async function updateData(collection: string, id: string, data: any) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, collection, id), data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}