"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const years = [

  {
    value: "Rising Sophomore",
    label: "Rising Sophomore",
  },
  {
    value: "Rising Junior",
    label: "Rising Junior",
  },
  {
    value: "Rising Senior",
    label: "Rising Senior",
  },
]

export function ComboboxYear({form, field} : {form: any, field: any}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  console.log(form)
  return (
    <Popover>
        <PopoverTrigger asChild>
                  <FormControl id = 'year'>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.Value && "text-muted-foreground"
                      )}
                    >
                      {field.Value
                        ? years.find(
                            (year) => year.value === field.value
                          )?.label
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {years.map((year) => (
                        <CommandItem
                          value={year.label}
                          key={year.value}
                          onSelect={() => {
                            form.setValue("year", year.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              year.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {year.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
  )
}
