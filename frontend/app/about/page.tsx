import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { History } from "@/components/about/history"
import { MissionVision } from "@/components/about/mission-vision"
import { Fleet } from "@/components/about/fleet"
import { Leadership } from "@/components/about/leadership"

export const metadata = {
  title: "About - TransBras Logistica",
  description:
    "Learn about TransBras, our history, mission, and the team behind Brazil's most trusted logistics company.",
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <History />
        <MissionVision />
        <Fleet />
        <Leadership />
      </main>
      <Footer />
    </>
  )
}
