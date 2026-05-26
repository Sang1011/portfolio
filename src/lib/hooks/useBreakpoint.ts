import { useEffect, useState } from 'react'

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
} as const

type Breakpoint = keyof typeof BREAKPOINTS

export function useIsMobile(breakpoint: Breakpoint = 'md'): boolean {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false
        return window.innerWidth < BREAKPOINTS[breakpoint]
    })

    useEffect(() => {
        const px = BREAKPOINTS[breakpoint]
        const check = () => setIsMobile(window.innerWidth < px)
        // Gọi lại một lần nữa trong effect để đồng bộ sau hydration
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [breakpoint])

    return isMobile
}