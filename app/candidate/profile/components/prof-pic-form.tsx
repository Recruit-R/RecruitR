import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import { Edit2Icon } from "lucide-react";
import React from "react";
import {useRef} from 'react';

export function ProfPicEdit() {
    const refFile = React.useRef<HTMLInputElement>(null);
    let [file, setFile] = React.useState();
    const handleChange = (event: any) => {
        setFile(event.target.files[0]);
    };
    return (
        <Button onClick={() => {refFile.current ?
            refFile.current.click() : null}} 
        variant={'outline'}>
            <Edit2Icon>
                <input id="upload" name="upload" type="file" ref={refFile} hidden
                onChange={handleChange} /></Edit2Icon>
        </Button>
    )
}