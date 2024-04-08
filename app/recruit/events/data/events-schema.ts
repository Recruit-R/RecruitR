import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const eventSchema = z.object({
    title: z.string(),
    date: z.union([z.string(), z.undefined()]),
    location: z.string()
})
function convert(seconds: number, nanoseconds: number) {
    // Create a Date object from the seconds and nanoseconds.
    return new Date(seconds * 1000 + nanoseconds / 1000000);
}
export type RecruiterEvent = z.infer<typeof eventSchema>