import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import app from "../../firebase.config";
import {any, string, z} from "zod";
import {Student, studentSchema} from "@/app/recruiter/home/data/student-schema";
import {eventSchema} from "@/app/recruiter/events/data/events-schema";

const db = getFirestore(app)


export default async function getData({ collection_name, document_id, schemaName }: { collection_name: string, document_id?: string, schemaName?: string}) {
    if (document_id === null) {

        let docRef = doc(db, collection_name, document_id!);
        console.log(docRef);
    } else {
        let response = await collection(db, collection_name)
        let result = await getDocs(response);
        // console.log(result.docs)
        let data_list: any = {}
        result.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            if (doc.data() != {}) {
                let student = doc.data();
                student.id = doc.id;
                data_list[doc.id] = student;
            }
        });
        // console.log(data_list)
        // const students = JSON.parse(result.toString())
        if (schemaName != null && schemaName === "eventSchema"){
            return z.array(eventSchema).parse(data_list);
        } else {
            return z.record(studentSchema).parse(data_list)
        }
    }

}