import {ClassName} from "postcss-selector-parser";
import {Student} from "@/app/recruit/home/data/student-schema";



export function StudentInfo(can_data: any,) {
    return (
        <div className="grid flex-1 items-center h-full grid-cols-1 xl:grid-cols-2">
                <p>
                    <span className="font-bold">
                        Year:
                    </span>&nbsp;
                    <span>
                    {can_data ? 
                        <>{can_data.year}</> :
                        <p>No Year</p>
                    }

                    </span>
                </p>
                <p>
                    <span className="font-bold">
                        Major:
                    </span>&nbsp;
                    <span>
                    {can_data ? 
                        <>{can_data.major}</> :
                        <p>No Major</p>
                    }
                    </span>
                </p>
                <p>
                    <span className="font-bold">
                        University:
                    </span>&nbsp;
                    <span>
                    {can_data ? 
                        <>{can_data.university}</> :
                        <p>No University</p>
                    }
                    </span>
                </p>
                <p>
                    <span className="font-bold">
                        GPA:
                    </span>&nbsp;
                    <span>
                    {can_data ? 
                        <>{can_data.gpa}</> :
                        <p>No GPA</p>
                    }
                    </span>
                </p>
                <p>
                    <span className="font-bold">
                        Email:
                    </span>&nbsp;
                    <span>
                    {can_data ? 
                        <>{can_data.email}</> :
                        <p>No Email</p>
                    }
                    </span>
                </p>
        </div>
    )
}