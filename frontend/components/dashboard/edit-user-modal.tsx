"use client"

import { useState } from "react"
import { X, Loader2, Eye, EyeOff } from "lucide-react"
import { cn, getLoggedInId, logout } from "@/lib/utils"
import { updateUser } from "@/services/api"
import type { UserDTO } from "@/types"
import { toast } from "sonner"

export function EditUserModal({
  user,
  onClose,
  onSaved,
  existingUsernames,
}: {
  user: UserDTO
  onClose: () => void
  onSaved: () => void
  existingUsernames: string[]
}) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ username: user.username, password: "", confirmPassword: "" })

  const otherUsernames = existingUsernames.filter((u) => u.toLowerCase() !== user.username.toLowerCase())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.username.trim()) errs.username = "Username is required"
    else if (form.username.length < 5 || form.username.length > 70) errs.username = "Username must be between 5 and 70 characters"
    else if (otherUsernames.some((u) => u.toLowerCase() === form.username.trim().toLowerCase())) errs.username = "This username is already taken"
    if (!form.password) errs.password = "New password is required"
    else if (form.password.length < 5 || form.password.length > 70) errs.password = "Password must be between 5 and 70 characters"
    if (form.confirmPassword !== form.password) errs.confirmPassword = "Passwords do not match"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const isSelf = getLoggedInId() === user.id
      await updateUser(user.id, { username: form.username.trim(), password: form.password })
      toast.success("User updated.")
      onSaved()
      if (isSelf) logout();
    } catch {
      toast.error("Failed to update user.")
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
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#DFD3B5]/40 px-6 py-4">
          <h3 className="font-semibold text-[#675647]">Edit User</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-[#3B3B3B]/40 transition-colors hover:bg-[#DFD3B5]/20 hover:text-[#675647]" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label htmlFor="edit-username" className="mb-1.5 block text-sm font-medium text-[#675647]">Username <span className="text-red-500">*</span></label>
            <input id="edit-username" name="username" value={form.username} onChange={handleChange} className={fieldClass("username")} />
            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="edit-password" className="mb-1.5 block text-sm font-medium text-[#675647]">New Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input id="edit-password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="New password" className={fieldClass("password")} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3B3B3B]/40 transition-colors hover:text-[#3B3B3B]/70"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="edit-confirm" className="mb-1.5 block text-sm font-medium text-[#675647]">Confirm Password <span className="text-red-500">*</span></label>
            <input id="edit-confirm" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" className={fieldClass("confirmPassword")} />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6C6E36] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#7a7d3d] hover:shadow-lg disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}
