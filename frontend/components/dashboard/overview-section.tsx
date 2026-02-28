import { cn } from "@/lib/utils"
import type { ListShippingDTO } from "@/types"
import type { ElementType } from "react"

interface Metric {
  label: string
  value: number
  icon: ElementType
  color: string
  iconColor: string
}

function formatDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export function OverviewSection({ metrics, shippings }: { metrics: Metric[]; shippings: ListShippingDTO[] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#3B3B3B]/60">{m.label}</p>
                <p className="mt-1 text-3xl font-bold text-[#675647]">{m.value}</p>
              </div>
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", m.color)}>
                <m.icon className={cn("h-6 w-6", m.iconColor)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        <div className="border-b border-[#DFD3B5]/40 px-6 py-4">
          <h2 className="font-semibold text-[#675647]">Recent Shippings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#DFD3B5]/40">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Cargo</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Scheduled</th>
              </tr>
            </thead>
            <tbody>
              {shippings.slice(0, 5).map((s) => (
                <tr key={s.id} className="border-b border-[#DFD3B5]/30 last:border-0 transition-colors hover:bg-[#DFD3B5]/10">
                  <td className="px-6 py-4 text-sm font-medium text-[#675647]">{s.id}</td>
                  <td className="px-6 py-4 text-sm text-[#3B3B3B]/70">{s.from} &rarr; {s.to}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#675647]/10 px-3 py-1 text-xs font-medium text-[#675647]">{s.cargoType}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#3B3B3B]/70">{s.weight.toLocaleString("en-US")} kg</td>
                  <td className="px-6 py-4 text-sm text-[#3B3B3B]/70">{formatDate(s.scheduledDate)}</td>
                </tr>
              ))}
              {shippings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#3B3B3B]/60">No shippings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
