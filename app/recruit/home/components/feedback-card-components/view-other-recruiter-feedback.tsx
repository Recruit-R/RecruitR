"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command.tsx"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx"
import { useContext, useEffect } from "react";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/dashboard.tsx";
import { Cross2Icon, StarFilledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator.tsx";

// const frameworks = [
//     {
//         value: "karen",
//         label: "Karen",
//     },
//     {
//         value: "john",
//         label: "John",
//     },
//     {
//         value: "caleb",
//         label: "Caleb",
//     }
// ]

export function ViewOtherRecruiterFeedback() {
    const { currentStudent, setCurrRecrFeedback, currRecrFeedback, currentUserEditId } = useContext(StudentDataContext) as StudentDataContextType
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(currRecrFeedback)
    const recruiter_emails = Object.keys(currentStudent?.feedback ?? {})

    const recruiters = recruiter_emails.filter(e => e !== currentUserEditId).map(e => {
        return {
            value: e,
            label: e
        }
    })

    useEffect(() => {
        if (recruiters.some(e => e.value == value)) {
            setCurrRecrFeedback(value)
            // setTempCurrentUser(value.charAt(0).toUpperCase() + value.slice(1))
        } else if (value === "") {
            setCurrRecrFeedback(currentUserEditId)
        } else {
            setCurrRecrFeedback(currentUserEditId)
        }

    }, [value])
    useEffect(() => {
        setValue("")
    }, [currentStudent]);
    return (
        <div className="flex">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        <span className="truncate">
                            {value && (value !== currentUserEditId)
                                ? value
                                : "Other Feedback..."}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search recruiter..." />
                        <CommandEmpty>No recruiters found.</CommandEmpty>
                        <CommandGroup>
                            {recruiters.map((recruiter) => (
                                <CommandItem
                                    key={recruiter.value}
                                    value={recruiter.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <div className="flex items-center overflow-hidden w-full justify-between">
                                        <div className="flex items-center overflow-hidden">
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === recruiter.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            <span className="truncate">
                                                {recruiter.label}
                                            </span>
                                        </div>
                                        <span className="flex text-nowrap font-semibold flex items-center justify-center">
                                            {currentStudent?.feedback?.[recruiter.value].rating ?? "-"} <StarFilledIcon className="h-4 w-4 ml-0.5 text-ring fill-current" />
                                        </span>
                                    </div>

                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            {
                (value !== "") &&
                (
                    <Button
                        variant="ghost"
                        className="p-3 ml-1"
                        onClick={e => {
                            setValue("")
                        }}
                    >
                        <Cross2Icon className="h-4 w-4" />
                    </Button>
                )
            }
        </div>

    )
}
