import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import React from "react";
import {useRef} from 'react';

export function ResumeButton() {
    const fileRef = React.useRef();
    let [file, setFile] = React.useState();
    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };
    return (
        <Button onClick={() => fileRef.current.click()}>
            <input id="upload" name="upload" type="file" ref={fileRef} hidden
          onChange={handleChange} />
            upload resume
        </Button>
    )
}