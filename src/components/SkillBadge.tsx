import { useHover } from "@/lib/hooks/useHover";
import { motion } from "framer-motion";

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }
export default function SkillBadge({ skill, delay }: { skill: string; delay: number }) {
    const [ref, hovered] = useHover<HTMLDivElement>()
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            style={{
                ...mono,
                fontSize: 11,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                padding: '6px 10px',
                border: `1px solid ${hovered ? 'rgba(20,0,255,0.4)' : 'rgba(0,0,0,0.12)'}`,
                color: hovered ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.5)',
                background: hovered ? 'rgba(20,0,255,0.04)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'default',
                transition: 'border-color 0.2s, color 0.2s, background 0.2s',
            }}
        >
            <motion.span
                animate={{ scale: hovered ? 1.8 : 1, rotate: hovered ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ width: 4, height: 4, background: '#1400FF', flexShrink: 0, display: 'block' }}
            />
            {skill}
        </motion.div>
    )
}