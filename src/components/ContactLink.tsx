import { useTranslation } from "@/lib/hooks"
import { useState } from "react"
import { motion } from 'framer-motion'
const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }

export default function ContactLink() {
    const { t } = useTranslation()
    const [hovered, setHovered] = useState(false)

    const handleClick = () => {
        const element = document.getElementById('contact')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
        }
        window.location.href = '/#contact'
    }

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                all: 'unset',
                ...mono, fontSize: 10, letterSpacing: '0.35em',
                textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: 5,
                color: hovered ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.38)',
                transition: 'color 0.2s', cursor: 'pointer',
            }}
        >
            {t('ui.hero.contact')}
            <motion.span
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{ color: '#1400FF' }}
            >
                →
            </motion.span>
        </button>
    )
}