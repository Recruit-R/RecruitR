import { Button } from "@/components/ui/button.tsx";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useContext, useState } from "react";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/dashboard.tsx";
import { deleteStudent } from "@/app/recruit/home/actions.ts";
import { FaTrash } from "react-icons/fa";
import { PopupDialog } from "@/app/recruit/events/components/popup-dialog.tsx";
import { Event } from "@/app/types/event.ts";
import deleteData from "@/app/api/deleteData.ts";

export function DeleteStudent() {

    const { currentStudent, setCurrentStudent, studentList, setStudentList } = useContext(StudentDataContext) as StudentDataContextType
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const DeleteStudentConfirmationForm = ({ setDeleteOpen }: { setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
        return (
            <div className="flex items-center justify-center">
                <Button
                    className="w-64"
                    variant="destructive"
                    onClick={() => {
                        currentStudent?.id &&
                            deleteStudent(currentStudent.id).then(e => {

                                setCurrentStudent(null)
                                const updatedList = studentList!
                                delete updatedList[currentStudent.id]
                                setStudentList(studentList)
                            })

                    }}
                >

                    <TrashIcon className="h-4 w-4" /> Delete Student
                </Button>
            </div>
        )
    }
    return (
        <PopupDialog
            popupButton={<Button
                className="w-64"
                variant="destructive"><TrashIcon className="h-4 w-4" /> Delete Student</Button>}
            title={`Delete Student`}
            description="Are you sure you want to delete this student?"
            dialogContent={<DeleteStudentConfirmationForm setDeleteOpen={setDeleteOpen} />}
            open={deleteOpen}
            setOpen={setDeleteOpen}
        />
    )
}