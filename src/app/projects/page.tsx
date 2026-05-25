'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { projects } from '@/lib/data'
import type { ProjectRole } from '@/lib/data'
import { useTranslation } from '@/lib/hooks'

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }
const sans: React.CSSProperties = { fontFamily: 'var(--font-space-grotesk), sans-serif' }

const STATUS_COLOR: Record<string, string> = {
    live: '#1400FF',
    'ui-only': 'rgba(0,0,0,0.35)',
    private: 'rgba(0,0,0,0.35)',
}

function ProjectRow({ project, index, t }: {
    project: typeof projects[0]
    index: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: any
}) {
    const [hovered, setHovered] = useState(false)
    const [imgPos, setImgPos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setImgPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
        >
            <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onMouseMove={handleMouseMove}
                    style={{
                        position: 'relative',
                        display: 'grid',
                        gridTemplateColumns: '64px 1fr auto',
                        alignItems: 'center',
                        gap: 32,
                        padding: '28px 0',
                        borderBottom: '1px solid rgba(0,0,0,0.08)',
                        cursor: 'none',
                        transition: 'background 0.2s',
                        background: hovered ? 'rgba(20,0,255,0.02)' : 'transparent',
                    }}
                >
                    {/* index */}
                    <span style={{
                        ...mono, fontSize: 10, letterSpacing: '0.3em',
                        color: hovered ? '#1400FF' : 'rgba(0,0,0,0.48)',
                        transition: 'color 0.2s',
                    }}>
                        [{String(index + 1).padStart(2, '0')}]
                    </span>

                    {/* main info */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
                            <h3 style={{
                                ...sans, fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)',
                                fontWeight: 800, letterSpacing: '-0.02em',
                                color: hovered ? '#1400FF' : '#111',
                                margin: 0, transition: 'color 0.2s',
                            }}>
                                {project.title}
                            </h3>
                            {/* role badge */}
                            {project.role.map(r => (
                                <span key={r} style={{
                                    ...mono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase',
                                    color: '#1400FF', border: '1px solid rgba(20,0,255,0.3)', padding: '2px 8px',
                                }}>
                                    {t(`ui.project.role.${r}`)}
                                </span>
                            ))}
                        </div>

                        <p style={{
                            ...mono, fontSize: 11, color: 'rgba(0,0,0,0.6)',
                            margin: '0 0 12px', lineHeight: 1.5,
                        }}>
                            {project.subtitle}
                        </p>

                        {/* tech tags */}
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

                    {/* right: year + status */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ ...mono, fontSize: 11, color: 'rgba(0,0,0,0.52)', marginBottom: 6 }}>
                            {project.year}
                        </div>
                        <div style={{
                            ...mono, fontSize: 10, letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            color: STATUS_COLOR[project.status],
                        }}>
                            {t(project.status === 'live' ? 'ui.project.statusLive' : project.status === 'private' ? 'ui.project.statusPrivate' : 'ui.project.statusUiOnly')}
                        </div>
                    </div>

                    {/* hover image preview */}
                    <AnimatePresence>
                        {hovered && project.thumbnail && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.92 }}
                                transition={{ duration: 0.18 }}
                                style={{
                                    position: 'absolute',
                                    left: imgPos.x + 20,
                                    top: imgPos.y - 80,
                                    width: 220,
                                    height: 140,
                                    pointerEvents: 'none',
                                    zIndex: 50,
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0,0,0,0.12)',
                                    background: '#fff',
                                }}
                            >
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Link>
        </motion.div>
    )
}

const FILTER_KEYS = {
    All: 'ui.projects.filterAll',
    FE: 'ui.projects.filterFE',
    BE: 'ui.projects.filterBE',
    Mobile: 'ui.projects.filterMobile',
    Fullstack: 'ui.projects.filterFullstack',
} as const

export default function ProjectsPage() {
    const { t } = useTranslation()
    const [filter, setFilter] = useState<ProjectRole | 'All'>('All')

    const filtered = filter === 'All'
        ? projects
        : projects.filter(p => p.role.includes(filter))

    return (
        <main style={{ background: '#FAFAF8', minHeight: '100vh', cursor: 'crosshair' }}>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '80px 48px 120px' }}>

                {/* header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: 64 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.4em', color: '#1400FF' }}>01</span>
                        <div style={{ width: 24, height: 1, background: '#1400FF' }} />
                        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)' }}>
                            {t('ui.projects.sectionLabel')}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
                        <h1 style={{
                            ...sans, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95,
                            color: '#111', margin: 0,
                        }}>
                            PROJECTS<span style={{ color: '#1400FF' }}>.</span>
                        </h1>

                        {/* filter bar */}
                        <div style={{ display: 'flex', gap: 6, flexShrink: 0, paddingBottom: 4 }}>
                            {(Object.keys(FILTER_KEYS) as Array<keyof typeof FILTER_KEYS>).map(f => {
                                const active = filter === f
                                return (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        style={{
                                            ...mono, fontSize: 10, letterSpacing: '0.3em',
                                            textTransform: 'uppercase',
                                            padding: '6px 14px',
                                            border: `1px solid ${active ? '#1400FF' : 'rgba(0,0,0,0.15)'}`,
                                            background: active ? '#1400FF' : 'transparent',
                                            color: active ? '#fff' : 'rgba(0,0,0,0.6)',
                                            cursor: 'pointer',
                                            transition: 'all 0.16s',
                                        }}
                                    >
                                        {t(FILTER_KEYS[f])}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* project count */}
                <div style={{
                    ...mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.5)', marginBottom: 8,
                    borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 16,
                }}>
                    {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                </div>

                {/* list */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {filtered.map((p, i) => (
                            <ProjectRow key={p.id} project={p} index={i} t={t} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    )
}