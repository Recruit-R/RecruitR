import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const studentSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  university: z.string(),
  year: z.string(),
  gpa: z.union([z.number(), z.null()]),
  major: z.string(),
  temp_id: z.number()
})

export type Student = z.infer<typeof studentSchema>
