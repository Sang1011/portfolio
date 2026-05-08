// ============================================================
// TYPES
// ============================================================

export type TechTag =
    | 'React' | 'React Native' | 'Next.js' | 'TypeScript' | 'JavaScript'
    | 'C#' | '.NET' | 'ASP.NET' | 'Node.js' | 'NestJS'
    | 'TailwindCSS' | 'SQL Server' | 'PostgreSQL' | 'MongoDB'
    | 'Redis' | 'Docker' | 'Azure' | 'REST API' | 'SignalR'
    | 'NestJS' | 'Cloudinary' | 'JWT' | 'WebSocket' | 'EmailJS'
    | 'Leaflet.js' | 'OpenStreetMap' | 'Redux' | 'AntD'
    | 'Firebase' | 'Recharts' | 'React-Konva' | 'DnD Kit' | 'VNPay'
    | 'Expo' | 'Expo Camera' | 'Expo Router'

export type ProjectRole = 'FE' | 'BE' | 'Fullstack' | 'Mobile'

export type ProjectStatus = 'live' | 'ui-only' | 'private'

export interface Project {
    id: string
    slug: string
    title: string
    subtitle: string
    description: string
    year: number
    period: string
    role: ProjectRole
    myContributions: string[]
    tech: TechTag[]
    status: ProjectStatus
    images: string[]
    thumbnail: string
    galleryType: GalleryType
    links: {
        github?: string
        demo?: string
        apk?: string
        landing?: string
    }
    featured: boolean
}

export interface SkillGroup {
    label: string
    skills: string[]
}

export interface Experience {
    company: string
    role: string
    period: string
    projects: {
        name: string
        description: string
        tech: TechTag[]
        contributions: string[]
    }[]
}

// ============================================================
// PERSONAL INFO
// ============================================================
export const personal = {
    name: 'Nguyễn Hoàng Tuệ Sang',
    handle: '@sang1011',
    title: 'Fullstack Developer',
    focus: 'FE-Focused',
    bio: `FPT University graduate in Software Engineering (.NET track).
        Spent most of real-world time on the frontend — React, Next.js,
        and everything UI. Can wire up the backend when needed (NestJS, .NET).`,
    bioArray: [
        'FPT University graduate in Software Engineering (.NET track). Spent most of my real-world time on the frontend — React, Next.js, and everything UI.',
        'Can wire up the backend when needed (NestJS, .NET), but frontend is where I feel most at home.',
    ],
    location: 'Ho Chi Minh City, VN',
    available: true,
    links: {
        github: 'https://github.com/Sang1011',
        linkedin: 'https://www.linkedin.com/in/tue-sang',
        email: 'nguyenhoangtuesang@gmail.com',
    },
    stats: [
        { label: 'Role', value: 'Fullstack / FE Focused' },
        { label: 'Location', value: 'HCM City, VN' },
        { label: 'Status', value: 'Open to Work' },
        { label: 'Stack', value: 'React · NextJS · NestJS · .NET' },
    ]
}

// ============================================================
// SKILLS
// ============================================================

export const skillGroups: SkillGroup[] = [
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
    ...new Set(
        skillGroups.flatMap(group => group.skills)
    )
].slice(0, 10)

// ============================================================
// EXPERIENCE
// ============================================================

export const experiences: Experience[] = [
    {
        company: 'CEH Information Services Company Limited',
        role: 'Frontend Intern',
        period: 'Jan 2025 – Apr 2025',
        projects: [
            {
                name: 'VTOS — Vietnam Terminal Operation System',
                description: 'Port, container, and yard management system for the logistics domain.',
                tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Redux'],
                contributions: [
                    'Designed and developed responsive UI components for a port, container, and yard management system in the logistics domain.',
                    'Integrated RESTful APIs into the frontend, handling data fetching, transformation, and state management across complex logistics workflows.',
                    'Implemented interactive map features using Leaflet.js and OpenStreetMap, including real-time truck routing visualization and vessel tracking.',
                    'Participated in code reviews, UI validation, and frontend contributions following team conventions under senior guidance.',
                ],
            },
            {
                name: 'VASSCM — VietNam Automated System for Seaport Customs Management',
                description: 'Customs declaration management system for import/export yard reporting and logistics workflows.',
                tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Redux'],
                contributions: [
                    'Developed and maintained UI for customs declaration management, import/export yard reporting, and related logistics workflows.',
                    'Handled frontend business logic including state management with Redux, form validation, and RESTful API integration.',
                    'Reviewed and edited API documentation (Google Docs, Word) to ensure accuracy and clarity before handoff to the Backend team.',
                    'Participated in code reviews and contributions following team conventions under senior guidance.',
                ],
            },
        ],
    },
]

// ============================================================
// EDUCATION
// ============================================================

export const education = {
    school: 'FPT University — Ho Chi Minh City Campus',
    degree: 'Bachelor of Software Engineering',
    major: 'Specializing in .NET Development',
    period: 'Sep 2022 – Apr 2026',
    gpa: '3.2 / 4.0',
}

// ============================================================
// PROJECTS
// ============================================================

type GalleryType = 'desktop' | 'mobile' | 'mixed'

