
import { z } from "zod"

export const personalInfoSchema = z.object({
  firstName: z.string({ message: "First Name is required" }).min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  gender: z.enum(['male', 'female', 'other']), // Using enum for better type safety
  birthDate: z.coerce.date().max(
    new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000),
    "Must be at least 10 years old"
  ),
  street: z.string().min(1, "Street is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.coerce.number().int().positive("Apartment number must be a positive integer"),
})


export const friendSchema = z.object({
  id: z.string().optional(),
  firstName: z.string({
    required_error: "First name is required",
    invalid_type_error: "First Name must be a text value"
  })
    .min(2, 'First name must be greater than 2 characters')
    .max(50, 'First name must be at most 50 characters')
    .regex(/^[a-zA-Z\s]*$/, {
      message: "First Name must contain only letters and spaces"
    }),
  lastName: z.string(
    {
      required_error: "First name is required",
      invalid_type_error: "Last name must be a text value"
    }
  )
    .min(2, 'Last name must be greater than 2 characters')
    .max(50, 'Last name must be at most 50 characters')
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Last Name must contain only letters and spaces"
    }),
  mobile: z.string({
    invalid_type_error: "Phone number must be a text value"
  })
    .regex(/^\d+$/, 'Mobile number must contain only digits')
    .min(7, 'Mobile number must be at least 7 digits')
    .max(15, 'Mobile number must be at most 15 digits'),
  // .transform((val) => parseInt(val, 10)),
  countryCode: z.number()
  // .regex(/^\+\d{1,4}$/, 'Invalid country code format')
});

export const friendsWithAddedTag = friendSchema.extend({
  added: z.boolean().optional(),
  id: z.string()
})

export const emergencySchema = z.object({
  friends: z.array(friendSchema).max(2, "A maximum of two emergency contacts can be added.")
});


export const avatarSchema = z.object({
  avatar: z.string().url("Invalid URL for avatar"),
})

const coordinatesSchema = z.object({
  placeId: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
  name: z.string(),
  state: z.string(),
  town: z.string(),
  country: z.string()
})

export const tripInfoSchema = z.object({
  destination: coordinatesSchema,
  origin: coordinatesSchema,
  busStopName: z.string().optional(),
  riders: z.array(friendsWithAddedTag),
  luggage: z.string(),
  budget: z.number().min(300, "Budget must be greater than 300"),
  charter: z.boolean().optional(),
  when: z.union([
    z.string().refine(
      (val) => !isNaN(new Date(val).getTime()),
      { message: "Date must be a valid date" }
    ),
    z.literal('now')
  ])
})

export const packageInfoSchema = z.object({
  destination: coordinatesSchema,
  origin: coordinatesSchema,
  recipient: friendSchema,
  comments: z.string(),
  description: z.string(),
  express: z.boolean().optional(),
  when: z.union([
    z.string().refine(
      (val) => !isNaN(new Date(val).getTime()),
      { message: "Must be a valid date string" }
    ),
    z.literal('now')
  ]),
  budget: z.number().min(300, "Budget must be greater than 300"),

})

export const messageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty")
});

// export const riderSchema = friendSchema

const schemas = [personalInfoSchema, emergencySchema, avatarSchema]
export default schemas