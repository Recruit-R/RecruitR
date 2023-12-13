import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const eventSchema = z.object({
    Title: z.string(),
    Time: z.union([z.object({
        seconds: z.number(),
        nanoseconds: z.number(),
    }), z.undefined()]),
    Location: z.string()
})

export type RecruiterEvent = z.infer<typeof eventSchema>