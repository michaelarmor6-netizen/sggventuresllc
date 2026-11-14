/**
 * Clerk is enabled only when its keys are present. Without them the public
 * site keeps working, sign-in shows a "being set up" notice, and private
 * routes redirect to /login. This prevents a deploy without keys from taking
 * the whole site down.
 *
 * NEXT_PUBLIC_ values are inlined at build time, so this also works in
 * client components.
 */
export const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
