'use client'

import { motion, type Variants } from 'framer-motion'
import { useTranslation } from '@/lib/hooks'

const mono: React.CSSProperties = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }

const MAX_DOTS = 5

/**
 * 3 cách điều khiển animation:
 *  - Mặc định: kế thừa variant "rest" / "hover" từ motion cha (ProjectsPreviewSection).
 *  - `active`: điều khiển thủ công bằng state hover (page.tsx dùng useState).
 *  - `intro`: tự chạy hiệu ứng xuất hiện khi cuộn tới + phản ứng khi hover (ProjectDetail).
 */
const groupVariants: Variants = {
    hidden: {},
    rest: { transition: { staggerChildren: 0.06 } },
    hover: { transition: { staggerChildren: 0.05 } },
}

const dotVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    rest: { opacity: 1, scale: 1, y: 0, backgroundColor: 'rgba(0,0,0,0.22)' },
    hover: { opacity: 1, scale: 1, y: -3, backgroundColor: '#1400FF' },
}

const labelVariants: Variants = {
    hidden: { opacity: 0, x: -6 },
    rest: { opacity: 1, x: 0, color: 'rgba(0,0,0,0.45)' },
    hover: { opacity: 1, x: 0, color: '#1400FF' },
}

interface Props {
    teamSize: number
    size?: 'sm' | 'lg'
    active?: boolean
    intro?: boolean
}

export default function TeamSizeBadge({ teamSize, size = 'sm', active, intro = false }: Props) {
    const { t } = useTranslation()
    const isPersonal = teamSize <= 1
    const dots = isPersonal ? 1 : Math.min(teamSize, MAX_DOTS)
    const dotSize = size === 'lg' ? 9 : 6

    const label = isPersonal
        ? t('ui.project.personalProject')
        : `${teamSize} ${t('ui.project.members')}`

    const driver = intro
        ? { initial: 'hidden', whileInView: 'rest', whileHover: 'hover', viewport: { once: true } }
        : active !== undefined
            ? { initial: false as const, animate: active ? 'hover' : 'rest' }
            : {}

    return (
        <motion.span
            variants={groupVariants}
            {...driver}
            aria-label={label}
            style={{
                display: 'inline-flex', alignItems: 'center',
                gap: size === 'lg' ? 12 : 8,
            }}
        >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: size === 'lg' ? 5 : 4 }}>
                {Array.from({ length: dots }).map((_, i) => (
                    <motion.span
                        key={i}
                        variants={dotVariants}
                        transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                        style={{
                            display: 'block',
                            width: dotSize, height: dotSize,
                            borderRadius: isPersonal ? '50%' : 1,
                        }}
                    />
                ))}
            </span>
            <motion.span
                variants={labelVariants}
                transition={{ duration: 0.25 }}
                style={{
                    ...mono,
                    fontSize: size === 'lg' ? 11 : 10,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                }}
            >
                {label}
            </motion.span>
        </motion.span>
    )
}