export const projects: Project[] = [
    {
        id: 'aipromo',
        slug: 'aipromo',
        title: 'AIPromo',
        galleryType: 'mixed',
        subtitle: 'Smart Marketing & Digital Ticketing Platform — Capstone Project',
        description: `Full-stack event management platform with an interactive seat map editor, 
            AI marketing content editor, and mobile QR check-in app. Built as a capstone project 
            with a full team covering web, mobile, payment integration, and system architecture.`,
        year: 2026,
        period: 'Jan 2026 – Apr 2026',
        role: 'FE',
        myContributions: [
            'Built an interactive seat map editor using React-Konva, supporting drag-and-drop creation and editing of seats, zones, and sections for event layout configuration.',
            'Developed AI marketing content editor with drag-and-drop block reordering using DnD Kit.',
            'Integrated VNPay payment gateway for ticket purchases and organizer wallet top-ups, including AI package subscription management.',
            'Implemented Firebase Realtime Database for order expiry tracking, triggering automatic order cancellation after 15 minutes via cron job.',
            'Developed organizer dashboard with event analytics and reporting using Recharts.',
            'Built React Native mobile app for on-site QR code check-in and event operations.',
            'Participated in database design and system architecture planning.',
            'Integrated docx-preview for in-app policy document rendering.',
        ],
        tech: ['React', 'TypeScript', 'TailwindCSS', 'Redux', 'React Native', 'Firebase', 'Recharts', 'React-Konva', 'DnD Kit', 'VNPay'],
        status: 'live',
        images: [
            "/projects/aipromo/1.png",
            "/projects/aipromo/2.png",
            "/projects/aipromo/3.png",
            "/projects/aipromo/4.png",
            "/projects/aipromo/5.png",
            "/projects/aipromo/6.png",
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
        galleryType: 'mobile',
        subtitle: 'Nutrition & Calorie Management App',
        description: `A full-featured React Native mobile app for calorie tracking, nutrition management, 
            and personalized meal planning. Features AI-powered food recognition via camera, TDEE calculation, 
            and progress tracking with visual charts.`,
        year: 2025,
        period: 'Oct 2025 – Nov 2025',
        role: 'Mobile',
        myContributions: [
            'Built a full-featured mobile app for calorie tracking, nutrition management, and personalized meal planning.',
            'Integrated AI-powered food recognition via camera to automatically identify dishes and calculate calories and macronutrients.',
            'Implemented TDEE calculation and dynamic macro allocation based on user body metrics and fitness goals.',
            'Developed progress tracking with visual charts using React Native Gifted Charts.',
            'Integrated push notifications and calendar-based meal planning.',
        ],
        tech: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Firebase', 'Expo Camera', 'Expo Router'],
        status: 'live',
        images: [
            "/projects/smartcalo/1.webp",
            "/projects/smartcalo/2.webp",
            "/projects/smartcalo/3.webp",
            "/projects/smartcalo/4.webp",
            "/projects/smartcalo/5.webp",
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
        galleryType: 'desktop',
        subtitle: 'Blood Donation & Logistics Management System',
        description: `Backend API system for end-to-end blood donation lifecycle management — 
            from donor registration and donation scheduling to blood inventory, transport logistics, 
            and real-time hospital blood requests. Built with NestJS and deployed via Docker/Railway.`,
        year: 2025,
        period: 'May 2025 – Jul 2025',
        role: 'BE',
        myContributions: [
            'Designed and implemented a RESTful API for end-to-end blood donation lifecycle management, covering donor registration, donation scheduling, blood inventory tracking, and hospital blood requests.',
            'Built a Central Blood Storage module managing hospital and mobile blood banks, including CRUD operations, blood expiry tracking, and real-time status updates (available, in-use, expired).',
            'Developed a Blood Export & Logistics module to handle transport orders from central storage to mobile/hospital units, with shipment status tracking (In Transit, Delivered, Expired).',
            'Implemented real-time push notifications via WebSocket Gateway to alert staff on blood expiry and new availability; integrated EmailJS for automated email verification and notifications.',
            'Integrated an AI Chatbot to assist donors and staff with blood donation FAQs, medical eligibility, and process guidance.',
            'Built a Geolocation-powered Search module to find nearest blood storage by GPS coordinates, filter by blood type, and query by province/city.',
            'Implemented JWT-based authentication with Refresh Token rotation, password hashing, email verification, and role-based access control (Admin, Donor, Receiver, Doctor).',
            'Deployed using Docker with CI/CD pipeline configuration and cloud hosting on Railway.',
        ],
        tech: ['TypeScript', 'NestJS', 'MongoDB', 'Docker', 'Cloudinary', 'JWT', 'WebSocket', 'EmailJS', 'Redis'],
        status: 'private',
        images: [],
        thumbnail: '',
        links: {
            github: 'https://github.com/Sang1011/BloodDonation-BE',
        },
        featured: true,
    },
]

// ============================================================
// HELPERS
// ============================================================

export const getProjectBySlug = (slug: string) =>
    projects.find((p) => p.slug === slug)

export const getFeaturedProjects = () =>
    projects.filter((p) => p.featured)

export const getProjectsByRole = (role: ProjectRole) =>
    projects.filter((p) => p.role === role)

export const statusLabel: Record<ProjectStatus, string> = {
    'live': 'Live',
    'ui-only': 'UI Only — No Live Demo',
    'private': 'Private Repo',
}

export const roleLabel: Record<ProjectRole, string> = {
    'FE': 'Frontend',
    'BE': 'Backend',
    'Fullstack': 'Fullstack',
    'Mobile': 'Mobile',
}