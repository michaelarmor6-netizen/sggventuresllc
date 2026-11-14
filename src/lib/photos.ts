/**
 * Photographs supplied by the company. They are illustrative and must keep
 * the caption below wherever they appear: they do not show SGG Ventures
 * staff, clients, or premises. Replace them with screenshots of real work
 * when publishable material exists.
 */
export const PHOTO_NOTE =
  "Illustrative image. Not SGG Ventures staff, clients, or premises.";

export type Photo = { src: string; alt: string; width: number; height: number };

export const PHOTOS = {
  laptop: {
    src: "/images/photo-laptop.webp",
    alt: "Two colleagues reviewing work together on a laptop",
    width: 1280,
    height: 720,
  },
  meeting: {
    src: "/images/photo-meeting.webp",
    alt: "A small team discussing a project around a meeting table",
    width: 1280,
    height: 720,
  },
  workshop: {
    src: "/images/photo-workshop.webp",
    alt: "A colleague pointing at a laptop while others take notes",
    width: 820,
    height: 630,
  },
} satisfies Record<string, Photo>;

/** Service slug → photograph. A missing key renders no image. */
export const CATEGORY_PHOTO: Record<string, Photo> = {
  websites: PHOTOS.laptop,
  "business-applications": PHOTOS.meeting,
  automation: PHOTOS.workshop,
};
