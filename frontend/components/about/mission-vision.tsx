"use client"

import { FadeIn } from "@/components/motion"
import { Target, Eye, Heart, Leaf } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Mission",
    text: "To provide innovative, reliable, and sustainable logistics solutions that empower Brazilian businesses to grow and compete globally.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "To be recognized as the most trusted and technologically advanced logistics partner in Latin America by 2030.",
  },
  {
    icon: Heart,
    title: "Values",
    text: "Integrity, innovation, customer-centricity, safety, and respect for our people and communities drive everything we do.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    text: "Committed to reducing our carbon footprint with a growing fleet of electric and hybrid vehicles, and carbon-neutral operations by 2035.",
  },
]

export function MissionVision() {
  return (
    <section className="bg-[#DFD3B5]/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-[#6C6E36]">
            What We Stand For
          </span>
          <h2 className="text-3xl font-bold text-[#675647] md:text-4xl">
            Mission, Vision & Values
          </h2>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.1}>
              <div className="flex gap-6 rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#6C6E36] text-white">
                  <v.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-[#675647]">
                    {v.title}
                  </h3>
                  <p className="leading-relaxed text-[#3B3B3B]/70">
                    {v.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
