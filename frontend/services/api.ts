import type {
  PartnershipRequest,
  JobApplication,
  ComplaintRequest,
  PartnershipResponse,
  JobApplicationResponse,
  ComplaintResponse,
  ListShippingDTO,
  NewShippingDTO,
  UpdateShippingDTO,
  NewOfferDTO,
  ListOfferDTO,
  OfferStatus,
  UserDTO,
  RegisterUserDTO,
  UpdateUserDTO,
} from "@/types"

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  "http://localhost:8080"

function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (token) headers["Authorization"] = `Bearer ${token}`
  return headers
}

async function apiRequest<T>(
  endpoint: string,
  data: T
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    return { success: true, message: "Request submitted successfully!" }
  } catch {
    return {
      success: false,
      message: "Failed to submit request. Please try again later.",
    }
  }
}

export async function submitPartnership(data: PartnershipRequest) {
  return apiRequest("/communication/partnership", data)
}

export async function submitJobApplication(data: JobApplication) {
  return apiRequest("/communication/apply", data)
}

export async function submitComplaint(data: ComplaintRequest) {
  return apiRequest("/communication/complaint", data)
}

export async function fetchPartnerships(): Promise<PartnershipResponse[]> {
  const response = await fetch(`${BASE_URL}/communication/partnership`, {
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to fetch partnerships")
  return response.json()
}

export async function fetchApplications(): Promise<JobApplicationResponse[]> {
  const response = await fetch(`${BASE_URL}/communication/apply`, {
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to fetch applications")
  return response.json()
}

export async function fetchComplaints(): Promise<ComplaintResponse[]> {
  const response = await fetch(`${BASE_URL}/communication/complaint`, {
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to fetch complaints")
  return response.json()
}

export async function deletePartnership(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/communication/partnership/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to delete partnership")
}

export async function deleteApplication(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/communication/apply/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to delete application")
}

// Shipping CRUD
export async function fetchShippings(): Promise<ListShippingDTO[]> {
  const response = await fetch(`${BASE_URL}/shipping`, {
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to fetch shippings")
  return response.json()
}

export async function createShipping(data: NewShippingDTO): Promise<void> {
  const response = await fetch(`${BASE_URL}/shipping`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to create shipping")
}

export async function updateShipping(id: number, data: UpdateShippingDTO): Promise<void> {
  const response = await fetch(`${BASE_URL}/shipping/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to update shipping")
}

export async function deleteShipping(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/shipping/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to delete shipping")
}

// Offers
export async function submitOffer(data: NewOfferDTO): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${BASE_URL}/communication/offer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
    return { success: true, message: "Offer submitted successfully!" }
  } catch {
    return { success: false, message: "Failed to submit offer. Please try again later." }
  }
}

export async function fetchOffers(): Promise<ListOfferDTO[]> {
  const response = await fetch(`${BASE_URL}/communication/offer`, {
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to fetch offers")
  return response.json()
}

export async function deleteOffer(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/communication/offer/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to delete offer")
}

export async function updateOfferStatus(id: number, status: OfferStatus): Promise<void> {
  const response = await fetch(`${BASE_URL}/communication/offer/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  })
  if (!response.ok) throw new Error("Failed to update offer status")
}

// Users
export async function fetchUsers(): Promise<UserDTO[]> {
  const response = await fetch(`${BASE_URL}/auth`, {
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to fetch users")
  return response.json()
}

export async function registerUser(data: RegisterUserDTO): Promise<void> {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to register user: " + response.statusText)
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/auth/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to delete user")
}

export async function updateUser(id: number, data: UpdateUserDTO): Promise<void> {
  const response = await fetch(`${BASE_URL}/auth/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to update user")
}
