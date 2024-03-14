import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { Dispatch, SetStateAction } from "react";
import { useRef } from 'react';
import { getStorage, ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

export function ResumeButton(form : any) {
    const storage = getStorage();
    const fileRef = React.useRef<HTMLInputElement | null>(null);
    const newMetaData = {
        contentType: "application/pdf"
    }
    const handleChange = (event: any) => {
        const resName = event.target.value.split("\\");
        const resumeRef = ref(storage, "resumes/" + resName.slice(resName.length - 1));
        uploadBytes(resumeRef, event).then(async (snapshot: any) => {
            const downLoadURL = await getDownloadURL(snapshot.ref);
            form.form.setValue('resumeURL', downLoadURL);
            console.log(downLoadURL);
        })

        //console.log(event.target.value);
    };
    return (
        <Button type="button" onClick={() => fileRef.current && fileRef.current.click()}>
            <input id="upload" name="upload" type="file" ref={fileRef} hidden
                onChange={handleChange} />
            Upload Resume
        </Button>
    )
}