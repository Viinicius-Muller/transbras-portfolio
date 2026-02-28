"use client"

import Image from "next/image"
import { FadeIn } from "@/components/motion"

export function History() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <FadeIn direction="left">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/trucks-street.jpg"
                alt="TransBras warehouse facility"
                width={640}
                height={480}
                className="w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3d3029] to-transparent p-8">
                <span className="text-3xl font-bold text-[#E3BD90]">
                  Since 2003
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-[#6C6E36]">
              Our Story
            </span>
            <h2 className="mb-6 text-3xl font-bold text-[#675647] md:text-4xl">
              Two decades of connecting Brazil
            </h2>
            <div className="space-y-4 leading-relaxed text-[#3B3B3B]/70">
              <p>
                Founded in 2003 in Sao Paulo by a group of logistics veterans,
                TransBras started with a fleet of just 12 trucks and a bold
                vision: to make reliable cargo transportation accessible to
                businesses of every size across Brazil.
              </p>
              <p>
                By 2010, we had expanded operations to cover all 26 states and
                the Federal District, establishing strategic hubs in Manaus,
                Recife, Belo Horizonte, and Porto Alegre. Our investment in
                technology and infrastructure positioned us as one of the
                fastest-growing logistics companies in Latin America.
              </p>
              <p>
                Today, TransBras operates a fleet of over 800 vehicles,
                maintains 15 distribution centers nationwide, and employs more
                than 3,000 professionals dedicated to delivering excellence
                every day.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
