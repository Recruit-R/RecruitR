import ClientComponent from "@/app/student/profile/components/client-component";
import getData from "../../api/getData";



export default async function Page() {
    // const students = await getStudents()
    const new_students = await getData({ collection_name: 'users' })
    console.log(new_students);
    return (
        <ClientComponent students={new_students} />
    )
}