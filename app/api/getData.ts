import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import app from "../../firebase.config";
import { z } from "zod";
import { studentSchema } from "@/app/recruiter/home/data/student-schema";

const db = getFirestore(app)
export default async function getDoument({ collection_name, document_id }: { collection_name: string, document_id?: string }) {
    if (document_id === null) {

        let docRef = doc(db, collection_name, document_id);
    } else {
        let response = await collection(db, collection_name)
        let result = await getDocs(response);
        // console.log(result.docs)
        let student_list = []
        result.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (doc.data() != {}) {
                student_list.push(doc.data());
            }
        });
        console.log("Student list: ")
        console.log(student_list)
        // const students = JSON.parse(result.toString())
        return z.array(studentSchema).parse(student_list);
    }

}