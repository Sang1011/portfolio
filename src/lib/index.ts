const sectionVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as any,
        },
    },
}

const hoverLineVariants = {
    rest: { scaleX: 0, opacity: 0 },
    hover: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 0.35, ease: 'easeOut' as const },
    },
} as const

const arrowVariants = {
    rest: { x: 0, opacity: 0.55 },
    hover: {
        x: 8,
        opacity: 1,
        transition: { duration: 0.25 },
    },
}

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export { arrowVariants, hoverLineVariants, itemVariants, sectionVariants, scrollTo }