'use client'

import { personal, TAGS } from '@/lib/data'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslation } from '@/lib/hooks'

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }
const sans: React.CSSProperties = { fontFamily: 'var(--font-space-grotesk), sans-serif' }

export default function AboutPreviewSection() {
    const { t, messages } = useTranslation()

    return (
        <section
            id="about-preview"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                padding: '120px 48px',
                maxWidth: 1100,
                margin: '0 auto',
            }}
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 96,
                alignItems: 'center',
                width: '100%',
            }}>
                {/* LEFT — avatar */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7 }}
                    style={{ position: 'relative' }}
                >
                    {[
                        { top: -8, left: -8, borderTop: '1.5px solid #1400FF', borderLeft: '1.5px solid #1400FF' },
                        { top: -8, right: -8, borderTop: '1.5px solid #1400FF', borderRight: '1.5px solid #1400FF' },
                        { bottom: -8, left: -8, borderBottom: '1.5px solid #1400FF', borderLeft: '1.5px solid #1400FF' },
                        { bottom: -8, right: -8, borderBottom: '1.5px solid #1400FF', borderRight: '1.5px solid #1400FF' },
                    ].map((s, i) => (
                        <div key={i} style={{ position: 'absolute', width: 16, height: 16, ...s }} />
                    ))}
                    <img
                        src="/avatar.jpg"
                        alt={personal.name}
                        style={{
                            width: '100%',
                            aspectRatio: '4/5',
                            objectFit: 'cover',
                            objectPosition: 'top',
                            display: 'block',
                        }}
                    />
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        background: '#1400FF', padding: '10px 16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                        <span style={{ ...sans, fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                            {personal.name}
                        </span>
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                            .DEV
                        </span>
                    </div>
                </motion.div>

                {/* RIGHT — text */}
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', color: '#1400FF' }}>02</span>
                        <div style={{ width: 24, height: 1, background: '#1400FF' }} />
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)' }}>
                            {t('ui.about.sectionLabel')}
                        </span>
                    </div>

                    <h2 style={{
                        ...sans,
                        fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.05,
                        color: '#111',
                        margin: '0 0 24px',
                    }}>
                        {t('personal.title')}<br />
                    </h2>

                    {messages.personal.bioArray.map((text: string) => (
                        <p
                            key={text}
                            style={{
                                ...mono,
                                fontSize: 12.5,
                                lineHeight: 1.85,
                                color: 'rgba(0,0,0,0.5)',
                                marginBottom: 12,
                            }}
                        >
                            {text}
                        </p>
                    ))}

                    {/* quick stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid rgba(0,0,0,0.1)', marginBottom: 32 }}>
                        {messages.personal.stats.map(({ label, value }: { label: string; value: string }) => (
                            <div key={label} style={{
                                padding: '14px 18px',
                                borderBottom: '1px solid rgba(0,0,0,0.08)',
                                borderRight: '1px solid rgba(0,0,0,0.08)',
                            }}>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.52)', marginBottom: 5 }}>
                                    {label}
                                </div>
                                <div style={{ ...mono, fontSize: 11, color: '#111' }}>{value}</div>
                            </div>
                        ))}
                        <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
                            <div style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.52)', marginBottom: 5 }}>
                                {t('personal.genderLabel')}
                            </div>
                            <div style={{ ...mono, fontSize: 11, color: '#111' }}>{messages.personal.gender}</div>
                        </div>
                        <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
                            <div style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.52)', marginBottom: 5 }}>
                                {t('personal.dobLabel')}
                            </div>
                            <div style={{ ...mono, fontSize: 11, color: '#111' }}>{messages.personal.dateOfBirth}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 40 }}>
                        {TAGS.map(s => (
                            <span key={s} style={{
                                ...mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                                padding: '5px 11px',
                                border: '1px solid rgba(0,0,0,0.13)',
                                color: 'rgba(0,0,0,0.6)',
                            }}>
                                {s}
                            </span>
                        ))}
                    </div>

                    <Link href="/about" style={{ textDecoration: 'none' }}>
                        <motion.div
                            whileHover={{ x: 4 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            style={{
                                ...mono, fontSize: 10, letterSpacing: '0.35em',
                                textTransform: 'uppercase', color: '#1400FF',
                                display: 'inline-flex', alignItems: 'center', gap: 10,
                            }}
                        >
                            <span>{t('ui.about.fullProfile')}</span>
                            <span style={{ fontSize: 14 }}>→</span>
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}