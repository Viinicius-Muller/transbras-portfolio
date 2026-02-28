"use client"

import { Shield, MapPin, Satellite, Handshake } from "lucide-react"
import { FadeIn } from "@/components/motion"

const advantages = [
  {
    icon: MapPin,
    title: "Nationwide Coverage",
    description:
      "Operating across all 26 Brazilian states, we deliver to every corner of the country with consistent quality and reliability.",
  },
  {
    icon: Shield,
    title: "Secure Cargo Handling",
    description:
      "State-of-the-art security systems and trained personnel ensure your cargo arrives safely and intact, every single time.",
  },
  {
    icon: Satellite,
    title: "Real-Time Tracking",
    description:
      "Monitor your shipments 24/7 with our advanced GPS tracking system. Know exactly where your cargo is at all times.",
  },
  {
    icon: Handshake,
    title: "Reliable Partnerships",
    description:
      "We build long-term relationships with our clients based on trust, transparency, and consistent performance.",
  },
]

export function Advantages() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-[#6C6E36]">
            Why Choose Us
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-[#675647] md:text-4xl">
            We guarantee fast and safe transport for your packages
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-[#3B3B3B]/70">
            TransBras combines cutting-edge technology with decades of
            experience to deliver unmatched logistics services across Brazil.
          </p>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((adv, i) => (
            <FadeIn key={adv.title} delay={i * 0.1}>
              <div className="group rounded-2xl border border-[#DFD3B5] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#E3BD90] hover:shadow-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#675647]/5 text-[#675647] transition-colors group-hover:bg-[#6C6E36] group-hover:text-white">
                  <adv.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#675647]">
                  {adv.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#3B3B3B]/70">
                  {adv.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
