export const locales = ["en", "my"] as const;
export type Locale = (typeof locales)[number];
