'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { personal } from '@/lib/data'
import { useIsMobile, useTranslation } from '@/lib/hooks'

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }
const sans: React.CSSProperties = { fontFamily: 'var(--font-space-grotesk), sans-serif' }

function SocialLink({ label, href }: { label: string; href: string }) {
    const [hovered, setHovered] = useState(false)
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...mono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase',
                textDecoration: 'none',
                color: hovered ? '#1400FF' : 'rgba(0,0,0,0.38)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'color 0.2s',
                position: 'relative',
            }}
        >
            <motion.span
                animate={{ x: hovered ? 3 : 0 }}
                transition={{ duration: 0.18 }}
                style={{ color: '#1400FF' }}
            >
                ↗
            </motion.span>
            {label}
        </a>
    )
}

export default function ContactSection() {
    const { t } = useTranslation()
    const [copied, setCopied] = useState(false)
    const [copiedPhone, setCopiedPhone] = useState(false)
    const isMobile = useIsMobile('md')
    const handleCopy = () => {
        navigator.clipboard.writeText(personal.links.email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }


    const handleCopyPhone = () => {
        navigator.clipboard.writeText(personal.phone)
        setCopiedPhone(true)
        setTimeout(() => setCopiedPhone(false), 2000)
    }

    return (
        <section
            id="contact"
            style={{
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 48px 120px 48px',
                maxWidth: 1100,
                margin: '0 auto',
                position: 'relative',
            }}
        >
            <div style={{ width: '100%' }}>
                {/* section label */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}
                >
                    <span style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', color: '#1400FF' }}>04</span>
                    <div style={{ width: 24, height: 1, background: '#1400FF' }} />
                    <span style={{ ...mono, fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)' }}>
                        {t('ui.nav.contact')}
                    </span>
                </motion.div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
                        gap: isMobile ? 32 : 64,
                        alignItems: isMobile ? 'flex-start' : 'flex-end',
                    }}
                >
                    {/* left */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 style={{
                            ...sans,
                            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                            fontWeight: 900, letterSpacing: '-0.04em',
                            lineHeight: 0.95, color: '#111', margin: '0 0 32px',
                        }}>
                            LET'S<br />
                            <span style={{ color: '#1400FF' }}>WORK</span><br />
                            TOGETHER<span style={{ color: '#1400FF' }}>.</span>
                        </h2>

                        {/* email row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <a
                                href={`mailto:${personal.links.email}`}
                                style={{
                                    ...mono, fontSize: 13, letterSpacing: '0.05em',
                                    color: '#111', textDecoration: 'none',
                                }}
                            >
                                {personal.links.email}
                            </a>

                            {/* copy button */}
                            <motion.button
                                onClick={handleCopy}
                                whileTap={{ scale: 0.94 }}
                                style={{
                                    all: 'unset',
                                    cursor: 'pointer',
                                    ...mono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase',
                                    color: copied ? '#1400FF' : 'rgba(0,0,0,0.35)',
                                    border: `1px solid ${copied ? '#1400FF' : 'rgba(0,0,0,0.15)'}`,
                                    padding: '5px 12px',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {copied ? t('ui.contact.copied') : t('ui.contact.copy')}
                            </motion.button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10 }}>
                            <a
                                href={`tel:${personal.phone}`}
                                style={{ ...mono, fontSize: 13, letterSpacing: '0.05em', color: '#111', textDecoration: 'none' }}
                            >
                                {t('personal.phoneLabel')}: {personal.phone}
                            </a>

                            <motion.button
                                onClick={handleCopyPhone}
                                whileTap={{ scale: 0.94 }}
                                style={{
                                    all: 'unset',
                                    cursor: 'pointer',
                                    ...mono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase',
                                    color: copiedPhone ? '#1400FF' : 'rgba(0,0,0,0.35)',
                                    border: `1px solid ${copiedPhone ? '#1400FF' : 'rgba(0,0,0,0.15)'}`,
                                    padding: '5px 12px',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {copiedPhone ? t('ui.contact.copied') : t('ui.contact.copy')}
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* right — socials */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 4 }}
                    >
                        {Object.entries(personal.links).filter(([key]) => key !== 'email' && key !== 'portfolio').map(([key, href]) => (
                            <SocialLink key={key} label={key} href={href} />
                        ))}
                    </motion.div>
                </div>

                {/* footer line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    style={{
                        marginTop: 80,
                        height: 1,
                        background: 'rgba(0,0,0,0.1)',
                        transformOrigin: 'left',
                    }}
                />
                <div style={{
                    marginTop: 20,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <span style={{ ...mono, fontSize: 10, letterSpacing: '0.35em', color: 'rgba(0,0,0,0.48)', textTransform: 'uppercase' }}>
                        {t('ui.footer.portfolio')}
                    </span>
                    <span style={{ ...mono, fontSize: 12, letterSpacing: '0.25em', color: '#1400FF' }}>
                        {t('ui.footer.name')}
                    </span>
                </div>
            </div >
        </section >
    )
}