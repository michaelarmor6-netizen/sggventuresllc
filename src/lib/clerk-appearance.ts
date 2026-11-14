/**
 * Clerk theme matched to the site's design system: one interactive colour,
 * Inter, hairline borders, no card shadow, pill primary button.
 */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#134a8e",
    colorForeground: "#1d1d1f",
    colorMutedForeground: "#424245",
    colorBackground: "#ffffff",
    colorInput: "#fafafc",
    colorBorder: "#e0e0e0",
    colorDanger: "#b91c1c",
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif",
    fontSize: "1rem",
    borderRadius: "0.625rem",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none border border-linehair rounded-[14px]",
    card: "shadow-none",
    headerTitle: "font-display text-[24px] font-bold tracking-[-0.015em] text-midnight",
    formButtonPrimary: "rounded-full text-[17px] font-normal normal-case shadow-none",
    footer: "bg-coolgray",
  },
};
