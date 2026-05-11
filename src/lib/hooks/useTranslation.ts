'use client'

import { useMemo } from 'react'
import { useLocale } from '@/lib/i18n/LocaleContext'
import en from '@/language/en.json'
import vi from '@/language/vi.json'

// ── Types ──────────────────────────────────────────────────────────────────
type Messages = typeof en  // en is the source of truth for shape

// Dot-notation key helper (up to 3 levels deep)
type DotKeys<T, Prefix extends string = ''> = {
    [K in keyof T & string]: T[K] extends object
    ? DotKeys<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`
}[keyof T & string]

type TranslationKey = DotKeys<Messages>

// ── Loader ────────────────────────────────────────────────────────────────
const dictionaries: Record<string, Messages> = { en, vi }

// ── Hook ──────────────────────────────────────────────────────────────────
/**
 * useTranslation()
 *
 * Returns:
 *  - `t(key)`   — get a translated string by dot-notation key
 *  - `messages` — the full translation object for the current locale
 *  - `locale`   — current locale string ('en' | 'vi')
 *
 * @example
 * const { t, messages, locale } = useTranslation()
 *
 * t('ui.nav.about')           // "About" | "Giới thiệu"
 * messages.projects[0].subtitle
 */
export function useTranslation() {
    const { locale } = useLocale()

    const messages = useMemo<Messages>(
        () => dictionaries[locale] ?? en,
        [locale]
    )

    /**
     * t(key) — resolve a dot-notation key, e.g. 'ui.hero.cta'
     * Returns the string value, or the key itself as fallback.
     */
    const t = useMemo(() => {
        return (key: TranslationKey): string => {
            const parts = key.split('.')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let result: any = messages
            for (const part of parts) {
                result = result?.[part]
                if (result === undefined) return key
            }
            return typeof result === 'string' ? result : key
        }
    }, [messages])

    return { t, messages, locale }
}