"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Handshake, Briefcase, AlertTriangle, MapPin, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { PartnershipForm } from "./partnership-form"
import { JobForm } from "./job-form"
import { ComplaintForm } from "./complaint-form"

const tabs = [
  { id: "partnership", label: "Work With Us", icon: Handshake },
  { id: "job", label: "Apply for a Job", icon: Briefcase },
  { id: "complaint", label: "Complaint", icon: AlertTriangle },
] as const

type TabId = (typeof tabs)[number]["id"]

export function ContactContent() {
  const [activeTab, setActiveTab] = useState<TabId>("partnership")

  return (
    <>
      <section className="bg-[#675647] pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-[#E3BD90]">
              Contact Us
            </span>
            <h1 className="mb-4 text-balance text-4xl font-bold text-[#DFD3B5] md:text-5xl">
              Get in Touch
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#C0BDBC]">
              Whether you want to partner with us, join our team, or share
              feedback, we are here to listen.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#DFD3B5]/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-8 flex flex-wrap gap-2 rounded-xl bg-white p-1.5 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-[#675647] text-[#DFD3B5] shadow-sm"
                        : "text-[#3B3B3B]/70 hover:bg-[#DFD3B5]/30"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <h2 className="mb-6 text-xl font-semibold text-[#675647]">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h2>
                {activeTab === "partnership" && <PartnershipForm />}
                {activeTab === "job" && <JobForm />}
                {activeTab === "complaint" && <ComplaintForm />}
              </motion.div>
            </div>

            <div>
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold text-[#675647]">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#6C6E36]/10">
                      <MapPin className="h-5 w-5 text-[#6C6E36]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#675647]">
                        Address
                      </p>
                      <p className="text-sm leading-relaxed text-[#3B3B3B]/70">
                        Av. Paulista, 1578 - Bela Vista
                        <br />
                        Sao Paulo - SP, 01310-200
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#6C6E36]/10">
                      <Phone className="h-5 w-5 text-[#6C6E36]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#675647]">
                        Phone
                      </p>
                      <p className="text-sm text-[#3B3B3B]/70">
                        +55 (11) 3456-7890
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#6C6E36]/10">
                      <Mail className="h-5 w-5 text-[#6C6E36]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#675647]">
                        Email
                      </p>
                      <p className="text-sm text-[#3B3B3B]/70">
                        contact@transbras.com.br
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-xl bg-[#675647] p-6">
                  <h4 className="mb-2 font-medium text-[#DFD3B5]">
                    Business Hours
                  </h4>
                  <div className="space-y-2 text-sm text-[#C0BDBC]">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-[#E3BD90]">
                        08:00 - 18:00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-[#E3BD90]">
                        08:00 - 12:00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-[#C0BDBC]/50">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
