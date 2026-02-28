"use client"

import { Loader2, Maximize2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PartnershipResponse, JobApplicationResponse, ComplaintResponse } from "@/types"
import type { DetailItem } from "./detail-panel"
import { DetailPanel } from "./detail-panel"

interface Props {
  tab: "partnerships" | "applications" | "complaints"
  onTabChange: (tab: "partnerships" | "applications" | "complaints") => void
  partnerships: PartnershipResponse[]
  applications: JobApplicationResponse[]
  complaints: ComplaintResponse[]
  loading: boolean
  detailItem: DetailItem | null
  onSetDetailItem: (item: DetailItem | null) => void
  deletingId: number | null
  onDeletePartnership: (id: number) => void
  onDeleteApplication: (id: number) => void
}

export function FormsSection({
  tab, onTabChange,
  partnerships, applications, complaints,
  loading,
  detailItem, onSetDetailItem,
  deletingId, onDeletePartnership, onDeleteApplication,
}: Props) {
  return (
    <div className="flex gap-6">
      <div className={cn("min-w-0 space-y-6", detailItem ? "flex-1" : "w-full")}>
        <div className="flex gap-2 rounded-xl bg-white p-1.5 shadow-sm">
          {(["partnerships", "applications", "complaints"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => { onTabChange(id); onSetDetailItem(null) }}
              className={cn(
                "flex-1 rounded-lg px-4 py-2.5 text-sm font-medium capitalize transition-colors",
                tab === id ? "bg-[#675647] text-[#DFD3B5]" : "text-[#3B3B3B]/60 hover:bg-[#DFD3B5]/20 hover:text-[#675647]",
              )}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-xl bg-white py-20 shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-[#675647]/40" />
          </div>
        ) : (
          <>
            {tab === "partnerships" && (
              <div className="rounded-xl bg-white shadow-sm">
                <div className="border-b border-[#DFD3B5]/40 px-6 py-4">
                  <h2 className="font-semibold text-[#675647]">Partnership Requests</h2>
                </div>
                {partnerships.length === 0 ? (
                  <div className="py-16 text-center"><p className="text-sm text-[#3B3B3B]/60">No partnership requests found.</p></div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#DFD3B5]/40">
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Message</th>
                          <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {partnerships.map((p) => (
                          <tr key={p.id} className={cn("border-b border-[#DFD3B5]/30 last:border-0 transition-colors hover:bg-[#DFD3B5]/10", detailItem?.type === "partnership" && detailItem.data.id === p.id && "bg-[#DFD3B5]/15")}>
                            <td className="px-4 py-4 text-sm font-medium text-[#675647]">{p.id}</td>
                            <td className="px-4 py-4 text-sm text-[#3B3B3B]/70">{p.fullname}</td>
                            <td className="px-4 py-4 text-sm text-[#3B3B3B]/70">{p.email}</td>
                            <td className="px-4 py-4">
                              <span className="rounded-full bg-[#6C6E36]/15 px-3 py-1 text-xs font-medium text-[#6C6E36]">{p.partnershipType}</span>
                            </td>
                            <td className="max-w-[180px] truncate px-4 py-4 text-sm text-[#3B3B3B]/70" title={p.message}>{p.message}</td>
                            <td className="px-4 py-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button type="button" onClick={() => onSetDetailItem({ type: "partnership", data: p })} className="inline-flex items-center gap-1 rounded-lg bg-[#DFD3B5]/30 px-2.5 py-1.5 text-xs font-medium text-[#675647] transition-colors hover:bg-[#DFD3B5]/50" aria-label="View details">
                                  <Maximize2 className="h-3.5 w-3.5" />
                                </button>
                                <button type="button" onClick={() => onDeletePartnership(p.id)} disabled={deletingId === p.id} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50">
                                  {deletingId === p.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === "applications" && (
              <div className="rounded-xl bg-white shadow-sm">
                <div className="border-b border-[#DFD3B5]/40 px-6 py-4">
                  <h2 className="font-semibold text-[#675647]">Job Applications</h2>
                </div>
                {applications.length === 0 ? (
                  <div className="py-16 text-center"><p className="text-sm text-[#3B3B3B]/60">No job applications found.</p></div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#DFD3B5]/40">
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Message</th>
                          <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((a) => (
                          <tr key={a.id} className={cn("border-b border-[#DFD3B5]/30 last:border-0 transition-colors hover:bg-[#DFD3B5]/10", detailItem?.type === "application" && detailItem.data.id === a.id && "bg-[#DFD3B5]/15")}>
                            <td className="px-4 py-4 text-sm font-medium text-[#675647]">{a.id}</td>
                            <td className="px-4 py-4 text-sm text-[#3B3B3B]/70">{a.fullname}</td>
                            <td className="px-4 py-4 text-sm text-[#3B3B3B]/70">{a.email}</td>
                            <td className="max-w-[200px] truncate px-4 py-4 text-sm text-[#3B3B3B]/70" title={a.message}>{a.message}</td>
                            <td className="px-4 py-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button type="button" onClick={() => onSetDetailItem({ type: "application", data: a })} className="inline-flex items-center gap-1 rounded-lg bg-[#DFD3B5]/30 px-2.5 py-1.5 text-xs font-medium text-[#675647] transition-colors hover:bg-[#DFD3B5]/50" aria-label="View details">
                                  <Maximize2 className="h-3.5 w-3.5" />
                                </button>
                                <button type="button" onClick={() => onDeleteApplication(a.id)} disabled={deletingId === a.id} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50">
                                  {deletingId === a.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === "complaints" && (
              <div className="rounded-xl bg-white shadow-sm">
                <div className="border-b border-[#DFD3B5]/40 px-6 py-4">
                  <h2 className="font-semibold text-[#675647]">Complaints</h2>
                </div>
                {complaints.length === 0 ? (
                  <div className="py-16 text-center"><p className="text-sm text-[#3B3B3B]/60">No complaints found.</p></div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#DFD3B5]/40">
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Full Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Victim</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Message</th>
                          <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {complaints.map((c) => (
                          <tr key={c.id} className={cn("border-b border-[#DFD3B5]/30 last:border-0 transition-colors hover:bg-[#DFD3B5]/10", detailItem?.type === "complaint" && detailItem.data.id === c.id && "bg-[#DFD3B5]/15")}>
                            <td className="px-4 py-4 text-sm font-medium text-[#675647]">{c.id}</td>
                            <td className="px-4 py-4 text-sm text-[#3B3B3B]/70">{c.fullname}</td>
                            <td className="px-4 py-4 text-sm text-[#3B3B3B]/70">{c.email}</td>
                            <td className="px-4 py-4">
                              <span className={cn("rounded-full px-3 py-1 text-xs font-medium", c.victim ? "bg-red-50 text-red-600" : "bg-[#DFD3B5]/40 text-[#3B3B3B]/60")}>
                                {c.victim ? "Yes" : "No"}
                              </span>
                            </td>
                            <td className="max-w-[180px] truncate px-4 py-4 text-sm text-[#3B3B3B]/70" title={c.message}>{c.message}</td>
                            <td className="px-4 py-4 text-right">
                              <button type="button" onClick={() => onSetDetailItem({ type: "complaint", data: c })} className="inline-flex items-center gap-1 rounded-lg bg-[#DFD3B5]/30 px-2.5 py-1.5 text-xs font-medium text-[#675647] transition-colors hover:bg-[#DFD3B5]/50" aria-label="View details">
                                <Maximize2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
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
