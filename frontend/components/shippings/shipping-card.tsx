"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  ArrowRight,
  Package,
  Weight,
  Route,
  Calendar,
  X,
  Loader2,
} from "lucide-react"
import type { ListShippingDTO } from "@/types"
import { submitOffer } from "@/services/api"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function OfferModal({
  shippingId,
  onClose,
}: {
  shippingId: number
  onClose: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    initialValue: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.fullname.trim()) errs.fullname = "Full name is required"
    if (!form.email.trim()) errs.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email address"
    if (!form.phoneNumber.trim()) errs.phoneNumber = "Phone number is required"
    else if (!/^[0-9.+\-]+$/.test(form.phoneNumber))
      errs.phoneNumber = "Phone number can only contain digits, dots, and dashes"
    else if (form.phoneNumber.length < 10 || form.phoneNumber.length > 20)
      errs.phoneNumber = "Phone number must be between 10 and 20 characters"
    const val = Number(form.initialValue)
    if (!form.initialValue) errs.initialValue = "Initial value is required"
    else if (isNaN(val) || val < 100)
      errs.initialValue = "Initial value must be at least 100"
    else if (val > 999999)
      errs.initialValue = "Initial value must be less than 1 million"
    if (form.message && form.message.length > 250)
      errs.message = "Message must be at most 250 characters"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const result = await submitOffer({
      shippingId,
      fullname: form.fullname.trim(),
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim(),
      initialValue: Number(form.initialValue),
      message: form.message.trim(),
    })
    setLoading(false)
    if (result.success) {
      toast.success(result.message)
      onClose()
    } else {
      toast.error(result.message)
    }
  }

  const fieldClass = (name: string) =>
    cn(
      "w-full rounded-lg border bg-white px-4 py-3 text-sm text-[#3B3B3B] placeholder:text-[#C0BDBC] transition-colors focus:border-[#6C6E36] focus:outline-none focus:ring-2 focus:ring-[#6C6E36]/20",
      errors[name] ? "border-red-400" : "border-[#DFD3B5]"
    )

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#DFD3B5]/40 px-6 py-4">
          <h3 className="font-semibold text-[#675647]">
            Make an Offer{" "}
            <span className="text-sm font-normal text-[#3B3B3B]/50">
              (Shipping #{shippingId})
            </span>
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
            <label htmlFor="offer-fullname" className="mb-1.5 block text-sm font-medium text-[#675647]">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="offer-fullname"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Andre Muller"
              className={fieldClass("fullname")}
            />
            {errors.fullname && <p className="mt-1 text-xs text-red-500">{errors.fullname}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="offer-email" className="mb-1.5 block text-sm font-medium text-[#675647]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="offer-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className={fieldClass("email")}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="offer-phone" className="mb-1.5 block text-sm font-medium text-[#675647]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="offer-phone"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+5547988731818"
                className={fieldClass("phoneNumber")}
              />
              {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="offer-value" className="mb-1.5 block text-sm font-medium text-[#675647]">
              Initial Value (R$) <span className="text-red-500">*</span>
            </label>
            <input
              id="offer-value"
              name="initialValue"
              type="number"
              min={100}
              max={999999}
              value={form.initialValue}
              onChange={handleChange}
              placeholder="5000"
              className={fieldClass("initialValue")}
            />
            {errors.initialValue && <p className="mt-1 text-xs text-red-500">{errors.initialValue}</p>}
          </div>
          <div>
            <label htmlFor="offer-message" className="mb-1.5 block text-sm font-medium text-[#675647]">
              Message
            </label>
            <textarea
              id="offer-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Optional message..."
              maxLength={250}
              rows={3}
              className={cn(fieldClass("message"), "resize-none")}
            />
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            <p className="mt-1 text-right text-xs text-[#3B3B3B]/40">{form.message.length}/250</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6C6E36] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#7a7d3d] hover:shadow-lg disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Submitting..." : "Submit Offer"}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export function ShippingCard({
  shipping,
  index,
}: {
  shipping: ListShippingDTO
  index: number
}) {
  const [showOffer, setShowOffer] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ y: -4 }}
        className="group overflow-hidden rounded-2xl border border-[#DFD3B5] bg-white shadow-sm transition-shadow hover:shadow-xl"
      >
        <div className="bg-[#675647] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#E3BD90]" />
              <span className="text-sm font-medium text-[#DFD3B5]">
                {shipping.from}
              </span>
              <ArrowRight className="h-4 w-4 text-[#DFD3B5]/40" />
              <span className="text-sm font-medium text-[#DFD3B5]">
                {shipping.to}
              </span>
            </div>
            <span className="rounded-full bg-[#E3BD90]/15 px-3 py-1 text-xs font-medium text-[#E3BD90]">
              #{shipping.id}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-5 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <Package className="h-4 w-4 text-[#3B3B3B]/50" />
              <div>
                <p className="text-xs text-[#3B3B3B]/50">Cargo Type</p>
                <p className="text-sm font-medium text-[#675647]">
                  {shipping.cargoType}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Weight className="h-4 w-4 text-[#3B3B3B]/50" />
              <div>
                <p className="text-xs text-[#3B3B3B]/50">Weight</p>
                <p className="text-sm font-medium text-[#675647]">
                  {shipping.weight.toLocaleString("en-US")} kg
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Route className="h-4 w-4 text-[#3B3B3B]/50" />
              <div>
                <p className="text-xs text-[#3B3B3B]/50">Distance</p>
                <p className="text-sm font-medium text-[#675647]">
                  {shipping.distance.toLocaleString("en-US")} km
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="h-4 w-4 text-[#3B3B3B]/50" />
              <div>
                <p className="text-xs text-[#3B3B3B]/50">Scheduled</p>
                <p className="text-sm font-medium text-[#675647]">
                  {formatDate(shipping.scheduledDate)}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowOffer(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6C6E36] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7a7d3d] hover:shadow-lg"
          >
            Make an Offer
          </button>
        </div>
      </motion.div>

      {showOffer && (
        <OfferModal
          shippingId={shipping.id}
          onClose={() => setShowOffer(false)}
        />
      )}
    </>
  )
}
