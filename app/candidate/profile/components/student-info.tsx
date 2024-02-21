import {ClassName} from "postcss-selector-parser";
import {Student} from "@/app/recruit/home/data/student-schema";

interface StudentInfoProps {
    func: (classnames: string, conditionalNames: string, condition?: boolean) => string,
}

export function StudentInfo({func} : StudentInfoProps) {
    return (
        <div className={func("grid flex-1 items-center h-full grid-cols-1", "xl:grid-cols-2")}>
                <p>
                    <span className="font-bold">
                        Year:
                    </span>&nbsp;
                    <span>
                        2024
                    </span>
                </p>
                <p>
                    <span className="font-bold">
                        Major:
                    </span>&nbsp;
                    <span>
                        Exercise Science
                    </span>
                </p>
                <p>
                    <span className="font-bold">
                        University:
                    </span>&nbsp;
                    <span>
                        Grove City College
                    </span>
                </p>
                <p>
                    <span className="font-bold">
                        GPA:
                    </span>&nbsp;
                    <span>
                         5.0
                    </span>
                </p>
                <p>
                    <span className="font-bold">
                        Email:
                    </span>&nbsp;
                    <span>
                         mamafj20@gcc.edu
                    </span>
                </p>
        </div>
    )
}