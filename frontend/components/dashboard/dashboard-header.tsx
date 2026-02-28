"use client"

import { useRef, useState, useEffect } from "react"
import { Menu, ChevronDown, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { sidebarLinks } from "./dashboard-sidebar"

interface Props {
  activeSection: string
  onOpenSidebar: () => void
  onLogout: () => void
}

export function DashboardHeader({ activeSection, onOpenSidebar, onLogout }: Props) {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="flex items-center justify-between border-b border-[#DFD3B5]/40 bg-white px-6 py-4">
      <div className="flex items-center gap-4">
        <button type="button" className="text-[#3B3B3B]/60 lg:hidden" onClick={onOpenSidebar} aria-label="Open sidebar">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-[#675647]">
          {sidebarLinks.find((l) => l.id === activeSection)?.label}
        </h1>
      </div>
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#DFD3B5]/20"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#675647]">
            <span className="text-xs font-bold text-[#DFD3B5]">AD</span>
          </div>
          <span className="hidden text-sm font-medium text-[#675647] sm:block">Admin</span>
          <ChevronDown className={cn("hidden h-4 w-4 text-[#3B3B3B]/40 transition-transform sm:block", showMenu && "rotate-180")} />
        </button>
        {showMenu && (
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-[#DFD3B5]/40 bg-white py-1 shadow-lg">
            <button type="button" onClick={onLogout} className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-[#675647] transition-colors hover:bg-[#DFD3B5]/20">
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
