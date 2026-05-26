'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTracker, { TrackerSection } from '@/components/SectionTracker'
import { useIsMobile, useTranslation } from '@/lib/hooks'
import { personal } from '@/lib/data'

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }
const sans: React.CSSProperties = { fontFamily: 'var(--font-space-grotesk), sans-serif' }

const CERTS: { name: string; issuer: string; year: string }[] = []

function SectionLabel({ index, label }: { index: string; label: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
            <span style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', color: '#1400FF' }}>{index}</span>
            <div style={{ width: 24, height: 1, background: '#1400FF' }} />
            <span style={{ ...mono, fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)' }}>
                {label}
            </span>
        </div>
    )
}

function SkillTag({ skill }: { skill: string }) {
    const [hovered, setHovered] = useState(false)
    return (
        <span
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                padding: '5px 11px',
                border: `1px solid ${hovered ? '#1400FF' : 'rgba(0,0,0,0.13)'}`,
                background: hovered ? '#1400FF' : 'transparent',
                color: hovered ? '#fff' : 'rgba(0,0,0,0.6)',
                transition: 'all 0.16s',
                cursor: 'default',
                display: 'inline-block',
            }}
        >
            {skill}
        </span>
    )
}

const ABOUT_SECTIONS: TrackerSection[] = [
    { id: 'intro', labelKey: 'intro' },
    { id: 'skills', labelKey: 'skills' },
    { id: 'experience', labelKey: 'experience' },
    { id: 'education', labelKey: 'education' },
    { id: 'documents', labelKey: 'documents' },
]

type ExpProject = {
    name: string
    description: string
    contributions: string[]
    tech: string[]
}

type Experience = {
    company: string
    period: string
    role: string
    projects: ExpProject[]
}

