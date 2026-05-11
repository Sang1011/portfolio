'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks/useBreakpoint'
import { useTranslation } from '@/lib/hooks'

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }

export interface TrackerSection {
    id: string
    labelKey: 'home' | 'about' | 'experience' | 'education' | 'projects' | 'contact' | 'intro' | 'skills'
    href?: string
}

interface SectionTrackerProps {
    sections: TrackerSection[]
}

export default function SectionTracker({ sections }: SectionTrackerProps) {
    const router = useRouter()
    const isMobile = useIsMobile()
    const { t } = useTranslation()
    const [active, setActive] = useState(sections[0]?.id ?? '')
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    useEffect(() => {
        const observers: IntersectionObserver[] = []

        sections.forEach(({ id, href }) => {
            if (href) return
            const el = document.getElementById(id)
            if (!el) return

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActive(id)
                },
                { threshold: 0.35 }
            )
            observer.observe(el)
            observers.push(observer)
        })

        return () => observers.forEach(o => o.disconnect())
    }, [sections])

    if (isMobile) return null

    const handleClick = (section: TrackerSection) => {
        if (section.href) {
            router.push(section.href)
        } else {
            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div style={{
            position: 'fixed',
            right: 28,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
        }}>
            {sections.map((section) => {
                const { id, labelKey } = section
                const isActive = active === id
                const isHovered = hoveredId === id

                return (
                    <div
                        key={id}
                        style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                        onMouseEnter={() => setHoveredId(id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <AnimatePresence>
                            {isHovered && (
                                <motion.span
                                    key="label"
                                    initial={{ opacity: 0, x: 8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 8 }}
                                    transition={{ duration: 0.18 }}
                                    style={{
                                        ...mono,
                                        fontSize: 10,
                                        letterSpacing: '0.35em',
                                        textTransform: 'uppercase',
                                        color: isActive ? '#1400FF' : 'rgba(0,0,0,0.45)',
                                        marginRight: 10,
                                        whiteSpace: 'nowrap',
                                        userSelect: 'none',
                                    }}
                                >
                                    {t(`ui.section.${labelKey}`)}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => handleClick(section)}
                            aria-label={t(`ui.section.${labelKey}`)}
                            style={{
                                all: 'unset',
                                cursor: 'pointer',
                                width: 20,
                                height: 20,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <motion.span
                                animate={{
                                    width: isActive ? 6 : isHovered ? 5 : 4,
                                    height: isActive ? 6 : isHovered ? 5 : 4,
                                    backgroundColor: isActive
                                        ? '#1400FF'
                                        : isHovered
                                            ? '#111'
                                            : 'rgba(0,0,0,0.45)',
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                                style={{ display: 'block', borderRadius: '50%' }}
                            />
                        </button>
                    </div>
                )
            })}

            <div style={{
                position: 'absolute',
                top: 10,
                bottom: 10,
                right: 19,
                width: 1,
                background: 'rgba(0,0,0,0.1)',
                zIndex: -1,
            }} />
        </div>
    )
}