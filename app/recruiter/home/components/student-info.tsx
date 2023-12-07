import {ClassName} from "postcss-selector-parser";
import {Student} from "@/app/recruiter/home/data/student-schema";

interface StudentInfoProps {
    func: (classnames: string, conditionalNames: string, condition?: boolean) => string,
    student: Student
}

export function StudentInfo({func, student} : StudentInfoProps) {
    return (
        <div className={func("grid flex-1 items-center h-full grid-cols-1", "xl:grid-cols-2")}>
            <div className="md:px-4">
                <p>
                    <span className="font-bold">
                        Year:
                    </span>&nbsp;
                    <span>
                        {student.year ? student.year : "N/A"}
                    </span>
                </p>
                <p>
                    <span className="font-bold">
                        Major:
                    </span>&nbsp;
                    <span>
                        {student.major}
                    </span>
                </p>
                <p>
                    <span className="font-bold">
                        University:
                    </span>&nbsp;
                    <span>
                        {student.university}
                    </span>
                </p>
                <p>
                    <span className="font-bold">
                        GPA:
                    </span>&nbsp;
                    <span>
                         {student.gpa ? student.gpa : "N/A"}
                    </span>
                </p>
            </div>
            <div className="md:px-4">
                Resume
            </div>
        </div>
    )
}