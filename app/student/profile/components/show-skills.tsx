import {Label} from "@/components/ui/label";
import React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export function ShowSkills(){
    const languages: Array<string> = ["Python", "Java", "Kotlin", "R", "Angular", ".NET", "Canva", "Adobe Photoshop", "Agile Philosophy", "Power BI", "Azure DevOps", "Waterfall Methodologies"]
    return (
    <div className="flex flex-wrap gap-2">
        {
            languages.map((language) => (
                <div className="flex items-center space-x-2 bg-muted pl-2 rounded-full" key={language}>
                        <label
                            htmlFor={language}
                                className="text-sm py-2 pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        {language}
                                    </label>
                    </div>
                    ))
        }
        <Button className="flex items-center space-x-2 pl-2 rounded-full"><PlusIcon/>
            <p className="text-sm py-2 pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Add Skills
            </p>
        </Button>
    </div>)
    }
    