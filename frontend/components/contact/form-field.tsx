"use client"

import React from "react"

import { cn } from "@/lib/utils"

interface FormFieldProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  error?: string
  placeholder?: string
  required?: boolean
  textarea?: boolean
  maxLength?: number
}

export function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  textarea = false,
  maxLength,
}: FormFieldProps) {
  const inputClasses = cn(
    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-[#3B3B3B] placeholder:text-[#C0BDBC] transition-colors focus:border-[#6C6E36] focus:outline-none focus:ring-2 focus:ring-[#6C6E36]/20",
    error ? "border-red-400" : "border-[#DFD3B5]"
  )

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#675647]"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          maxLength={maxLength}
          className={cn(inputClasses, "resize-none")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={inputClasses}
        />
      )}
      {maxLength && (
        <p className="mt-1 text-right text-xs text-[#3B3B3B]/40">
          {value.length}/{maxLength}
        </p>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
