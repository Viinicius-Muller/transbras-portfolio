"use client"

import { X } from "lucide-react"
import type { PartnershipResponse, JobApplicationResponse, ComplaintResponse, ListOfferDTO } from "@/types"

export type DetailItem =
  | { type: "partnership"; data: PartnershipResponse }
  | { type: "application"; data: JobApplicationResponse }
  | { type: "complaint"; data: ComplaintResponse }
  | { type: "offer"; data: ListOfferDTO }

export function DetailPanel({ item, onClose }: { item: DetailItem; onClose: () => void }) {
  const rows: { label: string; value: string }[] = []

  if (item.type === "partnership") {
    const d = item.data
    rows.push(
      { label: "ID", value: String(d.id) },
      { label: "Name", value: d.fullname },
      { label: "Email", value: d.email },
      { label: "Phone", value: d.phoneNumber },
      { label: "Type", value: d.partnershipType },
      { label: "Company", value: d.companyName || "-" },
      { label: "Message", value: d.message },
    )
  } else if (item.type === "application") {
    const d = item.data
    rows.push(
      { label: "ID", value: String(d.id) },
      { label: "Name", value: d.fullname },
      { label: "Email", value: d.email },
      { label: "Phone", value: d.phoneNumber },
      { label: "Message", value: d.message },
    )
  } else if (item.type === "offer") {
    const d = item.data
    rows.push(
      { label: "ID", value: String(d.id) },
      { label: "Shipping ID", value: String(d.shippingId) },
      { label: "Name", value: d.fullname },
      { label: "Email", value: d.email },
      { label: "Phone", value: d.phoneNumber },
      { label: "Initial Value", value: `R$ ${d.initialValue}` },
      { label: "Status", value: d.status },
      { label: "Message", value: d.message },
    )
  } else {
    const d = item.data
    rows.push(
      { label: "ID", value: String(d.id) },
      { label: "Full Name", value: d.fullname },
      { label: "Email", value: d.email },
      { label: "Phone", value: d.phoneNumber },
      { label: "Victim", value: d.victim ? "Yes" : "No" },
      { label: "Message", value: d.message },
    )
  }

  return (
    <div className="flex h-full w-full flex-col border-l border-[#DFD3B5]/40 bg-white">
      <div className="flex items-center justify-between border-b border-[#DFD3B5]/40 px-6 py-4">
        <h3 className="font-semibold text-[#675647]">Details</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-[#3B3B3B]/40 transition-colors hover:bg-[#DFD3B5]/20 hover:text-[#675647]"
          aria-label="Close detail panel"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-5">
          {rows.map((r) => (
            <div key={r.label}>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/50">{r.label}</p>
              {r.label === "Message" ? (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#3B3B3B]">{r.value}</p>
              ) : (
                <p className="text-sm font-medium text-[#675647]">{r.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
