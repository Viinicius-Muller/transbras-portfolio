"use client"

import Link from "next/link"
import { FadeIn } from "@/components/motion"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="bg-[#675647] py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <FadeIn>
          <h2 className="mb-6 text-balance text-3xl font-bold text-[#DFD3B5] md:text-5xl">
            Ready to ship with confidence?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#C0BDBC]">
            Join hundreds of companies that trust TransBras for their logistics
            needs. Get a quote today and experience premium transportation
            services.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-lg bg-[#6C6E36] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#7a7d3d] hover:shadow-lg hover:shadow-[#6C6E36]/20"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-[#DFD3B5]/20 bg-transparent px-8 py-4 text-sm font-semibold text-[#DFD3B5] transition-all hover:border-[#DFD3B5]/40 hover:bg-[#DFD3B5]/10"
            >
              Learn More
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
