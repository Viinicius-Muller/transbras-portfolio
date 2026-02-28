export interface Shipping {
  id: string
  scheduledDate: string
  createdAt: string
  from: string
  to: string
  cargoType: string
  weight: number
  distance: number
  offers: Offer[]
}

export interface Offer {
  id: string
  shippingId: string
  amount: number
  company: string
  createdAt: string
}

export interface ListShippingDTO {
  id: number
  scheduledDate: string
  from: string
  to: string
  cargoType: string
  weight: number
  distance: number
}

export interface NewShippingDTO {
  scheduledDate: string
  from: string
  to: string
  cargoType: string
  weight: number
  distance: number
}

export interface UpdateShippingDTO {
  scheduledDate?: string
  from?: string
  to?: string
  cargoType?: string
  weight?: number
  distance?: number
}

export interface PartnershipRequest {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  partnershipType: "SUPPLIER" | "CUSTOMER" | "PARTNER"
  companyName?: string
  message: string
}

export interface JobApplication {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  message: string
}

export interface ComplaintRequest {
  fullname: string
  email: string
  phoneNumber: string
  message: string
  victim: boolean
}

export interface PartnershipResponse {
  id: number
  fullname: string
  email: string
  phoneNumber: string
  partnershipType: "SUPPLIER" | "CUSTOMER" | "PARTNER"
  companyName?: string
  message: string
}

export interface JobApplicationResponse {
  id: number
  fullname: string
  email: string
  phoneNumber: string
  message: string
}

export interface ComplaintResponse extends ComplaintRequest {
  id: number
}

// Offer types for the communication/offer endpoints
export type OfferStatus = "ACCEPTED" | "REJECTED" | "PENDING"

export interface NewOfferDTO {
  shippingId: number
  fullname: string
  email: string
  phoneNumber: string
  initialValue: number
  message: string
}

export interface ListOfferDTO {
  id: number
  shippingId: number
  fullname: string
  email: string
  phoneNumber: string
  initialValue: string
  message: string
  status: OfferStatus
}

// User types
export interface UserDTO {
  id: number
  username: string
}

export interface RegisterUserDTO {
  username: string
  password: string
}

export interface UpdateUserDTO {
  username: string
  password: string
}
