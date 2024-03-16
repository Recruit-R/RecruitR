import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRef } from 'react';
import { getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { uploadBytes, uploadString } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

export function ResumeButton(form : any) {
    const storage = getStorage();
    const fileRef = React.useRef<HTMLInputElement | null>(null);
    const metadata = {
        contentType: "application/pdf"
    }
    const [progresspercent, setProgresspercent] = useState(0);
    const handleChange = (event: any) => {
        event.preventDefault()
        const file = event.target[0]?.files[0]
        if(!file){
            return;
        }
        const resName = event.target.value.split("\\");
        const resumeRef = ref(storage, "resumes/" + resName.slice(resName.length - 1));
        const uploadTask = uploadBytesResumable(resumeRef, resName.slice(resName.length - 1), metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setProgresspercent(progress);
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    console.log("error: unauth")
                    break;
                  case 'storage/canceled':
                    // User canceled the upload
                    console.log("error: canceled")
                    break;
            
                  // ...
                  case 'storage/invalid-url':
                    console.log("error: invalid-url")
                    break;
            
                  case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    form.form.setValue('resumeURL', downloadURL);

                    console.log(downloadURL);
                })
                
            }
        )

        // uploadBytes(resumeRef, event, metadata).then(async (snapshot: any) => {
        //     const downLoadURL = await getDownloadURL(snapshot.ref);
        //     form.form.setValue('resumeURL', downLoadURL);
        //     console.log(downLoadURL);
        // })

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