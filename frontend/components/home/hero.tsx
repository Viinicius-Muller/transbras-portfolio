"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Package, Truck, MapPin, Shield } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#675647]">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:py-0">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E3BD90]/30 bg-[#E3BD90]/10 px-4 py-1.5 text-sm font-medium text-[#E3BD90]">
                <Package className="h-4 w-4" />
                Premium Logistics Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mb-6 text-balance text-4l font-bold leading-tight text-[#DFD3B5] md:text-4l lg:text-5xl"
            >
              <span className="text-[#E3BD90]">TransBras</span>{" "}
              Connecting Brazil, Delivering Excellence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-10 max-w-lg text-lg leading-relaxed text-[#C0BDBC]"
            >
              Nationwide logistics solutions with real-time tracking, secure cargo
              handling, and reliable partnerships across all 26 Brazilian states.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-lg bg-[#6C6E36] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#7a7d3d] hover:shadow-lg hover:shadow-[#6C6E36]/20"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/shippings"
                className="rounded-lg border border-[#DFD3B5]/20 bg-transparent px-8 py-3.5 text-sm font-semibold text-[#DFD3B5] transition-all hover:border-[#DFD3B5]/40 hover:bg-[#DFD3B5]/10"
              >
                View Shippings
              </Link>
            </motion.div>
          </div>

          {/* Right side - feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Truck, title: "800+ Vehicles", desc: "Modern fleet" },
                { icon: MapPin, title: "26 States", desc: "Full coverage" },
                { icon: Shield, title: "Secure Cargo", desc: "100% insured" },
                { icon: Package, title: "10K+ Deliveries", desc: "And counting" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  className="rounded-xl border border-[#E3BD90]/15 bg-[#DFD3B5]/5 p-6 backdrop-blur-sm transition-all hover:bg-[#DFD3B5]/10"
                >
                  <item.icon className="mb-3 h-7 w-7 text-[#E3BD90]" />
                  <p className="font-semibold text-[#DFD3B5]">{item.title}</p>
                  <p className="text-sm text-[#C0BDBC]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[#C0BDBC]/60">Scroll Down</span>
          <div className="h-10 w-5 rounded-full border-2 border-[#C0BDBC]/30 p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-[#E3BD90]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
