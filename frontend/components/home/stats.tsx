"use client"

import { Counter, FadeIn } from "@/components/motion"

const stats = [
  { target: 10000, prefix: "+", suffix: "", label: "Deliveries" },
  { target: 26, prefix: "", suffix: "", label: "States Covered" },
  { target: 500, prefix: "+", suffix: "", label: "Active Partners" },
  { target: 98, prefix: "", suffix: "%", label: "On-Time Delivery" },
]

export function Stats() {
  return (
    <section className="bg-[#675647] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-[#E3BD90] md:text-5xl">
                  <Counter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-sm font-medium uppercase tracking-wider text-[#DFD3B5]/60">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
