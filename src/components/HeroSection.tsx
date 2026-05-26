'use client'
import { HERO_TAGS, MARQUEE_TAGS } from '@/lib/data'
import { useIsMobile, useTranslation } from '@/lib/hooks'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ViewWorkButton from './ViewWorkButton'
import ContactLink from './ContactLink'
import SkillTag from './SkillTag'

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }
const sans: React.CSSProperties = { fontFamily: 'var(--font-space-grotesk), sans-serif' }

export default function HeroSection() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    const { t } = useTranslation()
    const isMobile = useIsMobile('md')

    if (!mounted) return null

    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                minHeight: 'calc(100vh - 65px)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: isMobile ? '32px 24px 24px' : '48px 48px 32px',
            }}>

                {/* top meta */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: isMobile ? 32 : 48,
                        flexWrap: 'wrap',
                        gap: 8,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 24, height: 1, background: '#1400FF' }} />
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)' }}>
                            {t('ui.hero.greeting')}
                        </span>
                    </div>
                    {!isMobile && (
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.48)' }}>
                            {t('personal.location')} · 2026
                        </span>
                    )}
                </motion.div>

                {/* FULLSTACK */}
                <div style={{ overflow: 'visible' }}>
                    <motion.div
                        initial={{ y: '104%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 style={{
                            ...sans,
                            fontSize: isMobile ? 'clamp(2.6rem, 15vw, 4rem)' : 'clamp(3.2rem, 9vw, 9.5rem)',
                            fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em',
                            color: 'rgba(0,0,0,0.55)', margin: 0,
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
                            ...sans,
                            fontSize: isMobile ? 'clamp(2.6rem, 15vw, 4rem)' : 'clamp(3.2rem, 9vw, 9.5rem)',
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
                        margin: isMobile ? '20px 0' : '32px 0',
                        transformOrigin: 'left',
                    }}
                />

                {/* bottom row — stack vertically on mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.85 }}
                    style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: isMobile ? 'flex-start' : 'flex-end',
                        justifyContent: 'space-between',
                        gap: isMobile ? 24 : 40,
                    }}
                >
                    <div style={{ maxWidth: isMobile ? '100%' : 380, width: isMobile ? '100%' : undefined }}>
                        <p style={{
                            ...mono, fontSize: 12.5, lineHeight: 1.8,
                            color: 'rgba(0,0,0,0.48)', marginBottom: 24,
                        }}>
                            {t('ui.hero.bio')}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <ViewWorkButton />
                            <ContactLink />
                        </div>
                    </div>

                    {/* Tags — full width on mobile */}
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: 6,
                        maxWidth: isMobile ? '100%' : 400,
                        width: isMobile ? '100%' : undefined,
                        justifyContent: isMobile ? 'flex-start' : 'flex-end',
                    }}>
                        {HERO_TAGS.map((tag, i) => (
                            <SkillTag key={tag} tag={tag} delay={0.9 + i * 0.05} />
                        ))}
                    </div>
                </motion.div>

                {/* bottom meta */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isMobile ? 'space-between' : 'flex-start',
                        marginTop: isMobile ? 28 : 36,
                        gap: 12,
                    }}
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
                            {t('personal.available')}
                        </span>
                    </motion.div>

                    {isMobile && (
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)' }}>
                            {t('personal.location')}
                        </span>
                    )}
                </motion.div>
            </div>

            {/* marquee strip */}
            <div style={{ background: '#1400FF', overflow: 'hidden', height: 30, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'flex', gap: 36, whiteSpace: 'nowrap' }}
                >
                    {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((item, i) => (
                        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 36 }}>
                            <span style={{ ...mono, fontSize: 10, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>
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