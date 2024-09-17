
import { z } from "zod"
import { addMonths, isAfter, parse, isValid } from 'date-fns';


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

// Create an image schema that validates the file's size and type
// export const imageSchema = z
//   .instanceof(File, { message: 'A file must be uploaded' }) // Ensure the value is a File instance
//   .refine((file) => {
//     return file.size <= MAX_FILE_SIZE;
//   }, {
//     message: `Image size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
//   })
//   .refine((file) => {
//     return file.type.startsWith('image/');
//   }, {
//     message: 'File must be an image',
//   });;

export const createImageSchema = (maxSize: number) => {
  return z.custom((file) => {
    if (!file) return false;

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (!allowedMimeTypes.includes(file.type)) {
      console.log("Two")
      return false; // Invalid file type
    }

    if (file.fileSize > maxSizeInBytes) {
      console.log("One")
      return false; // File is too large
    }

    return true;
  }, {
    message: `File must be less than ${maxSize} MB `,
  })
}

export const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  return age;
};

// Zod schema for date validation including age check
export const ageSchema = z
  .string()
  .refine((val) => {
    // Regex for DD/MM/YYYY format
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    return dateRegex.test(val);
  }, { message: "Invalid date. Please use DD/MM/YYYY format." })
  .refine((val) => {
    // Validate if the date exists correctly (DD/MM/YYYY)
    const [day, month, year] = val.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    // Ensure month and day match the original string
    return date && date.getMonth() + 1 === month && date.getDate() === day;
  }, { message: "Invalid date." })
  .refine((val) => {
    // Check if the age is at least 18 years old
    const [day, month, year] = val.split('/').map(Number);
    const age = calculateAge(`${year}-${month}-${day}`);

    return age >= 18;
  }, { message: "You must be at least 18 years old." });


// Zod schema for date validation
export const dateSchema = z
  .string()
  .refine((val) => {
    // Regex for DD/MM/YYYY format
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    return dateRegex.test(val);
  }, { message: "Invalid date. Please use DD/MM/YYYY format." })
  .refine((val) => {
    // Validate if the date exists correctly (DD/MM/YYYY)
    const [day, month, year] = val.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    // Ensure month and day match the original string
    return date && date.getMonth() + 1 === month && date.getDate() === day;
  }, { message: "Invalid date." })



export const createDatePairValidationSchema = (dateFieldPairs) => z
  .object(dateFieldPairs.reduce((acc, { issue, expiry }) => {
    acc[issue] = dateSchema;
    acc[expiry] = dateSchema;
    return acc;
  }, {} as Record<string, z.ZodTypeAny>))
  .refine((data) => {
    for (const { issue, expiry } of dateFieldPairs) {
      const issueDateStr = data[issue];
      const expiryDateStr = data[expiry];

      if (!issueDateStr || !expiryDateStr) {
        continue; // Skip this pair, but continue checking others
      }

      const issueDate = parse(issueDateStr, 'dd/MM/yyyy', new Date());
      const expiryDate = parse(expiryDateStr, 'dd/MM/yyyy', new Date());

      if (!isValid(issueDate) || !isValid(expiryDate)) {
        return false;
      }

      const issuePlusThreeMonths = addMonths(issueDate, 3);

      if (!isAfter(expiryDate, issuePlusThreeMonths)) {
        return false;
      }
    }
    return true;
  }, {
    message: 'Expiry date must be at least 3 months after the issue date',
    path: dateFieldPairs.flatMap(({ expiry }) => [expiry]),
  });

export const serviceCountrySchema = z.object({
  country: z.object({
    name: z.string({ message: "Country is required" }),
    _id: z.string({ message: "Country is required" }),
  }),
  state: z.object({
    name: z.string({ message: "State is required" }),
    _id: z.string({ message: "State is required" }),
  }),
  service_type: z.enum(["ride_only", "ride_dispatch", "haulage", "dispatch"], {
    required_error: "Service type is required", invalid_type_error: "Service type must be a valid ride type info",
  })
})

export const personalInfoSchema = z.object({
  firstName: z.string({ message: "First Name is required" }).min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  gender: z.enum(['Male', 'Female', 'Other']), // Using enum for better type safety
  birthDate: ageSchema,
  street: z.string().min(2, "Street is required"),
  address: z.string().min(2, "Address is required"),
  apartment: z.string().min(1, "Apartment number is required"),
})

export const vehicleSchema = z.object({
  vehicle_name: z.string(),
  vehicle_model: z.string(),
  vehicle_year: z.string(),
  vehicle_license: z.string(),
  vehicle_seats: z.number(),
  vehicle_type: z.enum(["Bike", "Car", "Bus", "Van", "Truck"]),
  vehicle_exterior_color: z.string(),
  vehicle_interior_color: z.string(),
  vehicle_exterior_front: z.string(),
  vehicle_exterior_back: z.string(),
  vehicle_exterior_left: z.string(),
  vehicle_exterior_right: z.string(),
  vehicle_interior_front: z.string(),
  vehicle_interior_back: z.string(),
});

const insuranceSchema = z.object({
  insurance_provider: z.string(),
  insurance_id: z.string(),
  insurance_issue_date: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid issue date format",
  }),
  insurance_expiry_date: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid expiry date format",
  }),
}).refine((data) => {
  const issueDate = new Date(data.insurance_issue_date);
  const expiryDate = new Date(data.insurance_expiry_date);
  return issueDate < expiryDate;
}, {
  message: "Insurance expiry date must be later than the issue date",
  path: ["insurance_expiry_date"], // this indicates where the error applies
});

const inspectionSchema = z.object({
  inspection_provider: z.string(),
  inspection_issue_date: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid issue date format",
  }),
  inspection_expiry_date: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid expiry date format",
  }),
  inspection_image: z.string(), // Assuming this is a URL or base64 string for the image
}).refine((data) => {
  const issueDate = new Date(data.inspection_issue_date);
  const expiryDate = new Date(data.inspection_expiry_date);
  return issueDate < expiryDate;
}, {
  message: "Inspection expiry date must be later than the issue date",
  path: ["inspection_expiry_date"],
});

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

export const coordinatesSchema = z.object({
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


export const scheduleFiltersSchema = z.object({
  distance: z.number(),
  type: z.string(),
  destinationName: z.string(),
  destinationBodyWithName: coordinatesSchema,
  seats: z.number().min(0, "Seats must be greater than 1"),
  charter: z.boolean(),
  lastStop: z.string()
})

const strippedInsuranceSchema = insuranceSchema._def.schema;
const strippedInspectionSchema = insuranceSchema._def.schema;
// Accessing the underlying ZodObject

// export const riderSchema = friendSchema
export const riderVerificationSchema = personalInfoSchema.merge(emergencySchema).merge(avatarSchema)



// Combine the driver schema (extending the rider schema)
export const driverVerificationSchema = riderVerificationSchema.merge(
  strippedInsuranceSchema).merge(
    strippedInspectionSchema).merge(
      vehicleSchema)


const schemas = [personalInfoSchema, emergencySchema, avatarSchema]
export default schemas