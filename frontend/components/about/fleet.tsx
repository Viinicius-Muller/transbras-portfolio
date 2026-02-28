"use client"

import Image from "next/image"
import { FadeIn } from "@/components/motion"
import { Truck, Warehouse, Users, MapPin } from "lucide-react"

const infrastructure = [
  { icon: Truck, value: "800+", label: "Vehicles" },
  { icon: Warehouse, value: "15", label: "Distribution Centers" },
  { icon: Users, value: "3,000+", label: "Employees" },
  { icon: MapPin, value: "26", label: "States Covered" },
]

export function Fleet() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <FadeIn direction="left">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-[#6C6E36]">
              Our Infrastructure
            </span>
            <h2 className="mb-6 text-3xl font-bold text-[#675647] md:text-4xl">
              Fleet & Infrastructure Overview
            </h2>
            <p className="mb-10 leading-relaxed text-[#3B3B3B]/70">
              Our modern fleet and strategically located distribution centers
              ensure fast, efficient delivery across the entire Brazilian
              territory. We invest continuously in new technology and equipment
              to maintain the highest standards.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {infrastructure.map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.1}>
                  <div className="rounded-xl bg-[#DFD3B5]/30 p-5">
                    <item.icon className="mb-2 h-6 w-6 text-[#6C6E36]" />
                    <p className="text-2xl font-bold text-[#675647]">
                      {item.value}
                    </p>
                    <p className="text-sm text-[#3B3B3B]/60">
                      {item.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/group-of-trucks.jpg"
                alt="TransBras fleet of trucks"
                width={640}
                height={480}
                className="w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
