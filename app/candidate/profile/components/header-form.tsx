import * as React from "react"

import { cn } from "@/lib/utils"
import useScreenWidth from "@/hooks/use-screen-width"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function HeaderForm({ className }: React.ComponentProps<"form">) {
    return (
        <form className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
            <Label>First Name</Label>
            <Input id="year" defaultValue="" />
        </div>

        <div className="grid gap-2">
            <Label>Last Name</Label>
            <Input id="year" defaultValue="" />
        </div>

    </form>
  )
}