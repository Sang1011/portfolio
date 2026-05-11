import type { Locale } from '@/lib/data/index'

export const LOCALES = ['en', 'vi'] as const
export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_STORAGE_KEY = 'nhts-portfolio-locale'