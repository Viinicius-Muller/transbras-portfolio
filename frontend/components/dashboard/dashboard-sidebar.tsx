"use client"

import Link from "next/link"
import { Truck, LayoutDashboard, Package, DollarSign, FileText, Users, LogOut, X } from "lucide-react"
import { cn } from "@/lib/utils"

export const sidebarLinks = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: Package, label: "Shippings", id: "shippings" },
  { icon: DollarSign, label: "Offers", id: "offers" },
  { icon: FileText, label: "Forms", id: "forms" },
  { icon: Users, label: "Users", id: "users" },
]

interface Props {
  activeSection: string
  open: boolean
  onClose: () => void
  onNavigate: (id: string) => void
}

export function DashboardSidebar({ activeSection, open, onClose, onNavigate }: Props) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#675647] transition-transform lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between border-b border-[#DFD3B5]/10 px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6C6E36]">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-[#DFD3B5]">
            Trans<span className="text-[#E3BD90]">Bras</span>
          </span>
        </Link>
        <button type="button" className="text-[#DFD3B5]/60 lg:hidden" onClick={onClose} aria-label="Close sidebar">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => onNavigate(link.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
              activeSection === link.id
                ? "bg-[#DFD3B5]/10 text-[#E3BD90]"
                : "text-[#DFD3B5]/60 hover:bg-[#DFD3B5]/5 hover:text-[#DFD3B5]",
            )}
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-[#DFD3B5]/10 p-4">
        <Link href="/" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#DFD3B5]/60 transition-colors hover:bg-[#DFD3B5]/5 hover:text-[#DFD3B5]">
          <LogOut className="h-5 w-5" />
          Back to Site
        </Link>
      </div>
    </aside>
  )
}
