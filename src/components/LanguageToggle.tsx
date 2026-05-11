'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from '@/lib/i18n/LocaleContext'

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }

export default function LanguageToggle() {
    const { locale, toggleLocale } = useLocale()

    return (
        <motion.button
            onClick={toggleLocale}
            whileTap={{ scale: 0.92 }}
            style={{
                all: 'unset',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                border: '1px solid rgba(0,0,0,0.12)',
                background: 'rgba(0,0,0,0.03)',
                transition: 'border-color 0.2s, background 0.2s',
            }}
            whileHover={{
                borderColor: 'rgba(20,0,255,0.3)',
                background: 'rgba(20,0,255,0.04)',
            }}
            aria-label={`Switch to ${locale === 'en' ? 'Tiếng Việt' : 'English'}`}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={locale}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    style={{
                        ...mono,
                        fontSize: 10,
                        letterSpacing: '0.35em',
                        textTransform: 'uppercase',
                        color: '#1400FF',
                    }}
                >
                    {locale === 'en' ? 'EN' : 'VI'}
                </motion.span>
            </AnimatePresence>
        </motion.button>
    )
}