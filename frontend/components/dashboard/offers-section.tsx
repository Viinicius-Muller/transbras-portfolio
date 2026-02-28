"use client"

import { Loader2, Maximize2, Trash2, Check, Clock, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { deleteOffer, updateOfferStatus } from "@/services/api"
import type { ListOfferDTO, OfferStatus } from "@/types"
import type { DetailItem } from "./detail-panel"
import { DetailPanel } from "./detail-panel"
import { toast } from "sonner"

interface Props {
  offers: ListOfferDTO[]
  loading: boolean
  detailItem: DetailItem | null
  onSetDetailItem: (item: DetailItem | null) => void
  onRefresh: () => void
}

const statusColors: Record<OfferStatus, string> = {
  PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  ACCEPTED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
}

const rowBg: Record<OfferStatus, string> = {
  PENDING: "",
  ACCEPTED: "bg-green-50/30",
  REJECTED: "bg-red-50/30",
}

export function OffersSection({ offers, loading, detailItem, onSetDetailItem, onRefresh }: Props) {
  const handleStatus = async (id: number, status: OfferStatus) => {
    try {
      await updateOfferStatus(id, status)
      toast.success(`Offer ${status.toLowerCase()}.`)
      onRefresh()
    } catch {
      toast.error("Failed to update offer.")
    }
  }

  const handleDelete = async (o: ListOfferDTO) => {
    if (!confirm("Delete this offer?")) return
    try {
      await deleteOffer(o.id)
      if (detailItem?.type === "offer" && detailItem.data.id === o.id) onSetDetailItem(null)
      toast.success("Offer deleted.")
      onRefresh()
    } catch {
      toast.error("Failed to delete offer.")
    }
  }

  return (
    <div className="flex gap-6">
      <div className={cn("min-w-0 space-y-6", detailItem ? "flex-1" : "w-full")}>
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#3B3B3B]/60">
            {offers.length} offer{offers.length !== 1 ? "s" : ""}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-xl bg-white py-20 shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-[#675647]/40" />
          </div>
        ) : offers.length === 0 ? (
          <div className="rounded-xl bg-white py-16 text-center shadow-sm">
            <p className="text-sm text-[#3B3B3B]/60">No offers found.</p>
          </div>
        ) : (
          <div className="rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#DFD3B5]/40">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Shipping</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((o) => (
                    <tr key={o.id} className={cn("border-b border-[#DFD3B5]/30 last:border-0 transition-colors hover:bg-[#DFD3B5]/10", rowBg[o.status], detailItem?.type === "offer" && detailItem.data.id === o.id && "bg-[#DFD3B5]/15")}>
                      <td className="px-4 py-4 text-sm font-medium text-[#675647]">{o.id}</td>
                      <td className="px-4 py-4 text-sm text-[#3B3B3B]/70">#{o.shippingId}</td>
                      <td className="px-4 py-4 text-sm text-[#3B3B3B]/70">{o.fullname}</td>
                      <td className="px-4 py-4 text-sm font-medium text-[#675647]">R$ {o.initialValue}</td>
                      <td className="px-4 py-4">
                        <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", statusColors[o.status])}>{o.status}</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button type="button" onClick={() => onSetDetailItem({ type: "offer", data: o })} className="inline-flex items-center gap-1 rounded-lg bg-[#DFD3B5]/30 px-2.5 py-1.5 text-xs font-medium text-[#675647] transition-colors hover:bg-[#DFD3B5]/50" aria-label="View details">
                            <Maximize2 className="h-3.5 w-3.5" />
                          </button>
                          <button type="button" onClick={() => handleStatus(o.id, "ACCEPTED")} disabled={o.status === "ACCEPTED"} className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-2.5 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100 disabled:opacity-40" title="Accept">
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button type="button" onClick={() => handleStatus(o.id, "PENDING")} disabled={o.status === "PENDING"} className="inline-flex items-center gap-1 rounded-lg bg-yellow-50 px-2.5 py-1.5 text-xs font-medium text-yellow-700 transition-colors hover:bg-yellow-100 disabled:opacity-40" title="Set Pending">
                            <Clock className="h-3.5 w-3.5" />
                          </button>
                          <button type="button" onClick={() => handleStatus(o.id, "REJECTED")} disabled={o.status === "REJECTED"} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-40" title="Reject">
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                          <button type="button" onClick={() => handleDelete(o)} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {detailItem && (
        <div className="hidden w-96 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm lg:block">
          <DetailPanel item={detailItem} onClose={() => onSetDetailItem(null)} />
        </div>
      )}
    </div>
  )
}
