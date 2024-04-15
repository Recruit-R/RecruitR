import { getStudentList } from "@/app/recruit/home/actions.ts";
import Dashboard from "@/app/recruit/home/components/dashboard.tsx";
import { StudentList } from "@/app/recruit/home/data/student-schema";
import { headers } from "next/headers";
import { Suspense } from "react";

import app from '@/firebase.config';
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore(app)


async function StudentListLoader() {
    const students = await getStudentList();
    return <Dashboard studentData={students} />
}

async function StudentListWithSuspense({
    students,
}: {
    students?: StudentList;
}) {
    if (students) {
        return <Dashboard studentData={students} />
    }

    return (
        <Suspense fallback={"Testing Loader"}>
            <StudentListLoader />
        </Suspense>
    )
}
export default async function Page() {
    const fuck = collection(db, 'users');
    const users = await getDocs(fuck);
    for (let user of users.docs) {


        const d = user.data();
        const newF = {
            ...d.feedback
        }
        for (let key of Object.keys(d)) {
            if (key.includes('@')) {
                delete d[key];
            }
        }
        delete newF['possible_placement'];
        delete d['newF'];
        const newD = {
            ...d,
            feedback: newF
        }
        setDoc(doc(db, 'users', user.id), newD)

    }

    let students: StudentList | undefined;
    if (headers().get("accept")?.includes("text/html")) {
        students = await getStudentList();
    }
    return (
        <StudentListWithSuspense students={students} />
    )
}