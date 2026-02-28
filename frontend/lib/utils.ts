import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenPayload(): { id?: number; sub?: string; username?: string } | null {
  if (typeof window === "undefined") return null
  const token = sessionStorage.getItem("authToken")
  if (!token) return null
  try {
    return JSON.parse(atob(token.split(".")[1]))
  } catch {
    return null
  }
}

export function getLoggedInId(): number | null {
  const payload = getTokenPayload()
  return payload?.id ?? null
}

export function logout() {
  sessionStorage.removeItem("authToken")
  window.location.href = "/login"
}