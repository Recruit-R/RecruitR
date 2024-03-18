import { ClassName } from "postcss-selector-parser";
import { Student } from "@/app/recruit/home/data/student-schema.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import { BsCloudDownload } from "react-icons/bs";

interface StudentInfoProps {
    func: (classnames: string, conditionalNames: string, condition?: boolean) => string,
    student: Student,
    headerView: boolean
}

export function StudentInfo({ func, student, headerView }: StudentInfoProps) {
    function fieldOrNA(field: any) {
        return field ? field : "N/A";
    }

    const fields: {[key: string]: any} = {
        "Year": fieldOrNA(student?.year),
        "Major": fieldOrNA(student?.major),
        "University": fieldOrNA(student?.university),
        "GPA": fieldOrNA(student?.gpa)
    }
    const body = (
        <div className="grid grid-cols-2 gap-3">
            {
                Object.keys(fields).map((key) => (
                    <Card key={key}>
                        <CardHeader className="p-3">
                            <CardTitle className="text-xl font-medium space-y-0">
                                {key}
                            </CardTitle>
                            <CardDescription className="text-md">
                                {fields[key]}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))
            }
        </div>
    )
    const header = (
        <div className="w-full flex-1">
            <div className="">
                {
                    Object.keys(fields).map((key) => (
                        <div key={key}>
                            <p className=""><span className="font-semibold">{key}:</span> <span className="text-muted-foreground">{fields[key]}</span></p>
                        </div>
                    ))
                }

            </div>

        </div>
)
    return (
        <div className={func("grid flex-1 items-center grid-cols-1 gap-3", "xl:grid-cols-2")}>
            {student &&
            headerView ?
                header : body

            }
        </div>
    )
}