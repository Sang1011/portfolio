'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects, statusLabel, roleLabel, getProjectBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'
import { useState } from 'react'
import { useIsMobile, useTranslation } from '@/lib/hooks'

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }
const sans: React.CSSProperties = { fontFamily: 'var(--font-space-grotesk), sans-serif' }

export default function ProjectDetailPage({ slug }: { slug: string }) {
    const project = getProjectBySlug(slug)
    if (!project) notFound()

    const { t, messages } = useTranslation()
    const isMobile = useIsMobile('md')
    const projectData = (messages.projects as any)?.find((p: any) => p.slug === slug)
    const [activeImg, setActiveImg] = useState(0)

    const currentIndex = projects.findIndex(p => p.slug === slug)
    const prev = projects[currentIndex - 1]
    const next = projects[currentIndex + 1]

    return (
        <main style={{ background: '#FAFAF8', minHeight: '100vh', cursor: 'crosshair' }}>
            <div style={{
                position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto',
                padding: isMobile ? '60px 20px 80px' : '80px 48px 120px',
            }}>

                {/* back */}
                <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: 56 }}>
                    <Link href="/projects" style={{ ...mono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', textDecoration: 'none', color: 'rgba(0,0,0,0.38)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: '#1400FF' }}>←</span> {t('ui.project.allProjects')}
                    </Link>
                </motion.div>

                {/* ── HERO ── */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', color: '#1400FF' }}>
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                        <div style={{ width: 20, height: 1, background: '#1400FF' }} />
                        {project.role.map(r => (
                            <span key={r} style={{ ...mono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#1400FF', border: '1px solid rgba(20,0,255,0.3)', padding: '2px 8px' }}>
                                {t(`ui.project.role.${r}`)}
                            </span>
                        ))}
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>
                            {projectData?.period || project.period}
                        </span>
                    </div>
                    <h1 style={{ ...sans, fontSize: 'clamp(2rem, 6vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#111', margin: '0 0 16px' }}>
                        {project.title}<span style={{ color: '#1400FF' }}>.</span>
                    </h1>
                    <p style={{ ...mono, fontSize: 13, color: 'rgba(0,0,0,0.45)', lineHeight: 1.7, maxWidth: 600 }}>
                        {projectData?.subtitle || project.subtitle}
                    </p>
                </motion.div>

                {/* ── IMAGE GALLERY ── */}
                {project.images.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ marginBottom: 72 }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <div style={{
                                width: project.galleryType === 'mobile' ? (isMobile ? 200 : 320) : '100%',
                                aspectRatio: project.galleryType === 'mobile' ? '9 / 19.5' : '16 / 9',
                                overflow: 'hidden',
                                border: '1px solid rgba(0,0,0,0.1)',
                                background: '#F0EEE9',
                            }}>
                                <motion.img
                                    key={activeImg}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    src={project.images[activeImg]}
                                    alt={`${project.title} screenshot ${activeImg + 1}`}
                                    style={{ width: '100%', height: '100%', objectFit: project.galleryType === 'mobile' ? 'contain' : 'cover' }}
                                />
                            </div>
                        </div>
                        {project.images.length > 1 && (
                            <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                                {project.images.map((img, i) => (
                                    <button key={i} onClick={() => setActiveImg(i)} style={{
                                        all: 'unset', cursor: 'pointer',
                                        width: project.galleryType === 'mobile' ? (isMobile ? 32 : 48) : (isMobile ? 56 : 80),
                                        height: project.galleryType === 'mobile' ? (isMobile ? 60 : 92) : (isMobile ? 36 : 52),
                                        overflow: 'hidden',
                                        border: `1.5px solid ${i === activeImg ? '#1400FF' : 'rgba(0,0,0,0.1)'}`,
                                        transition: 'border-color 0.15s', flexShrink: 0,
                                    }}>
                                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: project.galleryType === 'mobile' ? 'contain' : 'cover' }} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* ── CONTENT GRID ── */}
                <div style={{
                    display: 'grid',
                    // mobile: stack dọc; desktop: main + sidebar
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
                    gap: isMobile ? 40 : 64,
                    marginBottom: 80,
                }}>
                    <div>
                        <div style={{ marginBottom: 48 }}>
                            <div style={{ ...mono, fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#1400FF', marginBottom: 16 }}>
                                {t('ui.project.overview')}
                            </div>
                            <p style={{ ...mono, fontSize: 13, lineHeight: 1.85, color: 'rgba(0,0,0,0.5)' }}>
                                {projectData?.description || project.title}
                            </p>
                        </div>
                        <div>
                            <div style={{ ...mono, fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#1400FF', marginBottom: 16 }}>
                                {t('ui.project.whatIBuilt')}
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {(projectData?.myContributions || []).map((item: string, i: number) => (
                                    <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                        <span style={{ color: '#1400FF', flexShrink: 0, marginTop: 2 }}>→</span>
                                        <span style={{ ...mono, fontSize: 12, lineHeight: 1.7, color: 'rgba(0,0,0,0.55)' }}>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* sidebar */}
                    <div style={{
                        display: 'flex', flexDirection: 'column', gap: 32,
                        // mobile: border top thay vì sidebar
                        borderTop: isMobile ? '1px solid rgba(0,0,0,0.08)' : 'none',
                        paddingTop: isMobile ? 32 : 0,
                    }}>
                        <div>
                            <div style={{ ...mono, fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#1400FF', marginBottom: 12 }}>
                                {t('ui.project.techStack')}
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {project.tech.map(tech => (
                                    <span key={tech} style={{ ...mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,0,0,0.12)', padding: '4px 9px' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div style={{ ...mono, fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#1400FF', marginBottom: 12 }}>
                                {t('ui.project.status')}
                            </div>
                            <span style={{ ...mono, fontSize: 10, color: project.status === 'live' ? '#1400FF' : 'rgba(0,0,0,0.4)' }}>
                                {t(project.status === 'live' ? 'ui.project.statusLive' : project.status === 'private' ? 'ui.project.statusPrivate' : 'ui.project.statusUiOnly')}
                            </span>
                        </div>

                        {(project.links.github || project.links.githubFE || project.links.githubMobile || project.links.demo || project.links.apk || project.links.landing) && (
                            <div>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#1400FF', marginBottom: 12 }}>
                                    {t('ui.project.links')}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#111', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ color: '#1400FF' }}>↗</span> GitHub (BE)</a>}
                                    {project.links.githubFE && <a href={project.links.githubFE} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#111', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ color: '#1400FF' }}>↗</span> GitHub (FE)</a>}
                                    {project.links.githubMobile && <a href={project.links.githubMobile} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#111', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ color: '#1400FF' }}>↗</span> GitHub (Mobile)</a>}
                                    {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#111', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ color: '#1400FF' }}>↗</span> {t('ui.project.liveDemo')}</a>}
                                    {project.links.apk && <a href={project.links.apk} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#111', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ color: '#1400FF' }}>↗</span> Download APK</a>}
                                    {project.links.landing && <a href={project.links.landing} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#111', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ color: '#1400FF' }}>↗</span> Landing Page</a>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── PREV / NEXT ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 40 }}>
                    {prev ? (
                        <Link href={`/projects/${prev.slug}`} style={{ textDecoration: 'none' }}>
                            <div style={{ padding: '20px 0' }}>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: 6 }}>← {t('ui.project.prev')}</div>
                                <div style={{ ...sans, fontSize: isMobile ? 13 : 16, fontWeight: 700, color: '#111' }}>{prev.title}</div>
                            </div>
                        </Link>
                    ) : <div />}
                    {next ? (
                        <Link href={`/projects/${next.slug}`} style={{ textDecoration: 'none' }}>
                            <div style={{ padding: '20px 0', textAlign: 'right' }}>
                                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: 6 }}>{t('ui.project.next')} →</div>
                                <div style={{ ...sans, fontSize: isMobile ? 13 : 16, fontWeight: 700, color: '#111' }}>{next.title}</div>
                            </div>
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </main>
    )
}