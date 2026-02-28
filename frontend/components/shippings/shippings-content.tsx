"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, Loader2 } from "lucide-react"
import { fetchShippings } from "@/services/api"
import type { ListShippingDTO } from "@/types"
import { ShippingCard } from "./shipping-card"

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "distance-asc", label: "Distance: Low to High" },
  { value: "distance-desc", label: "Distance: High to Low" },
]

export function ShippingsContent() {
  const [allShippings, setAllShippings] = useState<ListShippingDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("newest")
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await fetchShippings()
        setAllShippings(data)
      } catch {
        // API unavailable — show empty state
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const cargoTypes = useMemo(() => {
    const types = new Set(allShippings.map((s) => s.cargoType))
    return ["All", ...Array.from(types).sort()]
  }, [allShippings])

  const [cargoFilter, setCargoFilter] = useState("All")

  const filtered = useMemo(() => {
    let result = [...allShippings]

    if (cargoFilter !== "All") {
      result = result.filter((s) => s.cargoType === cargoFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (s) =>
          s.from.toLowerCase().includes(q) ||
          s.to.toLowerCase().includes(q) ||
          String(s.id).includes(q)
      )
    }

    switch (sortBy) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.scheduledDate).getTime() -
            new Date(b.scheduledDate).getTime()
        )
        break
      case "distance-asc":
        result.sort((a, b) => a.distance - b.distance)
        break
      case "distance-desc":
        result.sort((a, b) => b.distance - a.distance)
        break
      default:
        result.sort(
          (a, b) =>
            new Date(b.scheduledDate).getTime() -
            new Date(a.scheduledDate).getTime()
        )
    }

    return result
  }, [allShippings, cargoFilter, sortBy, search])

  return (
    <>
      <section className="bg-[#675647] pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-[#E3BD90]">
              Available Shippings
            </span>
            <h1 className="mb-4 text-balance text-4xl font-bold text-[#DFD3B5] md:text-5xl">
              Find & Negotiate Shipments
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#C0BDBC]">
              Browse available shipping routes and make competitive offers.
              Connect with shippers across Brazil.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#DFD3B5]/30 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C0BDBC]" />
              <input
                type="text"
                placeholder="Search by route or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-[#DFD3B5] bg-[#DFD3B5]/20 py-2.5 pl-10 pr-4 text-sm text-[#3B3B3B] placeholder:text-[#C0BDBC] focus:border-[#6C6E36] focus:outline-none focus:ring-2 focus:ring-[#6C6E36]/20"
              />
            </div>
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-4 w-4 text-[#3B3B3B]/60" />
              <select
                value={cargoFilter}
                onChange={(e) => setCargoFilter(e.target.value)}
                className="rounded-lg border border-[#DFD3B5] bg-[#DFD3B5]/20 px-3 py-2.5 text-sm text-[#3B3B3B] focus:border-[#6C6E36] focus:outline-none"
              >
                {cargoTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-[#DFD3B5] bg-[#DFD3B5]/20 px-3 py-2.5 text-sm text-[#3B3B3B] focus:border-[#6C6E36] focus:outline-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center rounded-2xl bg-white py-20 shadow-sm">
              <Loader2 className="h-8 w-8 animate-spin text-[#675647]/40" />
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-[#3B3B3B]/60">
                Showing {filtered.length} shipment
                {filtered.length !== 1 ? "s" : ""}
              </p>

              {filtered.length === 0 ? (
                <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
                  <p className="text-lg font-medium text-[#675647]">
                    No shipments found
                  </p>
                  <p className="mt-2 text-sm text-[#3B3B3B]/60">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((shipping, i) => (
                    <ShippingCard
                      key={shipping.id}
                      shipping={shipping}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
