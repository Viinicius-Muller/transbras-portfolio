"use client"

import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import { deleteShipping } from "@/services/api"
import type { ListShippingDTO } from "@/types"
import { toast } from "sonner"

function formatDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

interface Props {
  shippings: ListShippingDTO[]
  loading: boolean
  onNew: () => void
  onEdit: (item: ListShippingDTO) => void
  onRefresh: () => void
}

export function ShippingsSection({ shippings, loading, onNew, onEdit, onRefresh }: Props) {
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this shipping?")) return
    try {
      await deleteShipping(id)
      toast.success("Shipping deleted.")
      onRefresh()
    } catch {
      toast.error("Failed to delete shipping.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#3B3B3B]/60">
          {shippings.length} shipping{shippings.length !== 1 ? "s" : ""}
        </p>
        <button
          type="button"
          onClick={onNew}
          className="inline-flex items-center gap-2 rounded-lg bg-[#6C6E36] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7a7d3d] hover:shadow-lg"
        >
          <Plus className="h-4 w-4" />
          New Shipping
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-xl bg-white py-20 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-[#675647]/40" />
        </div>
      ) : (
        <div className="rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#DFD3B5]/40">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Cargo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Weight</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Distance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Scheduled</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shippings.map((s) => (
                  <tr key={s.id} className="border-b border-[#DFD3B5]/30 last:border-0 transition-colors hover:bg-[#DFD3B5]/10">
                    <td className="px-6 py-4 text-sm font-medium text-[#675647]">{s.id}</td>
                    <td className="px-6 py-4 text-sm text-[#3B3B3B]/70">{s.from}</td>
                    <td className="px-6 py-4 text-sm text-[#3B3B3B]/70">{s.to}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[#675647]/10 px-3 py-1 text-xs font-medium text-[#675647]">{s.cargoType}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#3B3B3B]/70">{s.weight.toLocaleString("pt-BR")} kg</td>
                    <td className="px-6 py-4 text-sm text-[#3B3B3B]/70">{s.distance.toLocaleString("pt-BR")} km</td>
                    <td className="px-6 py-4 text-sm text-[#3B3B3B]/70">{formatDate(s.scheduledDate)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onEdit(s)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#DFD3B5]/30 px-3 py-1.5 text-xs font-medium text-[#675647] transition-colors hover:bg-[#DFD3B5]/50"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(s.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {shippings.length === 0 && !loading && (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center text-sm text-[#3B3B3B]/60">No shippings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
