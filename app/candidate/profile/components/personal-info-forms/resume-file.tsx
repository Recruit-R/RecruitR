import { Button } from "@/components/ui/button";
import app from "@/firebase.config";
import { getStorage } from "firebase/storage";
import React, { useState } from "react";

import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";

export function ResumeButton(form: any) {
    const [upping, setUpp] = useState(false)

    const storage = getStorage(app);
    const fileRef = React.useRef<HTMLInputElement | null>(null);
    const newMetaData = {
        contentType: "application/pdf",
    }
    const { toast } = useToast()

    const handleChange = async (event: any) => {
        // console.log()
        // setUpp(true)
        // //console.log('event', event);
        var extension = event.target.files[0].type
        // console.log(event.target.files[0].type)
        if (extension == "application/pdf") {


            const resName = event.target.value.split("\\");
            const resume = event.target.files[0];
            const parsedData = await parseResume(resume);
            console.log(parsedData);
            // //check if file type is pdf here?
            //     const resumeRef = ref(storage, "resumes/" + form.canDataId + resName.slice(resName.length - 1));
            // //console.log('storage', storage);
            // //console.log(resumeRef);
            //     uploadBytesResumable(resumeRef, event.target.files[0], newMetaData).then(async (snapshot: any) => {

            //     const downLoadURL = await getDownloadURL(snapshot.ref);
            //     form.form.setValue('resumeURL', downLoadURL);
            //     toast({
            //         title: "Resume Uploaded!",
            //         description: "  Remember to save!",
            //     })
            //     setUpp(false)   
            //     })
        } else {
            toast({
                variant: "destructive",
                title: "Resume file type must be .pdf!",
            })
            setUpp(false)
        }

        //console.log(event.target.value);
    };

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
        try {
            // Convert the file to a base64 string
            const base64String = await blobToBase64(file);

            // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
            const base64Data = base64String.split(',')[1];

            // Prepare the request body
            const requestBody = JSON.stringify({ data: base64Data });

            if (process.env.PARSER_API === undefined) {
                throw new Error('no parser api url');
            }
            console.log('trying to parse resume')

            // Make the fetch request to the Flask API
            const response = await fetch(process.env.PARSER_API, {
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

            return responseData;
        } catch (error) {
            console.error('Error parsing the resume:', error);
            throw error;
        }
    }
    return (
        <>

            <Button disabled={upping} type="button" onClick={() => fileRef.current && fileRef.current.click()}>
                {upping && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                <input id="upload" name="upload" type="file" ref={fileRef} hidden
                    onChange={handleChange} />
                Upload Resume
            </Button>
        </>
    )
}