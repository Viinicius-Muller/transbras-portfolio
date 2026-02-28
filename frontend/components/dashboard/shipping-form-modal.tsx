"use client"

import { useState } from "react"
import { X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { createShipping, updateShipping } from "@/services/api"
import type { ListShippingDTO, NewShippingDTO } from "@/types"
import { toast } from "sonner"

export function ShippingFormModal({
  mode,
  initial,
  onClose,
  onSaved,
}: {
  mode: "create" | "edit"
  initial?: ListShippingDTO
  onClose: () => void
  onSaved: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    scheduledDate: initial ? new Date(initial.scheduledDate).toISOString().slice(0, 10) : "",
    from: initial?.from ?? "",
    to: initial?.to ?? "",
    cargoType: initial?.cargoType ?? "",
    weight: initial?.weight?.toString() ?? "",
    distance: initial?.distance?.toString() ?? "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.scheduledDate) errs.scheduledDate = "Date is required"
    else {
      const [y, m, d] = form.scheduledDate.split("-").map(Number)
      const scheduled = new Date(y, m - 1, d)
      const tomorrow = new Date()
      tomorrow.setHours(0, 0, 0, 0)
      tomorrow.setDate(tomorrow.getDate() + 1)
      if (scheduled < tomorrow) errs.scheduledDate = "Needs to be scheduled at least one day before"
    }
    if (!form.from.trim()) errs.from = "Origin is required"
    if (!form.to.trim()) errs.to = "Destination is required"
    if (!form.cargoType.trim()) errs.cargoType = "Cargo type is required"
    const w = Number(form.weight)
    if (!form.weight) errs.weight = "Weight is required"
    else if (isNaN(w) || w < 1 || w > 100000) errs.weight = "Weight must be between 1kg and 100,000kg"
    const d = Number(form.distance)
    if (!form.distance) errs.distance = "Distance is required"
    else if (isNaN(d) || d < 10 || d > 10000) errs.distance = "Distance must be between 10km and 10,000km"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const payload: NewShippingDTO = {
        scheduledDate: new Date(form.scheduledDate).toISOString(),
        from: form.from.trim(),
        to: form.to.trim(),
        cargoType: form.cargoType.trim(),
        weight: Number(form.weight),
        distance: Number(form.distance),
      }
      if (mode === "create") {
        await createShipping(payload)
        toast.success("Shipping created.")
      } else if (initial) {
        await updateShipping(initial.id, payload)
        toast.success("Shipping updated.")
      }
      onSaved()
    } catch {
      toast.error(`Failed to ${mode} shipping.`)
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (name: string) =>
    cn(
      "w-full rounded-lg border bg-white px-4 py-3 text-sm text-[#3B3B3B] placeholder:text-[#C0BDBC] transition-colors focus:border-[#6C6E36] focus:outline-none focus:ring-2 focus:ring-[#6C6E36]/20",
      errors[name] ? "border-red-400" : "border-[#DFD3B5]",
    )

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#DFD3B5]/40 px-6 py-4">
          <h3 className="font-semibold text-[#675647]">
            {mode === "create" ? "New Shipping" : "Edit Shipping"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#3B3B3B]/40 transition-colors hover:bg-[#DFD3B5]/20 hover:text-[#675647]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label htmlFor="scheduledDate" className="mb-1.5 block text-sm font-medium text-[#675647]">
              Scheduled Date <span className="text-red-500">*</span>
            </label>
            <input
              id="scheduledDate"
              name="scheduledDate"
              type="date"
              value={form.scheduledDate}
              onChange={handleChange}
              className={fieldClass("scheduledDate")}
            />
            {errors.scheduledDate && <p className="mt-1 text-xs text-red-500">{errors.scheduledDate}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="from" className="mb-1.5 block text-sm font-medium text-[#675647]">
                From <span className="text-red-500">*</span>
              </label>
              <input id="from" name="from" value={form.from} onChange={handleChange} placeholder="Sao Paulo, SP" className={fieldClass("from")} />
              {errors.from && <p className="mt-1 text-xs text-red-500">{errors.from}</p>}
            </div>
            <div>
              <label htmlFor="to" className="mb-1.5 block text-sm font-medium text-[#675647]">
                To <span className="text-red-500">*</span>
              </label>
              <input id="to" name="to" value={form.to} onChange={handleChange} placeholder="Rio de Janeiro, RJ" className={fieldClass("to")} />
              {errors.to && <p className="mt-1 text-xs text-red-500">{errors.to}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="cargoType" className="mb-1.5 block text-sm font-medium text-[#675647]">
              Cargo Type <span className="text-red-500">*</span>
            </label>
            <input id="cargoType" name="cargoType" value={form.cargoType} onChange={handleChange} placeholder="Electronics" className={fieldClass("cargoType")} />
            {errors.cargoType && <p className="mt-1 text-xs text-red-500">{errors.cargoType}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="weight" className="mb-1.5 block text-sm font-medium text-[#675647]">
                Weight (kg) <span className="text-red-500">*</span>
              </label>
              <input id="weight" name="weight" type="number" min={1} max={100000} value={form.weight} onChange={handleChange} placeholder="2500" className={fieldClass("weight")} />
              {errors.weight && <p className="mt-1 text-xs text-red-500">{errors.weight}</p>}
            </div>
            <div>
              <label htmlFor="distance" className="mb-1.5 block text-sm font-medium text-[#675647]">
                Distance (km) <span className="text-red-500">*</span>
              </label>
              <input id="distance" name="distance" type="number" min={10} max={10000} value={form.distance} onChange={handleChange} placeholder="430" className={fieldClass("distance")} />
              {errors.distance && <p className="mt-1 text-xs text-red-500">{errors.distance}</p>}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6C6E36] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#7a7d3d] hover:shadow-lg disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading
              ? mode === "create" ? "Creating..." : "Saving..."
              : mode === "create" ? "Create Shipping" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}
