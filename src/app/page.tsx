import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import AboutPreviewSection from "@/components/AboutPreviewSection"
import ProjectsPreviewSection from "@/components/ProjectsPreviewSection"
import ContactSection from "@/components/ContactSection"
import SectionTracker from "@/components/SectionTracker"
import type { TrackerSection } from "@/components/SectionTracker"

const HOME_SECTIONS: TrackerSection[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about-preview', label: 'About' },
  { id: 'projects-preview', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
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