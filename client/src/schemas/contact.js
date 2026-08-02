import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "Name is required").max(50, "Name is too long"),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message is required")
    .max(2000, "Message is too long"),
});
