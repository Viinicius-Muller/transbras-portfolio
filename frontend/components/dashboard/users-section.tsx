"use client"

import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import { deleteUser } from "@/services/api"
import type { UserDTO } from "@/types"
import { toast } from "sonner"

interface Props {
  users: UserDTO[]
  loading: boolean
  loggedInUsername: string | null
  onRegister: () => void
  onEdit: (user: UserDTO) => void
  onRefresh: () => void
}

export function UsersSection({ users, loading, loggedInUsername, onRegister, onEdit, onRefresh }: Props) {
  const handleDelete = async (u: UserDTO) => {
    if (!confirm(`Delete user "${u.username}"?`)) return
    try {
      await deleteUser(u.id)
      toast.success("User deleted.")
      onRefresh()
    } catch {
      toast.error("Failed to delete user.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#3B3B3B]/60">
          {users.length} user{users.length !== 1 ? "s" : ""}
        </p>
        <button type="button" onClick={onRegister} className="inline-flex items-center gap-2 rounded-lg bg-[#6C6E36] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7a7d3d] hover:shadow-lg">
          <Plus className="h-4 w-4" />
          Register New User
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-xl bg-white py-20 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-[#675647]/40" />
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-xl bg-white py-16 text-center shadow-sm">
          <p className="text-sm text-[#3B3B3B]/60">No users found.</p>
        </div>
      ) : (
        <div className="rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#DFD3B5]/40">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Username</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#3B3B3B]/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-[#DFD3B5]/30 last:border-0 transition-colors hover:bg-[#DFD3B5]/10">
                    <td className="px-6 py-4 text-sm font-medium text-[#675647]">{u.id}</td>
                    <td className="px-6 py-4 text-sm text-[#3B3B3B]/70">{u.username}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button type="button" onClick={() => onEdit(u)} className="inline-flex items-center gap-1.5 rounded-lg bg-[#DFD3B5]/30 px-3 py-1.5 text-xs font-medium text-[#675647] transition-colors hover:bg-[#DFD3B5]/50">
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        {u.username !== loggedInUsername && (
                          <button type="button" onClick={() => handleDelete(u)} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
