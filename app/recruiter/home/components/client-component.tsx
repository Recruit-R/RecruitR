'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Textarea} from "@/components/ui/textarea";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FeedbackCard} from "@/app/recruiter/home/components/feedback-card";
import React, {createContext, useContext, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {studentColumns} from "@/app/recruiter/home/components/student-columns";
import {DataTable} from "@/app/recruiter/home/components/data-table/data-table.tsx";
import {Student, StudentList} from "@/app/recruiter/home/data/student-schema";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {useThrottle} from "@/app/hooks/useThrottle.ts";
import _ from "lodash";
import {addFeedback, feedbackReset} from "@/app/recruiter/home/actions.ts";
export interface StudentDataContextType {
    studentList: StudentList
    setStudentList: React.Dispatch<React.SetStateAction<StudentList>>
    currentStudent: Student | null
    setCurrentStudent: React.Dispatch<React.SetStateAction<Student>>
    saved: boolean
    setSaved: React.Dispatch<React.SetStateAction<boolean>>
    currRecrFeedback: string
    setCurrRecrFeedback: React.Dispatch<React.SetStateAction<string>>
    tempCurrentUser: string
    editable: () => boolean
    setTempCurrentUser: React.Dispatch<React.SetStateAction<string>>
}
export const StudentDataContext = createContext<StudentDataContextType | null>(null);

export default function ClientComponent({students} : {students : StudentList}) {
    const [tempCurrentUser, setTempCurrentUser] = useState("Caleb")
    const [feedbackFocus, setFeedbackFocus] = useState<boolean>(false)
    const [studentView, setStudentView] = useState<boolean>(false)
    const [currentStudent, setCurrentStudent] = useState<Student | null>(null)
    const [studentList, setStudentList] = useState<StudentList>(students);
    const [saved, setSaved] = useState(true)
    const [previousStudent, setPreviousStudent] = useState<Student | null>(null);
    const [currRecrFeedback, setCurrRecrFeedback] = useState(tempCurrentUser)
    let lastRating: number | undefined = 0;
    const editable = () => currRecrFeedback === tempCurrentUser // CHANGE TO AUTH USER ONCE IMPLEMENTED

    // const [currentRecruiterFeedback, setCurrentRecruiterFeedback] = useState()
    const c = (classnames: string, conditionalNames: string, condition:boolean=true) => {
        return cn(classnames, (feedbackFocus === condition) && conditionalNames)
    }
    function reset() {
        for (const studentListKey in studentList) {

            feedbackReset(studentListKey).then(e => console.log(e))
        }
    }
    function studentClick(name: string) {
        setStudentView(prevState => !prevState)
    }
    function changeCurrentStudent(student: Student){
        // console.log(student)
        // if (currentStudent != null) {
        //     console.log("Student")
        //     console.log(currentStudent.id)
        //     console.log(studentList)
        //     console.log(studentList[currentStudent.id])
        //     // studentList[currentStudent!.id] = currentStudent!;
        //
        //     // setStudentList(studentList)
        //     console.log(currentStudent)
        //     // setStudentList(prevState => ({...prevState, [currentStudent.id]: currentStudent!}))
        // }
        setCurrRecrFeedback(tempCurrentUser)
        setCurrentStudent((prevStudent) => {
            prevStudent && setStudentList(prevState => ({...prevState, [prevStudent.id]: prevStudent}))
            return student
        })
    }
    useEffect(() => {
        console.log(previousStudent)
        console.log(currentStudent)
        console.log(previousStudent?.avgRating === currentStudent?.avgRating)

        if ((previousStudent?.avgRating !== currentStudent?.avgRating) && currentStudent?.avgRating !== 0) {
            console.log("should update data table")

            currentStudent && setStudentList(prevState => ({...prevState, [currentStudent!.id]: {...currentStudent!, "feedback": currentStudent!.feedback, "avgRating": currentStudent!.avgRating}}))
        }
        setPreviousStudent(currentStudent);
    }, [currentStudent])
    return (
        <StudentDataContext.Provider  value={{
            studentList,
            setStudentList,
            currentStudent,
            setCurrentStudent,
            saved,
            setSaved,
            currRecrFeedback,
            setCurrRecrFeedback,
            tempCurrentUser,
            editable,
            setTempCurrentUser
        }}>

        {/*<div className="">*/}
        <div className="flex flex-row h-full">
            <div className={cn("h-full w-full bg-background p-1", studentView ? "max-md:hidden" : "", feedbackFocus ? "md:w-2/5 xl:w-1/4" : "md:w-3/5")}>
                <DataTable
                    setCurrentStudent={changeCurrentStudent}
                    setStudentView={setStudentView}
                    data={Object.values(studentList)}
                    columns={studentColumns(feedbackFocus)}
                    c={c}
                />
            </div>
            <div className="self-center">
                <Button
                    variant="outline"
                    className="max-md:hidden px-1 py-1"
                    onClick={() => setFeedbackFocus(prevState => !prevState)}>
                    {feedbackFocus ?
                        <ChevronRightIcon className="w-4"/>
                        : <ChevronLeftIcon className="w-4"/>}
                </Button>
            </div>
            {
                currentStudent ? (
                    <div className={cn("bg-background overflow-y-scroll overscroll-contain p-1", !studentView ? "max-md:hidden" : "", feedbackFocus ? "md:w-3/5 xl:w-3/4" : "md:w-2/5")}>
                        <FeedbackCard
                            feedbackFocus={feedbackFocus}
                            setStudentView={setStudentView}
                            currentStudent={currentStudent}
                            setCurrentStudent={setCurrentStudent}
                            c={c}
                        />
                    </div>
                ) : (
                    <div className={cn("bg-background overflow-y-scroll overscroll-contain p-1", !studentView ? "max-md:hidden" : "", feedbackFocus ? "md:w-3/5 xl:w-3/4" : "md:w-2/5")}>
                        <Card className="min-h-full flex items-center justify-center">
                        <CardContent className="flex flex-col gap-2 items-center justify-center p-0">
                            <p className="font-bold">
                                No Student Selected.
                            </p>
                            <p>
                                Select a student to view.
                            </p>
                        </CardContent>
                        </Card>
                    </div>

                )
            }
        </div>
        {/*</div>*/}
        </StudentDataContext.Provider>

    )
}