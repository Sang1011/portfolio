import { useState } from "react";
import { motion } from 'framer-motion'

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }

export default function SkillTag({ tag, delay = 0 }: { tag: string; delay?: number }) {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...mono, fontSize: 10, letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: hovered ? '#fff' : 'rgba(0,0,0,0.38)',
                border: `1px solid ${hovered ? '#1400FF' : 'rgba(0,0,0,0.15)'}`,
                background: hovered ? '#1400FF' : 'transparent',
                padding: '5px 10px', cursor: 'default',
                transition: 'color 0.18s, background 0.18s, border-color 0.18s',
                display: 'inline-block',
            }}
        >
            {tag}
        </motion.span>
    )
}