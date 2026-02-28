"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Truck, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

function isTokenValid(token: string): boolean {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return false
    const payload = JSON.parse(atob(parts[1]))
    if (!payload.exp) return true
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

export function LoginContent() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  // Auto-login: check for existing valid JWT
  useEffect(() => {
    const token = sessionStorage.getItem("authToken")
    if (token && isTokenValid(token)) {
      router.replace("/dashboard")
    } else {
      if (token) sessionStorage.removeItem("authToken")
      setChecking(false)
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.username.trim()) errs.username = "Username is required"
    if (!form.password.trim()) errs.password = "Password is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error("Invalid credentials")
      }

      const data = await response.json()

      if (data.token) {
        sessionStorage.setItem("authToken", data.token)
      }

      toast.success("Login successful!")
      router.push("/dashboard")
    } catch {
      toast.error("Invalid username or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#DFD3B5]/20">
        <Loader2 className="h-8 w-8 animate-spin text-[#675647]/40" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel - decorative */}
      <div className="hidden flex-1 items-center justify-center bg-[#675647] lg:flex">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="px-12 text-center"
        >
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#6C6E36]">
            <Truck className="h-10 w-10 text-white" />
          </div>
          <h2 className="mb-4 text-balance text-4xl font-bold text-[#DFD3B5]">
            Trans<span className="text-[#E3BD90]">Bras</span>
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-[#C0BDBC]">
            Manage your shippings, track offers, and oversee all logistics
            operations from your dashboard.
          </p>
        </motion.div>
      </div>

      {/* Right panel - login form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[#DFD3B5]/20 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#675647]/60 transition-colors hover:text-[#675647]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>

          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6C6E36]">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#675647]">
              Trans<span className="text-[#E3BD90]">Bras</span>
            </span>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-[#675647]">
            Welcome back
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-[#3B3B3B]/60">
            Enter your credentials to access the admin dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-[#675647]"
              >
                Username <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-[#3B3B3B] placeholder:text-[#C0BDBC] transition-colors focus:border-[#6C6E36] focus:outline-none focus:ring-2 focus:ring-[#6C6E36]/20 ${
                  errors.username ? "border-red-400" : "border-[#DFD3B5]"
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#675647]"
              >
                Password <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full rounded-lg border bg-white px-4 py-3 pr-12 text-sm text-[#3B3B3B] placeholder:text-[#C0BDBC] transition-colors focus:border-[#6C6E36] focus:outline-none focus:ring-2 focus:ring-[#6C6E36]/20 ${
                    errors.password ? "border-red-400" : "border-[#DFD3B5]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3B3B3B]/40 transition-colors hover:text-[#3B3B3B]/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6C6E36] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#7a7d3d] hover:shadow-lg disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
