import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                blue: {
                    electric: '#1400FF',
                    bright: '#0A0AFF',
                    soft: '#8C8CFF',
                    muted: '#4040CC',
                },
                black: {
                    pure: '#0D0D0D',
                    deep: '#111111',
                    panel: '#1A1A1A',
                },
            },
            fontFamily: {
                sans: ['var(--font-space-grotesk)', 'sans-serif'],
                mono: ['var(--font-ibm-plex-mono)', 'monospace'],
            },
            fontSize: {
                'display-xl': ['clamp(4rem, 10vw, 10rem)', { lineHeight: '0.9' }],
                'display-lg': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '1' }],
            },
        },
    },
    plugins: [],
}

export default config