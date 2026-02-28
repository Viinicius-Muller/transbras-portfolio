"use client"

import Image from "next/image"
import { FadeIn } from "@/components/motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Ana Clara Silva",
    role: "Operations Manager, VerdeFresh",
    image: "/images/testimonial-1.jpg",
    text: "TransBras transformed our supply chain. Deliveries that used to take a week now arrive in two days. Their tracking system gives us complete visibility.",
    stars: 5,
  },
  {
    name: "Roberto Mendes",
    role: "CEO, TechParts Brasil",
    image: "/images/testimonial-2.jpg",
    text: "We've been working with TransBras for three years. Their reliability is unmatched. Zero lost shipments and always on time, even during peak seasons.",
    stars: 5,
  },
  {
    name: "Lucas Oliveira",
    role: "Logistics Director, AgroBrasil",
    image: "/images/testimonial-3.jpg",
    text: "The partnership with TransBras allowed us to expand to the entire North region. Their coverage and infrastructure are truly impressive.",
    stars: 5,
  },
]

export function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-[#6C6E36]">
            Testimonials
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-[#675647] md:text-4xl">
            Trusted by Companies Across Brazil
          </h2>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <div className="rounded-2xl border border-[#DFD3B5] bg-white p-8 transition-all duration-300 hover:shadow-lg">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-[#E3BD90] text-[#E3BD90]"
                    />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-[#3B3B3B]/70">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={t.image || "/placeholder.svg"}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#675647]">
                      {t.name}
                    </p>
                    <p className="text-sm text-[#3B3B3B]/60">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
