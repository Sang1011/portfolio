'use client'

import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { useHover } from "@/lib/hooks/useHover"
import { useTranslation } from "@/lib/hooks"

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }

const NAV_CONFIG: Record<string, { href: string; scrollId?: string }> = {
    home: { href: '/' },
    about: { href: '/about', scrollId: 'about-preview' },
    projects: { href: '/projects', scrollId: 'projects-preview' },
    contact: { href: '/#contact', scrollId: 'contact' },
}

interface NavLinkProps {
    item: 'home' | 'about' | 'projects' | 'contact'
}

export default function NavLink({ item }: NavLinkProps) {
    const { t } = useTranslation()
    const [ref, hovered] = useHover<HTMLAnchorElement>()
    const pathname = usePathname()
    const router = useRouter()

    const config = NAV_CONFIG[item]
    if (!config) return null

    const { href, scrollId } = config
    const isHome = pathname === '/'

    const isActive =
        item === 'home'
            ? pathname === '/'
            : pathname !== '/' && (pathname === href || pathname.startsWith(href + '/'))

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        if (item === 'home') {
            router.push('/')
            return
        }

        if (item === 'contact') {
            if (isHome) {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            } else {
                router.push('/#contact')
            }
            return
        }

        if (isHome && scrollId) {
            document.getElementById(scrollId)?.scrollIntoView({ behavior: 'smooth' })
            return
        }

        router.push(href)
    }

    return (
        <a
            ref={ref}
            href={href}
            onClick={handleClick}
            style={{
                ...mono,
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: isActive ? '#1400FF' : hovered ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.42)',
                textDecoration: 'none',
                position: 'relative',
                transition: 'color 0.2s',
            }}
        >
            {t(`ui.nav.${item}`)}
            <motion.span
                animate={{ scaleX: hovered || isActive ? 1 : 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: '#1400FF',
                    transformOrigin: 'left',
                    display: 'block',
                }}
            />
        </a>
    )
}