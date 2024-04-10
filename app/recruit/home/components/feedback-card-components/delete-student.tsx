import {Button} from "@/components/ui/button.tsx";
import {TrashIcon} from "@radix-ui/react-icons";
import {useContext} from "react";
import {StudentDataContext, StudentDataContextType} from "@/app/recruit/home/components/dashboard.tsx";
import {deleteStudent} from "@/app/recruit/home/actions.ts";

export function DeleteStudent() {
    const { currentStudent, setCurrentStudent, studentList, setStudentList } = useContext(StudentDataContext) as StudentDataContextType

    return (
        <Button
            className="w-64"
            variant="destructive"
            onClick={() => {
                currentStudent?.id &&
                    deleteStudent(currentStudent.id).then(e => {
                        console.log(`e = ${e}`)
                        console.log("DELETED")
                        setCurrentStudent(null)
                        const updatedList = studentList!
                        delete updatedList[currentStudent.id]
                        setStudentList(studentList)
                    })

            }}
        >

            <TrashIcon className="h-4 w-4"/> Delete Student
        </Button>
    )
}