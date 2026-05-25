export type TechTag =
    | 'React' | 'React Native' | 'Next.js' | 'TypeScript' | 'JavaScript'
    | 'C#' | '.NET' | 'ASP.NET' | 'Node.js' | 'NestJS'
    | 'TailwindCSS' | 'SQL Server' | 'PostgreSQL' | 'MongoDB'
    | 'Redis' | 'Docker' | 'Azure' | 'REST API' | 'SignalR'
    | 'Cloudinary' | 'JWT' | 'WebSocket' | 'EmailJS'
    | 'Leaflet.js' | 'OpenStreetMap' | 'Redux' | 'AntD'
    | 'Firebase' | 'Recharts' | 'React-Konva' | 'DnD Kit' | 'VNPay'
    | 'Expo' | 'Expo Camera' | 'Expo Router'

export type ProjectRole = 'FE' | 'BE' | 'Fullstack' | 'Mobile'
export type ProjectStatus = 'live' | 'ui-only' | 'private'
export type GalleryType = 'desktop' | 'mobile' | 'mixed'
export type Locale = 'en' | 'vi'

export const personal = {
    name: 'Nguyễn Hoàng Tuệ Sang',
    handle: '@sang1011',
    location: 'Ho Chi Minh City, VN',
    links: {
        github: 'https://github.com/Sang1011',
        linkedin: 'https://www.linkedin.com/in/tue-sang',
        email: 'nguyenhoangtuesang@gmail.com',
        portfolio: 'https://portfolio-delta-fawn-10.vercel.app',
    },
    phone: '0977064053',
    address: 'Tỉnh lộ 8, Ấp 20, xã Phú Hòa Đông, Củ Chi, TP.HCM',
    bio: "FPT University graduate in Software Engineering (.NET track). Spent most of my real-world time on the frontend — React, Next.js, and everything UI. Can wire up the backend when needed (NestJS, .NET), but frontend is where I feel most at home.",
    bioArray: [
        "FPT University graduate in Software Engineering (.NET track). Spent most of my real-world time on the frontend — React, Next.js, and everything UI.",
        "Can wire up the backend when needed (NestJS, .NET), but frontend is where I feel most at home."
    ],
    title: "Fullstack Developer",
    available: "Open to Work",
    stats: [
        { label: "Role", value: "Fullstack / FE Focused" },
        { label: "Location", value: "HCM City, VN" },
        { label: "Status", value: "Open to Work" },
        { label: "Stack", value: "React · NextJS · NestJS · ASP.NET" }
    ]
}

export const skillGroups = [
    {
        label: 'Frontend',
        skills: ['React', 'Next.js', 'React Native', 'TypeScript', 'JavaScript', 'TailwindCSS', 'SCSS', 'Redux', 'Framer Motion'],
    },
    {
        label: 'Backend',
        skills: ['C#', 'ASP.NET Core', 'NestJS', 'Node.js', 'Express.js', 'REST API', 'WebSocket', 'SignalR'],
    },
    {
        label: 'Database',
        skills: ['SQL Server', 'PostgreSQL', 'MongoDB', 'Prisma'],
    },
    {
        label: 'Tooling & Cloud',
        skills: ['Docker', 'Git', 'GitHub', 'GitLab', 'Firebase', 'Vercel', 'Railway', 'Postman', 'Figma'],
    },
]

export const TAGS = [
    ...new Set(skillGroups.flatMap(g => g.skills))
].slice(0, 10)

export interface ExperienceProject {
    name: string
    description: string
    contributions: string[]
    tech: TechTag[]
}

export interface Experience {
    company: string
    period: string
    role: string
    projects: ExperienceProject[]
}

export const experiences: Experience[] = [
    {
        company: 'CEH Information Services Company Limited',
        period: 'Jan 2025 – Apr 2025',
        role: 'Frontend Intern',
        projects: [
            {
                name: 'VTOS — Vietnam Terminal Operation System',
                description: 'Port, container, and yard management system for the logistics domain.',
                contributions: [
                    "Designed and developed responsive UI components for a port, container, and yard management system in the logistics domain.",
                    "Integrated RESTful APIs into the frontend, handling data fetching, transformation, and state management across complex logistics workflows.",
                    "Implemented interactive map features using Leaflet.js and OpenStreetMap, including real-time truck routing visualization and vessel tracking.",
                    "Participated in code reviews, UI validation, and frontend contributions following team conventions under senior guidance."
                ],
                tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Redux', 'Leaflet.js', 'OpenStreetMap', 'AntD'],
            },
            {
                name: 'VASSCM — VietNam Automated System for Seaport Customs Management',
                description: 'Customs declaration management system for import/export yard reporting and logistics workflows.',
                contributions: [
                    "Developed and maintained UI for customs declaration management, import/export yard reporting, and related logistics workflows.",
                    "Handled frontend business logic including state management with Redux, form validation, and RESTful API integration.",
                    "Reviewed and edited API documentation (Google Docs, Word) to ensure accuracy and clarity before handoff to the Backend team.",
                    "Participated in code reviews and contributions following team conventions under senior guidance."
                ],
                tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Redux', 'AntD'],
            },
        ],
    },
]

export const education = {
    school: 'FPT University — Ho Chi Minh City Campus',
    period: 'Sep 2022 – Apr 2026',
    degree: 'Bachelor of Software Engineering',
    major: 'Specializing in .NET Development',
    gpa: '3.5 / 4.0',
}

