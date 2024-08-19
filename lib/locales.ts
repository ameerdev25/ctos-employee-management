export const locales = ["en", "ms"] as const
export type Locale = (typeof locales)[number]