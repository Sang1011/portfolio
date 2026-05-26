'use client'

import { getFeaturedProjects } from '@/lib/data'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useIsMobile, useTranslation } from '@/lib/hooks'
import { arrowVariants, hoverLineVariants, itemVariants, sectionVariants } from '@/lib'

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
    const isMobile = useIsMobile('md')

    return (
        <section id="projects-preview" style={{
            padding: isMobile ? '80px 20px 0px 20px' : '120px 48px 0px 48px',
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
                    <Link href="/projects" style={{ textDecoration: 'none' }}>
                        <motion.div
                            whileHover={{ x: 4 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            style={{
                                ...mono, fontSize: 10, letterSpacing: '0.35em',
                                textTransform: 'uppercase', color: '#1400FF',
                                display: 'inline-flex', alignItems: 'center', gap: 10,
                                paddingLeft: 40
                            }}
                        >
                            <span>{t('ui.projects.viewAll')}</span>
                            <span style={{ fontSize: 14 }}>→</span>
                        </motion.div>
                    </Link>
                </div>
            </motion.div>

            {/* project list */}
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.18 }}
                style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}
            >
                {featured.map((project, index) => (
                    <motion.div
                        key={project.id}
                        variants={itemVariants}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        style={{ position: 'relative' }}
                    >
                        <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                            <motion.div
                                whileHover={{ backgroundColor: 'rgba(20,0,255,0.035)' }}
                                transition={{ duration: 0.25 }}
                                style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '32px 1fr' : '48px 1fr auto',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: isMobile ? 16 : 32,
                                    padding: isMobile ? '20px 0' : '28px 0',
                                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                                    cursor: 'pointer',
                                }}
                            >
                                {/* blue hover line */}
                                <motion.div
                                    variants={hoverLineVariants}
                                    style={{
                                        position: 'absolute', left: 0, bottom: -1,
                                        width: '100%', height: 1,
                                        background: '#1400FF', transformOrigin: 'left',
                                    }}
                                />

                                {/* soft glow */}
                                <motion.div
                                    variants={{
                                        rest: { opacity: 0, x: -80 },
                                        hover: { opacity: 1, x: 0 },
                                    }}
                                    transition={{ duration: 0.35 }}
                                    style={{
                                        position: 'absolute', inset: 0, pointerEvents: 'none',
                                        background: 'linear-gradient(90deg, rgba(20,0,255,0.08), transparent 45%)',
                                    }}
                                />

                                {/* index number */}
                                <motion.span
                                    variants={{
                                        rest: { color: 'rgba(0,0,0,0.48)' },
                                        hover: { color: '#1400FF' },
                                    }}
                                    style={{
                                        ...mono, position: 'relative', zIndex: 1,
                                        fontSize: 10, letterSpacing: '0.3em',
                                        paddingTop: isMobile ? 2 : 0,
                                    }}
                                >
                                    [{String(index + 1).padStart(2, '0')}]
                                </motion.span>

                                {/* main content */}
                                <div style={{ position: 'relative', zIndex: 1, minWidth: 0 }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        gap: 10,
                                        marginBottom: 6,
                                        flexWrap: 'wrap',
                                    }}>
                                        <motion.h3
                                            variants={{
                                                rest: { x: 0, color: '#111' },
                                                hover: { x: 6, color: '#1400FF' },
                                            }}
                                            transition={{ duration: 0.25 }}
                                            style={{
                                                ...sans,
                                                fontSize: isMobile ? '1.1rem' : 'clamp(1rem, 2vw, 1.5rem)',
                                                fontWeight: 800,
                                                letterSpacing: '-0.02em',
                                                margin: 0,
                                            }}
                                        >
                                            {project.title}
                                        </motion.h3>

                                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                            {project.role.map((r) => (
                                                <motion.span
                                                    key={r}
                                                    whileHover={{ y: -2 }}
                                                    transition={{ duration: 0.18 }}
                                                    style={{
                                                        ...mono, fontSize: 10,
                                                        letterSpacing: '0.35em', textTransform: 'uppercase',
                                                        color: '#1400FF', border: '1px solid rgba(20,0,255,0.3)',
                                                        padding: '2px 7px', background: 'rgba(255,255,255,0.75)',
                                                    }}
                                                >
                                                    {r}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    <motion.p
                                        variants={{
                                            rest: { opacity: 0.72 },
                                            hover: { opacity: 1 },
                                        }}
                                        style={{
                                            ...mono, fontSize: 11,
                                            color: 'rgba(0,0,0,0.6)', margin: '0 0 10px',
                                        }}
                                    >
                                        {project.subtitle}
                                    </motion.p>

                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: isMobile ? 10 : 0 }}>
                                        {project.tech.slice(0, 5).map((tech) => (
                                            <motion.span
                                                key={tech}
                                                whileHover={{ y: -2, borderColor: 'rgba(20,0,255,0.35)', color: 'rgba(20,0,255,0.75)' }}
                                                transition={{ duration: 0.18 }}
                                                style={{
                                                    ...mono, fontSize: 10,
                                                    letterSpacing: '0.25em', textTransform: 'uppercase',
                                                    color: 'rgba(0,0,0,0.32)', border: '1px solid rgba(0,0,0,0.12)',
                                                    padding: '3px 7px', background: 'rgba(255,255,255,0.7)',
                                                }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {isMobile && (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                            <span style={{ ...mono, fontSize: 11, color: 'rgba(0,0,0,0.52)' }}>
                                                {project.period}
                                            </span>
                                            <div style={{
                                                ...mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
                                                color: project.status === 'live' ? '#1400FF' : 'rgba(0,0,0,0.35)',
                                                display: 'flex', alignItems: 'center', gap: 6,
                                            }}>
                                                {t(STATUS_KEY[project.status])} →
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {!isMobile && (
                                    <motion.div
                                        variants={{ rest: { x: 0 }, hover: { x: -4 } }}
                                        transition={{ duration: 0.25 }}
                                        style={{ position: 'relative', zIndex: 1, textAlign: 'right', flexShrink: 0 }}
                                    >
                                        <div style={{ ...mono, fontSize: 11, color: 'rgba(0,0,0,0.52)', marginBottom: 6 }}>
                                            {project.period}
                                        </div>
                                        <div style={{
                                            ...mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
                                            color: project.status === 'live' ? '#1400FF' : 'rgba(0,0,0,0.35)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8,
                                        }}>
                                            {t(STATUS_KEY[project.status])}
                                            <motion.span variants={arrowVariants}>→</motion.span>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}