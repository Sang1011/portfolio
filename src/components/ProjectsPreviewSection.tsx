'use client'

import { getFeaturedProjects } from '@/lib/data'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslation } from '@/lib/hooks'

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }
const sans: React.CSSProperties = { fontFamily: 'var(--font-space-grotesk), sans-serif' }

const STATUS_KEY: Record<string, 'ui.project.statusLive' | 'ui.project.statusUiOnly' | 'ui.project.statusPrivate'> = {
    live: 'ui.project.statusLive',
    'ui-only': 'ui.project.statusUiOnly',
    private: 'ui.project.statusPrivate',
}

export default function ProjectsPreviewSection() {
    const { t } = useTranslation()
    const featured = getFeaturedProjects()

    return (
        <section id="projects-preview" style={{
            padding: '120px 48px',
            maxWidth: 1100,
            margin: '0 auto',
        }}>
            {/* header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: 64 }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                    <span style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', color: '#1400FF' }}>03</span>
                    <div style={{ width: 24, height: 1, background: '#1400FF' }} />
                    <span style={{ ...mono, fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)' }}>
                        {t('ui.projects.sectionLabel')}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <h2 style={{
                        ...sans, fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                        fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95,
                        color: '#111', margin: 0,
                    }}>
                        PROJECTS<span style={{ color: '#1400FF' }}>.</span>
                    </h2>
                    <Link href="/projects" style={{
                        ...mono, fontSize: 10, letterSpacing: '0.35em',
                        textTransform: 'uppercase', color: '#1400FF',
                        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                        paddingBottom: 4,
                    }}>
                        {t('ui.projects.viewAll')} →
                    </Link>
                </div>
            </motion.div>

            {/* project list */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                {featured.map((project, index) => {
                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '48px 1fr auto',
                                    alignItems: 'center',
                                    gap: 32,
                                    padding: '28px 0',
                                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                                    cursor: 'pointer',
                                }}>
                                    <span style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(0,0,0,0.48)' }}>
                                        [{String(index + 1).padStart(2, '0')}]
                                    </span>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                                            <h3 style={{
                                                ...sans, fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                                                fontWeight: 800, letterSpacing: '-0.02em',
                                                color: '#111', margin: 0,
                                            }}>
                                                {project.title}
                                            </h3>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                {project.role.map(r => (
                                                    <span key={r} style={{
                                                        ...mono, fontSize: 10, letterSpacing: '0.35em',
                                                        textTransform: 'uppercase', color: '#1400FF',
                                                        border: '1px solid rgba(20,0,255,0.3)', padding: '2px 7px',
                                                    }}>
                                                        {t(`ui.project.role.${r}`)}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <p style={{ ...mono, fontSize: 11, color: 'rgba(0,0,0,0.6)', margin: '0 0 10px' }}>
                                            {project.subtitle}
                                        </p>
                                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                            {project.tech.slice(0, 5).map(t => (
                                                <span key={t} style={{
                                                    ...mono, fontSize: 10, letterSpacing: '0.25em',
                                                    textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)',
                                                    border: '1px solid rgba(0,0,0,0.12)', padding: '3px 7px',
                                                }}>
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <div style={{ ...mono, fontSize: 11, color: 'rgba(0,0,0,0.52)', marginBottom: 6 }}>
                                            {project.period}
                                        </div>
                                        <div style={{
                                            ...mono, fontSize: 10, letterSpacing: '0.3em',
                                            textTransform: 'uppercase',
                                            color: project.status === 'live' ? '#1400FF' : 'rgba(0,0,0,0.35)',
                                        }}>
                                            {t(STATUS_KEY[project.status])}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}