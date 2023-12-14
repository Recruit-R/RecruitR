import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import app from "../../firebase.config";
import { z } from "zod";
import { studentSchema } from "@/app/recruiter/home/data/student-schema";
import {eventSchema} from "@/app/recruiter/events-demo/data/events-schema";

const db = getFirestore(app)
export default async function getDoument({ collection_name, document_id, schemaName }: { collection_name: string, document_id?: string, schemaName?: string }) {
    if (document_id === null) {

        let docRef = doc(db, collection_name, document_id);
    } else {
        let response = await collection(db, collection_name)
        let result = await getDocs(response);
        // console.log(result.docs)
        let data_list = []
        result.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (doc.data() != {}) {
                data_list.push(doc.data());
            }
        });
        // const students = JSON.parse(result.toString())
        if (schemaName != null && schemaName === "eventSchema"){
            return z.array(eventSchema).parse(data_list);
        } else {
            return z.array(studentSchema).parse(data_list)
        }
    }

}