import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/home/hero"
import { Advantages } from "@/components/home/advantages"
import { HowItWorks } from "@/components/home/how-it-works"
import { CTA } from "@/components/home/cta"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Advantages />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