export default function AboutPage() {
    const { t, messages } = useTranslation()
    const isMobile = useIsMobile('md')
    const SKILLS = Object.fromEntries(((messages.skillGroups as any[]) ?? []).map((g: { label: string; skills: string[] }) => [g.label, g.skills]))
    const experiences = (messages.experiences as Experience[]) ?? []

    return (
        <main style={{ background: '#FAFAF8', minHeight: '100vh', cursor: 'crosshair' }}>
            <SectionTracker sections={ABOUT_SECTIONS} />
            <div
                id={ABOUT_SECTIONS[0].id}
                style={{
                    position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto',
                    padding: isMobile ? '60px 20px 80px' : '80px 48px 120px',
                }}
            >

                {/* ── INTRO ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? 40 : 80,
                        alignItems: 'start',
                        marginBottom: isMobile ? 64 : 100,
                    }}
                >
                    {/* avatar */}
                    <div style={{ position: 'relative', maxWidth: isMobile ? 280 : '100%', margin: isMobile ? '0 auto' : 0 }}>
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
                                objectFit: 'contain',
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
                    </div>

                    {/* bio */}
                    <div style={{ paddingTop: isMobile ? 0 : 8 }}>
                        <SectionLabel index="01" label={t('ui.about.sectionLabel')} />
                        <h2 style={{
                            ...sans, fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
                            fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05,
                            color: '#111', margin: '0 0 24px',
                        }}>
                            {t('ui.about.fullstackDev')}<br />
                            <span style={{ color: '#1400FF' }}>{t('ui.about.feAtHeart')}</span>
                        </h2>

                        {(messages.personal.bioArray as string[]).map((paragraph, i) => (
                            <p key={i} style={{ ...mono, fontSize: 11.5, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', marginBottom: 18 }}>
                                {paragraph}
                            </p>
                        ))}

                        {/* stats grid — 2 cols on all sizes */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid rgba(0,0,0,0.1)', marginBottom: 32 }}>
                            {messages.personal.stats.map(({ label, value }: { label: string; value: string }) => (
                                <div key={label} style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
                                    <div style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.52)', marginBottom: 5 }}>{label}</div>
                                    <div style={{ ...mono, fontSize: 11, color: '#111' }}>{value}</div>
                                </div>
                            ))}
                            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.52)', marginBottom: 5 }}>{t('personal.gender')}</div>
                                <div style={{ ...mono, fontSize: 11, color: '#111' }}>{messages.personal.gender}</div>
                            </div>
                            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.52)', marginBottom: 5 }}>{t('personal.dateOfBirth')}</div>
                                <div style={{ ...mono, fontSize: 11, color: '#111' }}>{messages.personal.dateOfBirth}</div>
                            </div>
                            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.52)', marginBottom: 5 }}>{t('personal.emailLabel')}</div>
                                <a href={`mailto:${personal.links.email}`} style={{ ...mono, fontSize: 11, color: '#1400FF', textDecoration: 'none', wordBreak: 'break-all' }}>
                                    {personal.links.email}
                                </a>
                            </div>
                            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.52)', marginBottom: 5 }}>{t('personal.phoneLabel')}</div>
                                <a href={`tel:${personal.phone}`} style={{ ...mono, fontSize: 11, color: '#111', textDecoration: 'none' }}>
                                    {personal.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── SKILLS ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: isMobile ? 64 : 100 }}
                    id={ABOUT_SECTIONS[1].id}
                >
                    <SectionLabel index="02" label={t('ui.section.skills')} />
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: 0,
                        border: '1px solid rgba(0,0,0,0.1)',
                    }}>
                        {Object.entries(SKILLS).map(([group, skills], gi) => {
                            const cols = isMobile ? 2 : 4
                            const isLastCol = (gi + 1) % cols === 0
                            const isLastRow = gi >= Object.keys(SKILLS).length - cols
                            return (
                                <div
                                    key={group}
                                    style={{
                                        padding: isMobile ? '20px 16px' : '28px 24px',
                                        borderRight: isLastCol ? 'none' : '1px solid rgba(0,0,0,0.1)',
                                        borderBottom: isLastRow ? 'none' : '1px solid rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <div style={{ ...mono, fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#1400FF', marginBottom: 16 }}>
                                        {group}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {(skills as string[]).map(s => <SkillTag key={s} skill={s} />)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* ── EXPERIENCE ── */}
                <div id={ABOUT_SECTIONS[2].id} style={{ display: 'flex', flexDirection: 'column' }}>
                    <SectionLabel index="03" label={t('ui.section.experience')} />

                    {experiences.map((exp, i) => (
                        <motion.div
                            key={`${exp.company}-${i}`}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
                                gap: isMobile ? 16 : 48,
                                padding: isMobile ? '28px 0' : '40px 0',
                                borderBottom: '1px solid rgba(0,0,0,0.08)',
                            }}
                        >
                            {/* left */}
                            <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? 12 : 0, flexWrap: 'wrap', alignItems: isMobile ? 'baseline' : 'flex-start' }}>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)', marginBottom: isMobile ? 0 : 8 }}>
                                    {exp.period}
                                </div>
                                <div style={{ ...sans, fontSize: 15, fontWeight: 700, color: '#111', lineHeight: 1.4, marginBottom: isMobile ? 0 : 8 }}>
                                    {exp.company}
                                </div>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1400FF' }}>
                                    {exp.role}
                                </div>
                            </div>

                            {/* right */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                                {exp.projects.map((project, pi) => (
                                    <div key={`${project.name}-${pi}`} style={{ paddingTop: pi !== 0 ? 24 : 0, borderTop: pi !== 0 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                                        <div style={{ ...sans, fontSize: 14, fontWeight: 700, color: '#1400FF', marginBottom: 10, lineHeight: 1.5 }}>{project.name}</div>
                                        <p style={{ ...mono, fontSize: 11.5, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', marginBottom: 18 }}>{project.description}</p>
                                        <ul style={{ margin: '0 0 20px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                            {project.contributions.map((contribution, ci) => (
                                                <li key={ci} style={{ ...mono, fontSize: 11, lineHeight: 1.75, color: 'rgba(0,0,0,0.55)' }}>{contribution}</li>
                                            ))}
                                        </ul>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                            {project.tech.map((tech) => (
                                                <span key={tech} style={{ ...mono, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#1400FF', border: '1px solid rgba(20,0,255,0.22)', padding: '4px 9px' }}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── EDUCATION + CERTS ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    id={ABOUT_SECTIONS[3].id}
                    style={{ paddingTop: 30 }}
                >
                    <SectionLabel index="04" label={t('ui.section.education') + ' & Certs'} />
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 48 }}>
                        <div>
                            <div style={{ padding: '24px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(0,0,0,0.52)', marginBottom: 6 }}>{messages.education.period}</div>
                                <div style={{ ...sans, fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 4 }}>{messages.education.school}</div>
                                <div style={{ ...mono, fontSize: 11, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6 }}>
                                    {messages.education.degree} — {messages.education.major}
                                </div>
                            </div>
                        </div>
                        <div>
                            {CERTS.map((cert, i) => (
                                <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                                    <div>
                                        <div style={{ ...sans, fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 3 }}>{cert.name}</div>
                                        <div style={{ ...mono, fontSize: 10, color: 'rgba(0,0,0,0.38)' }}>{cert.issuer}</div>
                                    </div>
                                    <span style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(0,0,0,0.5)', flexShrink: 0 }}>{cert.year}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── CV & DOCUMENTS ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    id={ABOUT_SECTIONS[4].id}
                    style={{ marginTop: 48, paddingTop: 40 }}
                >
                    <SectionLabel index="05" label={t('ui.section.documents')} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid rgba(0,0,0,0.1)' }}>
                        {[
                            { label: 'CV — Fullstack Developer', lang: 'EN', href: '/cv/CV_NguyenHoangTueSang_FullstackDeveloper_EN.pdf' },
                            { label: 'CV — Lập trình viên Fullstack', lang: 'VI', href: '/cv/CV_NguyenHoangTueSang_FullstackDeveloper_VI.pdf' },
                            { label: 'Academic Transcript', lang: 'GPA 3.56', href: '/cv/AcademicTranscript_NguyenHoangTueSang.pdf' },
                        ].map(({ label, lang, href }) => (
                            <div key={href} style={{
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: isMobile ? '14px 14px' : '16px 20px',
                                borderBottom: '1px solid rgba(0,0,0,0.06)', gap: 12, flexWrap: 'wrap',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                                    <span style={{ ...mono, fontSize: 9, letterSpacing: '0.3em', color: '#1400FF', border: '1px solid rgba(20,0,255,0.3)', padding: '3px 7px', flexShrink: 0 }}>
                                        {lang}
                                    </span>
                                    <span style={{ ...mono, fontSize: isMobile ? 10 : 11, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {label}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
                                    <a href={href} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#1400FF', textDecoration: 'none' }}>
                                        View ↗
                                    </a>
                                    <a href={href} download style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)', textDecoration: 'none' }}>
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    )
}