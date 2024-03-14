import { DocumentData, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import app from "../../firebase.config";

const db = getFirestore(app)

interface DocumentFilter {
    field: string,
    operator: (a: string, b: string) => boolean,
    value: string

}


export default async function getData({ collection_name, document_id, schemaName, filter }:
    {
        collection_name: string, document_id?: string, schemaName?: string, filter?: DocumentFilter
    }) {
    if (document_id !== null && document_id !== undefined) {

        let docRef = doc(db, collection_name, document_id!);
        return (await getDoc(docRef)).data();
    } else {
        let response = await collection(db, collection_name)
        let result = await getDocs(response);
        // console.log(result.docs)
        let data_list: any = {};
        if (schemaName !== "eventSchema") {
            data_list = filterData({ data: result, filter: filter! });
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

        return data_list
    }

}

export function filterData({ data, filter }:
    {
        data: DocumentData, filter: DocumentFilter
    }) {
    let filtered_data: any = [];
    for (let i = 0; i < data.docs.length; i++) {
        let doc = data.docs[i];
        // TODO: make this based on filter.operator
        if (filter !== undefined && !(filter.operator(doc.data()[filter.field], filter.value))) {
            continue;
        }
        let dataPoint = doc.data();
        dataPoint.id = doc.id;
        filtered_data.push(dataPoint);
    }
    return filtered_data;
}