import { Button } from "@/components/ui/button";
import app from "@/firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";

import { checkEnvironment } from "@/checkEnvironment";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Card } from "@/components/ui/card";

//

export function ResumeButton({ form, canData, setIsParsing }: { form: any, canData: any, setIsParsing: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [upping, setUpp] = useState(false)

    const [parseCheck, setParseCheck] = useState(false)

    const storage = getStorage(app);
    const fileRef = React.useRef<HTMLInputElement | null>(null);
    const newMetaData = {
        contentType: "application/pdf",
    }
    const { toast } = useToast()

    const handleChange = async (event: any) => {
        setUpp(true)
        var extension = event.target.files[0].type
        if (extension == "application/pdf") {
            const resName = event.target.value.split("\\");
            const resume = event.target.files[0];
            const parsedData = await parseResume(resume);

            //check if file type is pdf here?
            const resumeRef = ref(storage, "resumes/" + canData.id + resName.slice(resName.length - 1));
            uploadBytesResumable(resumeRef, event.target.files[0], newMetaData).then(async (snapshot: any) => {

                const downLoadURL = await getDownloadURL(snapshot.ref);
                if (parseCheck) {
                    updateForm(parsedData);
                }
                form.setValue('resumeURL', downLoadURL);
                (parseCheck ?
                    toast({
                        title: "Parsed and uploaded resume successfully!",
                        description: "Remember to save!",
                    })
                    :
                    toast({
                        title: "Uploaded resume successfully!",
                        description: "Remember to save!",
                    })
                )

                setUpp(false)
            })
        } else {
            toast({
                variant: "destructive",
                title: "Resume file type must be .pdf!",
            })
            setUpp(false)
        }
    };

    function updateForm(parsedData: any) {
        if (parsedData.degree)
            form.setValue('major', parsedData.degree[0]);
        if (parsedData.college_name)
            form.setValue('university', parsedData.college_name);
    }

    function blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    // Function to parse the PDF using the Flask API
    async function parseResume(file: File): Promise<any> {
        if (!parseCheck) {
            return
        }
        try {
            setIsParsing(true);
            // Convert the file to a base64 string
            const base64String = await blobToBase64(file);

            // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
            const base64Data = base64String.split(',')[1];

            // Prepare the request body
            const requestBody = JSON.stringify({ data: base64Data });

            const parserURL = checkEnvironment().PARSER_URL
            if (parserURL === undefined) {
                throw new Error('no parser api url');
            }
            // Make the fetch request to the Flask API
            const response = await fetch(parserURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the response JSON
            const responseData = await response.json();

            setIsParsing(false);

            return responseData;
        } catch (error) {
            setIsParsing(false);
            console.error('Error parsing the resume:', error);
            throw error;
        }
    }
    return (
        <>
            <div className="flex flex-row gap-3 items-center">
                <Button disabled={upping} type="button" onClick={() => fileRef.current && fileRef.current.click()}>
                    {upping && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    <input id="upload" name="upload" type="file" ref={fileRef} hidden
                        onChange={handleChange} />
                    Upload Resume
                </Button>
                <div className="flex items-center space-x-2 bg-muted p-1 px-2 rounded-sm">
                    <label
                        className="text-sm py-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Use Resume Autofill?
                    </label>
                    <Checkbox id="parseOrNot" checked={parseCheck} onCheckedChange={checked => setParseCheck(!parseCheck)} />
                </div>
            </div>
        </>
    )
}