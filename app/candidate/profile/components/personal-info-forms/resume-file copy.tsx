import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRef } from 'react';
import { getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { uploadBytes, uploadString } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

export function ResumeButton(form : any) {
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    let resName = ""

    function handleChange(event: any) {
        resName = event.target.files[0].value.split("\\")
        setFile(event.target.files[0])
    }

    const handleUpload = ()=>{
        if (!file) {
            alert("Please upload a file first!");
        }

        const storage = getStorage();
        
        const resumeRef = ref(storage, "resumes/" + resName.slice(resName.length - 1));
    }

    return (
        <Button type="button" onClick={handleUpload}>
            <input id="upload" name="upload" type="file" hidden
                onChange={handleChange} />
            Upload Resume
        </Button>
    )
}