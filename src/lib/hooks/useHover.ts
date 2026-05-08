import { useEffect, useRef, useState } from "react"

export function useHover<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [hovered, setHovered] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const on = () => setHovered(true)
        const off = () => setHovered(false)
        el.addEventListener('mouseenter', on)
        el.addEventListener('mouseleave', off)
        return () => { el.removeEventListener('mouseenter', on); el.removeEventListener('mouseleave', off) }
    }, [])
    return [ref, hovered] as const
}