import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function PersonalForm({ className }: React.ComponentProps<"form">) {
    return (
      <form className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
            <Label>Year</Label>
            <Input id="year" defaultValue="Year" />
        </div>

        <div className="grid gap-2">
            <Label>Major</Label>
            <Input id="major" defaultValue="Major" />
        </div>

        <div className="grid gap-2">
            <Label>University</Label>
            <Input id="uni" defaultValue="University" />
        </div>

        <div className="grid gap-2">
            <Label>GPA</Label>
            <Input id="gpa" defaultValue="No Value" />
        </div>
        
        <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" defaultValue="email@domain" />
        </div>
        
      </form>
    )
  }
  