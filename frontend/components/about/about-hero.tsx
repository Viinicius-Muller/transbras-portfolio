"use client"

import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="bg-[#675647] pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-[#E3BD90]">
            About TransBras
          </span>
          <h1 className="mb-6 text-balance text-4xl font-bold text-[#DFD3B5] md:text-5xl lg:text-6xl">
            Between the point of departure and destination, there is TransBras
          </h1>
          <p className="text-lg leading-relaxed text-[#C0BDBC]">
            For over two decades, we have been connecting businesses across
            Brazil with reliable, efficient, and secure transportation services.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
