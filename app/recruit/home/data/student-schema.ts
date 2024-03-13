import { record, z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const feedbackSchema = z.record(z.object({
  initial_feedback: z.number().optional(),
  possible_placement: z.string().optional(),
  known_tech: z.string().array().optional(),
  text_feedback: z.string().optional(),
  rating: z.number().optional()
}))
export type Feedback = z.infer<typeof feedbackSchema>
export const studentSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  university: z.union([z.string(), z.undefined()]),
  year: z.union([z.string(), z.undefined()]),
  gpa: z.union([z.number(), z.undefined()]),
  major: z.union([z.string(), z.undefined()]),
  // temp_id: z.union([z.number(), z.undefined()]),
  email: z.string(),
  about_me: z.string(),
  placeOfResidence: z.union([z.string(), z.undefined()]),
  statusDate: z.union([z.object({
    seconds: z.number(),
    nanoseconds: z.number(),
  }).transform((object) => { return convert(object.seconds, object.nanoseconds) }), z.undefined()]),
  gradYear: z.union([z.number(), z.undefined()]),
  interview2: z.union([z.string(), z.undefined()]),
  interview1: z.union([z.string(), z.undefined()]),
  gradMonth: z.union([z.string(), z.undefined()]),
  avgRating: z.union([z.number(), z.nan()]).optional(),
  feedback: feedbackSchema.optional(),
})
export const studentListSchema = z.record(studentSchema);
function convert(seconds: number, nanoseconds: number) {
  // Create a Date object from the seconds and nanoseconds.
  return new Date(seconds * 1000 + nanoseconds / 1000000);
}
export type Student = z.infer<typeof studentSchema> | null
export type StudentList = z.infer<typeof studentListSchema>