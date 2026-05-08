'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TAGS } from '@/lib/data'

const MARQUEE = TAGS
const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }
const sans: React.CSSProperties = { fontFamily: 'var(--font-space-grotesk), sans-serif' }

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function ViewWorkButton() {
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
            <span style={{ position: 'relative', zIndex: 1 }}>View Work</span>
        </button>
    )
}

function ContactLink() {
    const [hovered, setHovered] = useState(false)
    return (
        <button
            onClick={() => scrollTo('contact')}
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
            Contact
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

function SkillTag({ tag, delay = 0 }: { tag: string; delay?: number }) {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...mono, fontSize: 9, letterSpacing: '0.28em',
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

export default function HeroSection() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    if (!mounted) return null

    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                minHeight: 'calc(100vh - 65px)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
        >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 48px 32px' }}>

                {/* top meta */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 24, height: 1, background: '#1400FF' }} />
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)' }}>
                            Full-Stack Developer — FE Focused
                        </span>
                    </div>
                    <span style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>
                        Ho Chi Minh City, VN · 2026
                    </span>
                </motion.div>

                {/* FULLSTACK */}
                <div style={{ overflow: 'visible' }}>
                    <motion.div
                        initial={{ y: '104%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 style={{
                            ...sans, fontSize: 'clamp(3.2rem, 9vw, 9.5rem)',
                            fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em',
                            color: 'rgba(0,0,0,0.18)', margin: 0,
                        }}>
                            FULLSTACK
                        </h1>
                    </motion.div>
                </div>

                {/* DEVELOPER. */}
                <div style={{ overflow: 'visible' }}>
                    <motion.div
                        initial={{ y: '104%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 style={{
                            ...sans, fontSize: 'clamp(3.2rem, 9vw, 9.5rem)',
                            fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em',
                            color: '#111', margin: 0,
                        }}>
                            DEVELOPER<span style={{ color: '#1400FF' }}>.</span>
                        </h1>
                    </motion.div>
                </div>

                {/* divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        height: 1,
                        background: 'linear-gradient(90deg, #1400FF 0%, rgba(20,0,255,0.15) 60%, transparent 100%)',
                        margin: '32px 0',
                        transformOrigin: 'left',
                    }}
                />

                {/* bottom row */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.85 }}
                    style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 }}
                >
                    <div style={{ maxWidth: 380 }}>
                        <p style={{ ...mono, fontSize: 12.5, lineHeight: 1.8, color: 'rgba(0,0,0,0.48)', marginBottom: 24 }}>
                            Fullstack developer. React / React Native / Next.js / .NET / Node.js.<br />
                            Building fast, scalable web applications.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <ViewWorkButton />
                            <ContactLink />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 400, justifyContent: 'flex-end' }}>
                        {TAGS.map((tag, i) => (
                            <SkillTag key={tag} tag={tag} delay={0.9 + i * 0.05} />
                        ))}
                    </div>
                </motion.div>

                {/* bottom meta */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    style={{ display: 'flex', alignItems: 'center', marginTop: 36 }}
                >
                    <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 7,
                            border: '1px solid #1400FF', padding: '5px 12px',
                            background: 'rgba(20,0,255,0.04)',
                        }}
                    >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1400FF', display: 'block' }} />
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#1400FF' }}>
                            Open to Work
                        </span>
                    </motion.div>
                </motion.div>
            </div>

            {/* marquee strip */}
            <div style={{ background: '#1400FF', overflow: 'hidden', height: 30, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'flex', gap: 36, whiteSpace: 'nowrap' }}
                >
                    {[...MARQUEE, ...MARQUEE].map((item, i) => (
                        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 36 }}>
                            <span style={{ ...mono, fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>
                                {item}
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.3)' }}>✦</span>
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}