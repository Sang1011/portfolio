'use client'

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import NavLink from "./NavLink"
import LanguageToggle from "./LanguageToggle"
import { useIsMobile } from "@/lib/hooks/useBreakpoint"

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }

const HOME_NAV = ['about', 'projects', 'contact'] as const
const SUB_NAV = ['home', 'about', 'projects', 'contact'] as const

export default function Header() {
    const pathname = usePathname()
    const isHome = pathname === '/'
    const navItems = isHome ? HOME_NAV : SUB_NAV

    const isMobile = useIsMobile() // < 768px
    const [menuOpen, setMenuOpen] = useState(false)

    // Đóng menu khi resize lên desktop
    useEffect(() => {
        if (!isMobile) setMenuOpen(false)
    }, [isMobile])

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: isHome ? 'relative' : 'sticky',
                    top: 0,
                    zIndex: 50,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 36px',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    background: 'rgba(250,250,248,0.85)',
                }}
            >
                <span style={{
                    ...mono, fontSize: 12, letterSpacing: '0.45em',
                    textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)',
                }}>
                    {'{ Portfolio // 2026 }'}
                </span>

                {/* Desktop nav */}
                {!isMobile && (
                    <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                        {navItems.map(item => (
                            <NavLink key={item} item={item} />
                        ))}
                        <LanguageToggle />
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2.2, repeat: Infinity }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 7,
                                padding: '5px 11px',
                                border: '1px solid #1400FF',
                                background: 'rgba(20,0,255,0.05)',
                            }}
                        >
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1400FF', display: 'block' }} />
                            <span style={{ ...mono, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#1400FF' }}>
                                Open to Work
                            </span>
                        </motion.div>
                    </nav>
                )}

                {/* Hamburger */}
                {isMobile && (
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                        style={{
                            all: 'unset',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 5,
                            padding: 8,
                        }}
                    >
                        <motion.span
                            animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.22 }}
                            style={{ display: 'block', width: 20, height: 1.5, background: '#111', transformOrigin: 'center' }}
                        />
                        <motion.span
                            animate={menuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                            transition={{ duration: 0.16 }}
                            style={{ display: 'block', width: 20, height: 1.5, background: '#111' }}
                        />
                        <motion.span
                            animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.22 }}
                            style={{ display: 'block', width: 20, height: 1.5, background: '#111', transformOrigin: 'center' }}
                        />
                    </button>
                )}
            </motion.header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {isMobile && menuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                        style={{
                            position: 'fixed',
                            top: 57,
                            left: 0,
                            right: 0,
                            zIndex: 40,
                            background: 'rgba(250,250,248,0.97)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            borderBottom: '1px solid rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '24px 36px',
                            gap: 24,
                        }}
                    >
                        {navItems.map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 }}
                                onClick={() => setMenuOpen(false)}
                            >
                                <NavLink item={item} />
                            </motion.div>
                        ))}

                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2.2, repeat: Infinity }}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 7,
                                padding: '5px 11px',
                                border: '1px solid #1400FF',
                                background: 'rgba(20,0,255,0.05)',
                                alignSelf: 'flex-start',
                            }}
                        >
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1400FF', display: 'block' }} />
                            <span style={{ ...mono, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#1400FF' }}>
                                Open to Work
                            </span>
                        </motion.div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}