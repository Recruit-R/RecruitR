
export function StudentInfo({canData}: {canData: any}) {
    //console.log('can data info', canData);
    return (
        <div className="grid flex-1 items-center h-full grid-cols-1 xl:grid-cols-2">
    
        <p>
            <span className="font-bold">
                Year:
            </span>&nbsp;
            <span>
            {canData? 
                <>{canData.year}</> :
                <span>Loading...</span>
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
                <span>Loading...</span>
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
                <span>Loading...</span>
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
                <span>Loading...</span>
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
                <span>Loading...</span>
            }
            </span>
        </p>
        </div>
    )
}