"use client"

import { FadeIn } from "@/components/motion"
import { User } from "lucide-react"

const leader =
{
  name: "André Vinicius Müller",
  role: "Full-Stack Developer",
  bio: "Full-Stack Developer with over 2 years of programming experience. Strong knowledge of Java with Spring Boot and React with Next.js. Experience in DevOps and infrastructure using Docker, Kubernetes and Azure.",
}

export function Leadership() {
  return (
    <section className="bg-[#DFD3B5]/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-[#6C6E36]">
            Our Great Leader
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[#675647] md:text-4xl">
            Meet the Developer
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-[#3B3B3B]/70">
            Experienced brazillian Full-Stack developer in Rio Negrinho, SC - Brazil.
          </p>
        </FadeIn>

        <div className="grid gap-8 mx-80">
          <FadeIn key={leader.name} delay={.2}>
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#675647]">
                <User className="h-10 w-10 text-[#E3BD90]" />
              </div>
              <h3 className="mb-1 font-semibold text-[#675647] text-lg">
                {leader.name}
              </h3>
              <p className="mb-4 text-m font-medium text-[#6C6E36]">
                {leader.role}
              </p>
              <p className="text-lg leading-8 text-[#3B3B3B]/70">
                {leader.bio}
              </p>
              <p className="mt-4 text-[#27272A]/70"> Links to Social Media above</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
