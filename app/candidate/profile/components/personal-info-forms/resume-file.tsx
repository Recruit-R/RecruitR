import { Button } from "@/components/ui/button";
import app from "@/firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Icons } from "@/components/ui/icons";
import { metadata } from "@/app/layout";

export function ResumeButton(form: any) {
    const [upping, setUpp] = useState(false)

    const storage = getStorage(app);
    const fileRef = React.useRef<HTMLInputElement | null>(null);
    const newMetaData = {
        contentType: "application/pdf",
    }
    const { toast } = useToast()

    const handleChange = (event: any) => {
        console.log()
        setUpp(true)
        //console.log('event', event);
        var extension =  event.target.files[0].type
        console.log(event.target.files[0].type)
        if(extension == "application/pdf"){

            const resName = event.target.value.split("\\");
        //check if file type is pdf here?
            const resumeRef = ref(storage, "resumes/" + form.canDataId + resName.slice(resName.length - 1));
        //console.log('storage', storage);
        //console.log(resumeRef);
            uploadBytesResumable(resumeRef, event.target.files[0], newMetaData).then(async (snapshot: any) => {

            const downLoadURL = await getDownloadURL(snapshot.ref);
            form.form.setValue('resumeURL', downLoadURL);
            toast({
                title: "Resume Uploaded!",
                description: "  Remember to save!",
            })
            setUpp(false)   
            })
        }
        else {
            toast({ variant: "destructive",
                title: "Resume file type must be .pdf!",
            })
            setUpp(false)
        }
        
        //console.log(event.target.value);
    };
    return (
        <>
            
            <Button disabled = {upping} type="button" onClick={() => fileRef.current && fileRef.current.click()}>
                {upping && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                <input id="upload" name="upload" type="file" ref={fileRef} hidden
                    onChange={handleChange} />
                Upload Resume
            </Button>
        </>
    )
}