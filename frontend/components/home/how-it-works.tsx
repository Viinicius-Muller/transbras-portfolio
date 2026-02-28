"use client"

import { FadeIn } from "@/components/motion"
import { ClipboardList, Route, Truck, PackageCheck } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Request a Shipment",
    description:
      "Fill out our simple form with your cargo details and preferred schedule.",
  },
  {
    icon: Route,
    step: "02",
    title: "Route Planning",
    description:
      "Our logistics experts plan the most efficient and safe route for your cargo.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Cargo in Transit",
    description:
      "Track your shipment in real-time as our fleet transports it to the destination.",
  },
  {
    icon: PackageCheck,
    step: "04",
    title: "Safe Delivery",
    description:
      "Receive your cargo on time and intact, with confirmation and documentation.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-[#DFD3B5]/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-[#6C6E36]">
            Our Process
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-[#675647] md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-[#3B3B3B]/70">
            A streamlined process from request to delivery, ensuring maximum
            efficiency and transparency at every step.
          </p>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <FadeIn key={s.step} delay={i * 0.12}>
              <div className="relative rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="mb-4 block text-5xl font-bold text-[#675647]/10">
                  {s.step}
                </span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6C6E36] text-white">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#675647]">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#3B3B3B]/70">
                  {s.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden h-0.5 w-8 bg-[#E3BD90]/30 lg:block" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
