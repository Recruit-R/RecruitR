import { eventSchema } from "@/app/recruit/events/data/events-schema";
import { studentSchema } from "@/app/recruit/home/data/student-schema";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { z } from "zod";
import app from "../../firebase.config";

const db = getFirestore(app)


export default async function getData({ collection_name, document_id, schemaName }: { collection_name: string, document_id?: string, schemaName?: string }) {
    if (document_id === null) {

        let docRef = doc(db, collection_name, document_id!);
        console.log(docRef);
    } else {
        let response = await collection(db, collection_name)
        let result = await getDocs(response);
        // console.log(result.docs)
        let data_list: any = {};
        if (schemaName !== "eventSchema") {
            result.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                if (Object.keys(doc.data()).length !== 0) {
                    let student = doc.data();
                    student.id = doc.id;
                    data_list[doc.id] = student;
                }
            });
        } else {
            data_list = []
            result.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                if (Object.keys(doc.data()).length !== 0) {
                    let event = doc.data();
                    data_list.push(event);
                }
            });
        }

        // console.log(data_list)
        // const students = JSON.parse(result.toString())
        if (schemaName != null && schemaName === "eventSchema") {
            return z.array(eventSchema).parse(data_list);
        } else {
            return z.record(studentSchema).parse(data_list)
        }
    }

}