'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTracker, { TrackerSection } from '@/components/SectionTracker'
import { useTranslation } from '@/lib/hooks'

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SKILLS = Object.fromEntries(((messages.skillGroups as any[]) ?? []).map((g: { label: string; skills: string[] }) => [g.label, g.skills]))
    const experiences = (messages.experiences as Experience[]) ?? []

    return (
        <main style={{ background: '#FAFAF8', minHeight: '100vh', cursor: 'crosshair' }}>
            <SectionTracker sections={ABOUT_SECTIONS} />
            <div id={ABOUT_SECTIONS[0].id} style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '80px 48px 120px' }}>

                {/* ── INTRO ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', marginBottom: 100 }}
                >
                    {/* left: avatar */}
                    <div style={{ position: 'relative' }}>
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
                            alt="Nguyễn Hoàng Tuệ Sang"
                            style={{
                                width: '100%',
                                aspectRatio: '4/5',
                                objectFit: 'cover',
                                objectPosition: 'top',
                                display: 'block',
                            }}
                        />
                        <div style={{
                            position: 'absolute', bottom: -1, left: 0, right: 0,
                            background: '#1400FF', padding: '10px 16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}>
                            <span style={{ ...sans, fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                                Nguyễn Hoàng Tuệ Sang
                            </span>
                            <span style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                                .DEV
                            </span>
                        </div>
                    </div>

                    {/* right: bio */}
                    <div style={{ paddingTop: 8 }}>
                        <SectionLabel index="01" label={t('ui.about.sectionLabel')} />

                        <h2 style={{
                            ...sans, fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                            fontWeight: 900, letterSpacing: '-0.03em',
                            lineHeight: 1.05, color: '#111', margin: '0 0 24px',
                        }}>
                            {t('ui.about.fullstackDev')}<br />
                            <span style={{ color: '#1400FF' }}>{t('ui.about.feAtHeart')}</span>
                        </h2>

                        {/* bio */}
                        {(messages.personal.bioArray as string[]).map((paragraph, i) => (
                            <p key={i} style={{
                                ...mono, fontSize: 11.5, lineHeight: 1.8,
                                color: 'rgba(0,0,0,0.5)', marginBottom: 18,
                            }}>
                                {paragraph}
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
                    </div>
                </motion.div>

                {/* ── SKILLS ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: 100 }}
                    id={ABOUT_SECTIONS[1].id}
                >
                    <SectionLabel index="02" label={t('ui.section.skills')} />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid rgba(0,0,0,0.1)' }}>
                        {Object.entries(SKILLS).map(([group, skills], gi) => (
                            <div
                                key={group}
                                style={{
                                    padding: '28px 24px',
                                    borderRight: gi < 3 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                                }}
                            >
                                <div style={{
                                    ...mono, fontSize: 10, letterSpacing: '0.45em',
                                    textTransform: 'uppercase', color: '#1400FF',
                                    marginBottom: 20,
                                }}>
                                    {group}
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {(skills as string[]).map(s => <SkillTag key={s} skill={s} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── EXPERIENCE ── */}
                <div
                    id={ABOUT_SECTIONS[2].id}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
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
                                gridTemplateColumns: '220px 1fr',
                                gap: 48,
                                padding: '40px 0',
                                borderBottom: '1px solid rgba(0,0,0,0.08)',
                            }}
                        >
                            {/* left column */}
                            <div>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)', marginBottom: 8 }}>
                                    {exp.period}
                                </div>
                                <div style={{ ...sans, fontSize: 15, fontWeight: 700, color: '#111', lineHeight: 1.4, marginBottom: 8 }}>
                                    {exp.company}
                                </div>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1400FF' }}>
                                    {exp.role}
                                </div>
                            </div>

                            {/* right column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                                {exp.projects.map((project, pi) => (
                                    <div
                                        key={`${project.name}-${pi}`}
                                        style={{
                                            paddingTop: pi !== 0 ? 24 : 0,
                                            borderTop: pi !== 0 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                                        }}
                                    >
                                        <div style={{ ...sans, fontSize: 14, fontWeight: 700, color: '#1400FF', marginBottom: 10, lineHeight: 1.5 }}>
                                            {project.name}
                                        </div>
                                        <p style={{ ...mono, fontSize: 11.5, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', marginBottom: 18 }}>
                                            {project.description}
                                        </p>
                                        <ul style={{ margin: '0 0 20px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                            {project.contributions.map((contribution, ci) => (
                                                <li key={ci} style={{ ...mono, fontSize: 11, lineHeight: 1.75, color: 'rgba(0,0,0,0.55)' }}>
                                                    {contribution}
                                                </li>
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
                >
                    <SectionLabel index="04" label={t('ui.section.education') + ' & Certs'} />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
                        <div>
                            <div style={{ padding: '24px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(0,0,0,0.52)', marginBottom: 6 }}>
                                    {messages.education.period}
                                </div>
                                <div style={{ ...sans, fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 4 }}>
                                    {messages.education.school}
                                </div>
                                <div style={{ ...mono, fontSize: 11, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6 }}>
                                    {messages.education.degree} — {messages.education.major}
                                </div>
                            </div>
                        </div>
                        <div>
                            {CERTS.map((cert, i) => (
                                <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                                    <div>
                                        <div style={{ ...sans, fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 3 }}>
                                            {cert.name}
                                        </div>
                                        <div style={{ ...mono, fontSize: 10, color: 'rgba(0,0,0,0.38)' }}>
                                            {cert.issuer}
                                        </div>
                                    </div>
                                    <span style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(0,0,0,0.5)', flexShrink: 0 }}>
                                        {cert.year}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </main>
    )
}