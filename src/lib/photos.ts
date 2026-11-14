/**
 * Photographs are illustrative: they do not show SGG Ventures staff, clients,
 * or premises. Company-supplied images (photo-*.webp) plus free Unsplash
 * photographs (https://unsplash.com/license).
 */
export const PHOTO_NOTE =
  "Illustrative image. Not SGG Ventures staff, clients, or premises.";

export const PHOTOS = {
  consulting: {
    src: "/images/photo-meeting.webp",
    alt: "A small team discussing a project around a meeting table",
  },
  finance: {
    src: "/images/finance.jpg",
    alt: "Glass office towers seen from street level",
  },
  businessConsulting: {
    src: "/images/photo-workshop.webp",
    alt: "A colleague pointing at a laptop while others take notes",
  },
  managementConsulting: {
    src: "/images/management-consulting.jpg",
    alt: "Executives in discussion around a conference table",
  },
  itConsulting: {
    src: "/images/it-consulting.jpg",
    alt: "Rows of network servers in a data centre",
  },
  digitalTransformation: {
    src: "/images/digital-transformation.jpg",
    alt: "Business analytics dashboard on a laptop screen",
  },
  businessApplications: {
    src: "/images/business-applications.jpg",
    alt: "Colleagues working together on laptops in an office",
  },
  websites: {
    src: "/images/photo-laptop.webp",
    alt: "Two colleagues reviewing work together on a laptop",
  },
  softwareDevelopment: {
    src: "/images/software-development.jpg",
    alt: "Source code displayed on a computer screen",
  },
  aiAutomation: {
    src: "/images/ai-automation.jpg",
    alt: "Abstract artificial intelligence visualisation",
  },
} as const;

/** Category slug → hero photograph. Keys mirror SERVICE_CATEGORIES. */
export const CATEGORY_PHOTO: Record<string, { src: string; alt: string }> = {
  "business-consulting": PHOTOS.businessConsulting,
  "management-consulting": PHOTOS.managementConsulting,
  "it-consulting": PHOTOS.itConsulting,
  "digital-transformation": PHOTOS.digitalTransformation,
  "business-applications": PHOTOS.businessApplications,
  "software-development": PHOTOS.softwareDevelopment,
  websites: PHOTOS.websites,
  "ai-automation": PHOTOS.aiAutomation,
};
