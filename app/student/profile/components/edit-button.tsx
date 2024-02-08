import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import React from "react";
import {useRef} from 'react';
import {useState} from "react";

export function EditButton({pressed}: {pressed: boolean}){
    const [buttonPress, setPressed] = useState<boolean>(pressed)

    if(!buttonPress){
        return (
            <Button onClick={() => setPressed(prevState => !prevState)}>
                edit
            </Button>
        )
    }

    return(
        <div className="flex">
            <div className="pr-2">
                <Button onClick={() => setPressed(prevState => !prevState)}>
                    save
                </Button>
            </div>
            <Button onClick={() => setPressed(prevState => !prevState)}>
                cancel
            </Button>
        </div>
    )
}