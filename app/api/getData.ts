import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import app from "../../firebase.config";

const db = getFirestore(app)
export default async function getDoument({ collection_name, document_id }: { collection_name: string, document_id?: string }) {
    if (document_id === null) {

        let docRef = doc(db, collection_name, document_id);
    } else {
        let response = await collection(db, collection_name)
        let result = await getDocs(response);
        return result;
    }

}