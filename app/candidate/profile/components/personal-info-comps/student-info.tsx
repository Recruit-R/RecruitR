import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { AlertCircle } from "lucide-react";

export function StudentInfo({ canData }: { canData: any }) {

    function fieldOrNA(field: any) {
        return field ? field : "N/A";
    }
    const fields: {[key: string]: any} = {
        "Year": fieldOrNA(canData?.year),
        "Major": fieldOrNA(canData?.major),
        "University": fieldOrNA(canData?.university),
        "GPA": fieldOrNA(canData?.gpa)
    }

    return (
        <div className="grid flex-1 items-center h-full grid-cols-1 pl-4">
            <div className="grid grid-cols-2 gap-3">
            {
                Object.keys(fields).map((key) => (
                    ((key != "Year") ? 
                    <Card key={key}>
                        <CardHeader className="p-3 pl-4 pr-4">
                            <CardTitle className="text-xl font-medium space-y-0">
                                {key}
                            </CardTitle>
                            <CardDescription className="text-md">
                                {canData? fields[key] : <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    :
                    (fields[key] == "N/A")?
                    <div>
                    <Alert variant="destructive" className="flex  flex-row items-center">
                        <div className="pr-4">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <AlertTitle className="text-xl font-medium">{key}</AlertTitle>
                            <AlertDescription className="text-md">
                                Please Edit Profile and set your current year.
                            </AlertDescription>
                        </div>
                        
                    </Alert>
                    </div>
                    :
                    <Card key={key}>
                        <CardHeader className="p-3 pl-4 pr-4">
                            <CardTitle className="text-xl font-medium space-y-0">
                                {key}
                            </CardTitle>
                            <CardDescription className="text-md">
                                {canData? fields[key] : <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    )
                ))
            }
            </div>
        </div>
    )
}