import { Icons } from "@/components/ui/icons";

export function StudentInfo({ canData }: { canData: any }) {
    return (
        <div className="grid flex-1 items-center h-full grid-cols-1 xl:grid-cols-2">
    
        <p>
            <span className="font-bold">
                Year:
            </span>&nbsp;
            <span>
            {canData? 
                <>{canData.year}</> :
                <span><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>
            }

            </span>
        </p>
        <p>
            <span className="font-bold">
                Major:
            </span>&nbsp;
            <span>
            {canData? 
                <>{canData.major}</> :
                <span><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>
            }
            </span>
        </p>
        <p>
            <span className="font-bold">
                University:
            </span>&nbsp;
            <span>
            {canData? 
                <>{canData.university}</> :
                <span><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>
            }
            </span>
        </p>
        <p>
            <span className="font-bold">
                GPA:
            </span>&nbsp;
            <span>
            {canData? 
                <>{canData.gpa}</> :
                <span><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>
            }
            </span>
        </p>
        <p>
            <span className="font-bold">
                Email:
            </span>&nbsp;
            <span>
            {canData? 
                <>{canData.email}</> :
                <span><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>
            }
            </span>
        </p>
        </div>
    )
}