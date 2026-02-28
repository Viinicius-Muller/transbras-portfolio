"use client"

import React from "react"

import { useState } from "react"
import { toast } from "sonner"
import { FormField } from "./form-field"
import { submitComplaint } from "@/services/api"
import type { ComplaintRequest } from "@/types"
import { Loader2 } from "lucide-react"

export function ComplaintForm() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState<ComplaintRequest>({
    fullname: "",
    email: "",
    phoneNumber: "",
    message: "",
    victim: false,
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
    if (!form.message.trim()) errs.message = "Message is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const result = await submitComplaint(form)
    setLoading(false)
    if (result.success) {
      toast.success(result.message)
      setForm({
        fullname: "",
        email: "",
        phoneNumber: "",
        message: "",
        victim: false,
      })
    } else {
      toast.error(result.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField
        label="Full Name"
        name="fullname"
        value={form.fullname}
        onChange={handleChange}
        error={errors.fullname}
        placeholder="Andre Muller"
        required
      />
      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="email@example.com"
          required
        />
        <FormField
          label="Phone Number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          placeholder="+5547988731818"
          required
        />
      </div>
      <FormField
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        error={errors.message}
        placeholder="Describe the issue..."
        required
        textarea
        maxLength={250}
      />
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="victim"
          name="victim"
          checked={form.victim}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, victim: e.target.checked }))
          }
          className="h-4 w-4 rounded border-[#DFD3B5] accent-[#6C6E36]"
        />
        <label
          htmlFor="victim"
          className="text-sm text-[#3B3B3B]"
        >
          I am a victim in this situation
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6C6E36] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#7a7d3d] hover:shadow-lg disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Submitting..." : "Submit Complaint"}
      </button>
    </form>
  )
}