export interface ProjectMeta {
    id: string
    slug: string
    title: string
    subtitle: string
    year: number
    period: string
    role: ProjectRole[]
    tech: TechTag[]
    status: ProjectStatus
    images: string[]
    thumbnail: string
    galleryType: GalleryType
    links: {
        github?: string
        githubFE?: string
        githubBE?: string
        githubMobile?: string
        demo?: string
        apk?: string
        landing?: string
    }
    featured: boolean
}

export const projects: ProjectMeta[] = [
    {
        id: 'bookingcare',
        slug: 'bookingcare',
        title: 'BookingCare',
        subtitle: 'Online Medical Appointment Booking API',
        galleryType: 'desktop',
        year: 2026,
        period: 'Mar 2026 – Present',
        role: ['BE'],
        tech: ['C#', 'ASP.NET', 'PostgreSQL', 'Redis', 'Docker', 'JWT'],
        status: 'private',
        images: [],
        thumbnail: '',
        links: {
            github: 'https://github.com/Sang1011/BookingCare',
        },
        featured: true,
    },
    {
        id: 'aipromo',
        slug: 'aipromo',
        title: 'AIPromo',
        subtitle: 'Smart Marketing & Digital Ticketing Platform — Capstone Project',
        galleryType: 'mixed',
        year: 2026,
        period: 'Jan 2026 – Apr 2026',
        role: ['FE', 'Mobile'],
        tech: ['React', 'TypeScript', 'TailwindCSS', 'Redux', 'React Native', 'Firebase', 'Recharts', 'React-Konva', 'DnD Kit', 'VNPay'],
        status: 'live',
        images: [
            '/projects/aipromo/1.png',
            '/projects/aipromo/2.png',
            '/projects/aipromo/3.png',
            '/projects/aipromo/4.png',
            '/projects/aipromo/5.png',
            '/projects/aipromo/6.png',
        ],
        thumbnail: '/projects/aipromo/1.png',
        links: {
            demo: 'https://aipromo.online/',
            github: 'https://github.com/Sang1011/AIPromo-Web',
            apk: 'https://apkpure.com/p/com.sangnguyen1011.aipromomobile',
        },
        featured: true,
    },
    {
        id: 'smartcalo',
        slug: 'smartcalo',
        title: 'SmartCalo',
        subtitle: 'Nutrition & Calorie Management App',
        galleryType: 'mobile',
        year: 2025,
        period: 'Oct 2025 – Nov 2025',
        role: ['Mobile'],
        tech: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Firebase', 'Expo Camera', 'Expo Router'],
        status: 'live',
        images: [
            '/projects/smartcalo/1.webp',
            '/projects/smartcalo/2.webp',
            '/projects/smartcalo/3.webp',
            '/projects/smartcalo/4.webp',
            '/projects/smartcalo/5.webp',
        ],
        thumbnail: '/projects/smartcalo/image.png',
        links: {
            github: 'https://github.com/Sang1011/SmartCaloFE',
            apk: 'https://apkpure.com/smart-calo/com.penta.smartcalo',
            landing: 'https://smartcalo-landingpage.vercel.app/',
        },
        featured: true,
    },
    {
        id: 'blooddonation',
        slug: 'blooddonation',
        title: 'BloodDonation',
        subtitle: 'Blood Donation & Logistics Management System',
        galleryType: 'desktop',
        year: 2025,
        period: 'May 2025 – Jul 2025',
        role: ['Fullstack', 'Mobile'],
        tech: ['TypeScript', 'NestJS', 'MongoDB', 'Docker', 'Cloudinary', 'JWT', 'WebSocket', 'EmailJS', 'Redis'],
        status: 'private',
        images: [],
        thumbnail: '',
        links: {
            github: 'https://github.com/Sang1011/BloodDonation-BE',
            githubFE: 'https://github.com/lvstants/BloodDonationASS',
            demo: 'https://blood-donation-ass.vercel.app/'
        },
        featured: true,
    },
    {
        id: 'tiny-survivor',
        slug: 'tiny-survivor',
        title: 'Tiny Survivor',
        subtitle: 'Action RPG Rogue-like Game',
        galleryType: 'desktop',
        period: 'May 2025 – Jul 2025',
        year: 2025,
        role: ['Fullstack'],
        tech: ['C#'],
        status: 'private',
        images: [
            '/projects/tiny-survivor/image.png',
        ],
        thumbnail: '/projects/tiny-survivor/image.png',
        links: {
            github: 'https://github.com/Sang1011/Tiny-Survivors',
        },
        featured: true,
    },
]

export const roleLabel: Record<ProjectRole, string> = {
    FE: 'Frontend',
    BE: 'Backend',
    Fullstack: 'Fullstack',
    Mobile: 'Mobile',
}

export const statusLabel: Record<ProjectStatus, string> = {
    live: '● Live',
    'ui-only': '○ UI Only',
    private: '○ Private',
}

export const getProjectBySlug = (slug: string) =>
    projects.find((p) => p.slug === slug)

export const getFeaturedProjects = () =>
    projects.filter((p) => p.featured)

export const getProjectsByRole = (role: ProjectRole) =>
    projects.filter((p) => p.role.includes(role))