"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Package, MessageSquare, BarChart3 } from "lucide-react"
import {
  fetchPartnerships,
  fetchApplications,
  fetchComplaints,
  deletePartnership,
  deleteApplication,
  fetchShippings,
  fetchOffers,
  fetchUsers,
} from "@/services/api"
import type {
  PartnershipResponse,
  JobApplicationResponse,
  ComplaintResponse,
  ListShippingDTO,
  ListOfferDTO,
  UserDTO,
} from "@/types"
import { toast } from "sonner"

import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { OverviewSection } from "./overview-section"
import { ShippingsSection } from "./shippings-section"
import { FormsSection } from "./forms-section"
import { OffersSection } from "./offers-section"
import { UsersSection } from "./users-section"
import { ShippingFormModal } from "./shipping-form-modal"
import { RegisterUserModal } from "./register-user-modal"
import { EditUserModal } from "./edit-user-modal"
import type { DetailItem } from "./detail-panel"


export function DashboardContent() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const loggedInUsername = useMemo(() => {
    if (typeof window === "undefined") return null
    const token = sessionStorage.getItem("authToken")
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return (payload.sub ?? payload.username ?? null) as string | null
    } catch {
      return null
    }
  }, [])

  const [formsTab, setFormsTab] = useState<"partnerships" | "applications" | "complaints">("partnerships")
  const [partnerships, setPartnerships] = useState<PartnershipResponse[]>([])
  const [applications, setApplications] = useState<JobApplicationResponse[]>([])
  const [complaints, setComplaints] = useState<ComplaintResponse[]>([])
  const [formsLoading, setFormsLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [detailItem, setDetailItem] = useState<DetailItem | null>(null)

  const [shippings, setShippings] = useState<ListShippingDTO[]>([])
  const [shippingsLoading, setShippingsLoading] = useState(false)
  const [shippingModal, setShippingModal] = useState<{ open: boolean; mode: "create" | "edit"; item?: ListShippingDTO }>({ open: false, mode: "create" })

  const [offers, setOffers] = useState<ListOfferDTO[]>([])
  const [offersLoading, setOffersLoading] = useState(false)

  const [users, setUsers] = useState<UserDTO[]>([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [showRegisterUser, setShowRegisterUser] = useState(false)
  const [editingUser, setEditingUser] = useState<UserDTO | null>(null)

  const metrics = [
    { label: "Total Shippings", value: shippings.length, icon: Package, color: "bg-[#675647]", iconColor: "text-[#DFD3B5]" },
    { label: "Partnerships", value: partnerships.length, icon: MessageSquare, color: "bg-[#6C6E36]", iconColor: "text-white" },
    { label: "Applications", value: applications.length, icon: BarChart3, color: "bg-[#E3BD90]", iconColor: "text-[#675647]" },
  ]

  const loadOverviewData = useCallback(async () => {
    try {
      const [s, p, a] = await Promise.all([fetchShippings(), fetchPartnerships(), fetchApplications()])
      setShippings(s); setPartnerships(p); setApplications(a)
    } catch {}
  }, [])

  useEffect(() => { loadOverviewData() }, [loadOverviewData])

  const loadShippings = useCallback(async () => {
    setShippingsLoading(true)
    try { setShippings(await fetchShippings()) }
    catch { toast.error("Failed to load shippings.") }
    finally { setShippingsLoading(false) }
  }, [])

  useEffect(() => { if (activeSection === "shippings") loadShippings() }, [activeSection, loadShippings])

  const loadForms = useCallback(async () => {
    setFormsLoading(true)
    try {
      if (formsTab === "partnerships") setPartnerships(await fetchPartnerships())
      else if (formsTab === "applications") setApplications(await fetchApplications())
      else setComplaints(await fetchComplaints())
    } catch { toast.error("Failed to load data. Check your connection.") }
    finally { setFormsLoading(false) }
  }, [formsTab])

  useEffect(() => { if (activeSection === "forms") loadForms() }, [activeSection, formsTab, loadForms])

  const loadOffers = useCallback(async () => {
    setOffersLoading(true)
    try { setOffers(await fetchOffers()) }
    catch { toast.error("Failed to load offers.") }
    finally { setOffersLoading(false) }
  }, [])

  useEffect(() => { if (activeSection === "offers") loadOffers() }, [activeSection, loadOffers])

  const loadUsers = useCallback(async () => {
    setUsersLoading(true)
    try { setUsers(await fetchUsers()) }
    catch { toast.error("Failed to load users.") }
    finally { setUsersLoading(false) }
  }, [])

  useEffect(() => { if (activeSection === "users") loadUsers() }, [activeSection, loadUsers])

  const handleDeletePartnership = async (id: number) => {
    setDeletingId(id)
    try {
      await deletePartnership(id)
      setPartnerships((prev) => prev.filter((p) => p.id !== id))
      if (detailItem?.type === "partnership" && detailItem.data.id === id) setDetailItem(null)
      toast.success("Partnership deleted.")
    } catch { toast.error("Failed to delete partnership.") }
    finally { setDeletingId(null) }
  }

  const handleDeleteApplication = async (id: number) => {
    setDeletingId(id)
    try {
      await deleteApplication(id)
      setApplications((prev) => prev.filter((a) => a.id !== id))
      if (detailItem?.type === "application" && detailItem.data.id === id) setDetailItem(null)
      toast.success("Application deleted.")
    } catch { toast.error("Failed to delete application.") }
    finally { setDeletingId(null) }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("authToken")
    router.push("/login")
  }

  const navigate = (id: string) => {
    setActiveSection(id)
    setSidebarOpen(false)
    setDetailItem(null)
  }

  return (
    <div className="flex min-h-screen bg-[#DFD3B5]/20">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => { if (e.key === "Escape") setSidebarOpen(false) }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      <DashboardSidebar
        activeSection={activeSection}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={navigate}
      />

      <div className="flex flex-1 flex-col">
        <DashboardHeader
          activeSection={activeSection}
          onOpenSidebar={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          {activeSection === "overview" && (
            <OverviewSection metrics={metrics} shippings={shippings} />
          )}

          {activeSection === "shippings" && (
            <ShippingsSection
              shippings={shippings}
              loading={shippingsLoading}
              onNew={() => setShippingModal({ open: true, mode: "create" })}
              onEdit={(item) => setShippingModal({ open: true, mode: "edit", item })}
              onRefresh={loadShippings}
            />
          )}

          {activeSection === "forms" && (
            <FormsSection
              tab={formsTab}
              onTabChange={setFormsTab}
              partnerships={partnerships}
              applications={applications}
              complaints={complaints}
              loading={formsLoading}
              detailItem={detailItem}
              onSetDetailItem={setDetailItem}
              deletingId={deletingId}
              onDeletePartnership={handleDeletePartnership}
              onDeleteApplication={handleDeleteApplication}
            />
          )}

          {activeSection === "offers" && (
            <OffersSection
              offers={offers}
              loading={offersLoading}
              detailItem={detailItem}
              onSetDetailItem={setDetailItem}
              onRefresh={loadOffers}
            />
          )}

          {activeSection === "users" && (
            <UsersSection
              users={users}
              loading={usersLoading}
              loggedInUsername={loggedInUsername}
              onRegister={() => setShowRegisterUser(true)}
              onEdit={setEditingUser}
              onRefresh={loadUsers}
            />
          )}
        </main>
      </div>

      {shippingModal.open && (
        <ShippingFormModal
          mode={shippingModal.mode}
          initial={shippingModal.item}
          onClose={() => setShippingModal({ open: false, mode: "create" })}
          onSaved={() => { setShippingModal({ open: false, mode: "create" }); loadShippings() }}
        />
      )}

      {showRegisterUser && (
        <RegisterUserModal
          onClose={() => setShowRegisterUser(false)}
          onSaved={() => { setShowRegisterUser(false); loadUsers() }}
          existingUsernames={users.map((u) => u.username)}
        />
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSaved={() => { setEditingUser(null); loadUsers() }}
          existingUsernames={users.map((u) => u.username)}
        />
      )}
    </div>
  )
}
