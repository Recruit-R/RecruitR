import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import React, {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {z} from "zod";

export function KnownTech({knownTech}:{knownTech: string[]}) {
    const languages: Array<string> = ["Python", "Java", "Kotlin", "R", "Angular", ".NET", "Canva", "Adobe Photoshop", "Agile Philosophy", "Power BI", "Azure DevOps", "Waterfall Methodologies"]
    const [knownLanguages, setKnownLanguages] = useState(knownTech)
    const handleCheckedChange = (event: any) => {

    }
    return (
        <div className="space-y-1">
            <p className="font-bold text-lg">
                Known Tech
            </p>
            <div className="flex flex-wrap gap-2">
                {
                    languages.map((language) => (
                        <div className="flex items-center space-x-2 bg-muted pl-2 rounded-full" key={language}>
                            <Checkbox
                                id={language}
                                defaultChecked={knownTech.includes(language)}
                                onCheckedChange={handleCheckedChange}
                            />
                            <label
                                htmlFor={language}
                                className="text-sm py-2 pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {language}
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}