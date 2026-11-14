import { z } from "zod";

/** Project types selectable in the enquiry form. Values match service slugs. */
export const PROJECT_TYPES = [
  { value: "websites", label: "Business website" },
  { value: "business-applications", label: "Custom business application" },
  { value: "automation", label: "AI or workflow automation" },
  { value: "support", label: "Maintenance and support" },
  { value: "not-sure", label: "Not sure yet" },
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
    message: "Choose a project type.",
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

/** Minimum seconds a genuine fill takes. */
export const FORM_MIN_FILL_SECONDS = 3;
