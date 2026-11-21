import { z } from "zod";

// Phone Regex supporting US / International numbers (+1 and standard 10-digit formats)
const phoneRegex = /^(\+?[1-9]\d{0,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d]{3}[-.\s]?[\d]{4}$/;

export const BookingRequestSchema = z.object({
  clientName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/, "Name contains invalid characters"),
  
  clientEmail: z
    .string()
    .email("Please provide a valid email address")
    .max(120, "Email cannot exceed 120 characters"),
  
  clientPhone: z
    .string()
    .regex(phoneRegex, "Please provide a valid phone number (e.g., +1 929-625-7273)"),
  
  instagramHandle: z
    .string()
    .max(50)
    .optional()
    .transform((val) => (val ? (val.startsWith("@") ? val : `@${val}`) : undefined)),

  serviceId: z.enum(["russian-mani", "builder-gel-biab", "gel-x-extensions"], {
    message: "Please select a valid foundational service",
  }),

  addons: z
    .array(z.enum(["art-tier-1", "art-tier-2", "art-tier-3", "safe-removal"]))
    .optional()
    .default([]),

  appointmentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must follow YYYY-MM-DD format"),

  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must follow HH:MM format (24-hour)"),

  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
});

export type BookingRequestInput = z.infer<typeof BookingRequestSchema>;
