import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const studentSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  university: z.union([z.string(), z.undefined()]),
  year: z.union([z.string(), z.undefined()]),
  gpa: z.union([z.number(), z.undefined()]),
  major: z.union([z.string(), z.undefined()]),
  // temp_id: z.union([z.number(), z.undefined()]),
  email: z.string(),
  placeOfResidence: z.union([z.string(), z.undefined()]),
  statusDate: z.union([z.object({
    seconds: z.number(),
    nanoseconds: z.number(),
  }).transform((object) => {return convert(object.seconds, object.nanoseconds)}), z.undefined()]),
  gradYear: z.union([z.number(), z.undefined()]),
  interview2: z.union([z.string(), z.undefined()]),
  interview1: z.union([z.string(), z.undefined()]),
  gradMonth: z.union([z.string(), z.undefined()])

})
function convert(seconds, nanoseconds) {
  // Create a Date object from the seconds and nanoseconds.
  return new Date(seconds * 1000 + nanoseconds / 1000000);
}
export type Student = z.infer<typeof studentSchema>
