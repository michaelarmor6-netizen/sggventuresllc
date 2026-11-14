import { z } from "zod";

/** Service areas selectable in the enquiry form. Values match service slugs. */
export const PROJECT_TYPES = [
  { value: "business-consulting", label: "Business Consulting" },
  { value: "management-consulting", label: "Management Consulting" },
  { value: "it-consulting", label: "IT Consulting" },
  { value: "digital-transformation", label: "Digital Transformation" },
  { value: "business-applications", label: "Business Applications" },
  { value: "software-development", label: "Custom Software Development" },
  { value: "ai-automation", label: "AI & Automation" },
  { value: "not-sure", label: "General / Not yet sure" },
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number]["value"];

const PROJECT_TYPE_VALUES = PROJECT_TYPES.map((type) => type.value) as [
  ProjectType,
  ...ProjectType[],
];

export function isProjectType(value: unknown): value is ProjectType {
  return PROJECT_TYPE_VALUES.includes(value as ProjectType);
}

export function projectTypeLabel(value: string): string {
  return PROJECT_TYPES.find((type) => type.value === value)?.label ?? value;
}

/**
 * Project enquiry. Only the information needed to assess and answer an
 * enquiry is collected: no phone number, address, or country.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(120, "Name is too long (120 characters maximum)."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address, like name@example.com.")
    .max(200, "Email is too long (200 characters maximum)."),
  businessName: z
    .string()
    .trim()
    .min(2, "Enter your business name.")
    .max(160, "Business name is too long (160 characters maximum)."),
  projectType: z.enum(PROJECT_TYPE_VALUES, {
    message: "Please select a service area.",
  }),
  description: z
    .string()
    .trim()
    .min(20, "Describe the project in at least 20 characters.")
    .max(3000, "Description is too long (3,000 characters maximum)."),
  budget: z
    .string()
    .trim()
    .max(80, "Budget is too long (80 characters maximum).")
    .optional()
    .or(z.literal("")),
  timeline: z
    .string()
    .trim()
    .max(80, "Timeline is too long (80 characters maximum).")
    .optional()
    .or(z.literal("")),
  consent: z.boolean().refine((value) => value === true, {
    message: "Confirm that you have read the Privacy Policy.",
  }),
  // Abuse protection: a hidden field people never see, and the time the
  // form was opened.
  websiteUrl: z.string().max(200).optional().or(z.literal("")),
  formStartedAt: z.number().int().nonnegative(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const PARTNER_TYPES = [
  { value: "technology", label: "Technology & Software Partner" },
  { value: "implementation", label: "Implementation & Delivery Partner" },
  { value: "professional-advisory", label: "Professional & Advisory Firm" },
  { value: "managed-services", label: "Managed Services Provider" },
  { value: "institutional", label: "Institutional Relationship" },
] as const;

export const partnershipSchema = z.object({
  organization: z
    .string()
    .trim()
    .min(2, "Please enter your organization's name.")
    .max(160, "Organization name is too long."),
  contactName: z
    .string()
    .trim()
    .min(2, "Please enter a contact name.")
    .max(120, "Contact name is too long."),
  email: z
    .string()
    .trim()
    .min(3, "Please enter a business email address.")
    .email("Please enter a valid email address.")
    .max(200, "Email is too long."),
  phone: z
    .string()
    .trim()
    .max(32, "Phone number is too long.")
    .regex(/^[+\d()][\d\s()+\-.]{4,31}$/, "Please enter a valid telephone number.")
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .trim()
    .min(2, "Please enter your country.")
    .max(80, "Country name is too long."),
  website: z
    .string()
    .trim()
    .url("Please enter a valid URL, including https://")
    .max(200)
    .optional()
    .or(z.literal("")),
  partnerType: z.enum(
    PARTNER_TYPES.map((t) => t.value) as [string, ...string[]],
    { message: "Please select a partnership category." },
  ),
  capabilities: z
    .string()
    .trim()
    .min(30, "Please describe capabilities in at least 30 characters.")
    .max(3000, "Description is too long (max 3000 characters)."),
  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: "You must accept the Privacy Policy to submit.",
    }),
  websiteUrl: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
  formStartedAt: z.number().int().nonnegative(),
});

export type PartnershipInput = z.infer<typeof partnershipSchema>;

/** Minimum seconds a genuine fill takes. */
export const FORM_MIN_FILL_SECONDS = 3;
