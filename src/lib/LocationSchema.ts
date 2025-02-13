import z from 'zod';

export const LocationSchema = z.object({
  addressLine1: z.string().min(10, "Address line1 must be at least 10 characters long"),
  addressLine2: z.string().min(10, "Address line2 must be at least 10 characters long"),
  zipCode: z.string().length(6, "Zip code must be 6 characters long"),
  city: z.string().min(5, "City must be at least 5 characters long"),
  state: z.string().min(5, "State must be at least 5 characters long"),
  contactNumber: z.string().length(10, "Contact number must be 10 characters long"),
  contactName: z.string().min(3, "Contact name must be at least 3 characters long"),
})