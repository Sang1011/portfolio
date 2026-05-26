import { scrollTo } from "@/lib"
import { useTranslation } from "@/lib/hooks"
import { useState } from "react"
import { motion } from 'framer-motion'
const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }

export default function ViewWorkButton() {
    const { t } = useTranslation()
    const [hovered, setHovered] = useState(false)
    return (
        <button
            onClick={() => scrollTo('projects-preview')}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                all: 'unset',
                ...mono, fontSize: 10, letterSpacing: '0.35em',
                textTransform: 'uppercase', color: '#fff',
                background: '#111', padding: '12px 26px',
                position: 'relative', overflow: 'hidden',
                display: 'inline-block', cursor: 'pointer',
            }}
        >
            <motion.span
                animate={{ y: hovered ? '0%' : '101%' }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, background: '#1400FF', display: 'block' }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>{t('ui.hero.cta')}</span>
        </button>
    )
}
