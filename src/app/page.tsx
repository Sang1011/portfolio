import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import AboutPreviewSection from "@/components/AboutPreviewSection"
import ProjectsPreviewSection from "@/components/ProjectsPreviewSection"
import ContactSection from "@/components/ContactSection"
import SectionTracker from "@/components/SectionTracker"
import type { TrackerSection } from "@/components/SectionTracker"

const HOME_SECTIONS: TrackerSection[] = [
  { id: 'hero', labelKey: 'home' },
  { id: 'about-preview', labelKey: 'about' },
  { id: 'projects-preview', labelKey: 'projects' },
  { id: 'contact', labelKey: 'contact' },
]

export default function Home() {
  return (
    <main>
      <SectionTracker sections={HOME_SECTIONS} />
      <HeroSection />
      <AboutPreviewSection />
      <ProjectsPreviewSection />
      <ContactSection />
    </main>
  )

}