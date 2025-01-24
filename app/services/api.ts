const API_BASE_URL = "http://localhost:8080"

export interface Service {
  id: string
  name: string
  description: string
  price: number
  category: string
}

export interface EventDetails {
  province: string
  location: string
  date: Date | undefined
  time: string
  guests: number
}

export interface ServiceSelection {
  catering: string
  music: string
  decoration: string
  photography: string
}

export async function fetchServices(category: string): Promise<Service[]> {
  const response = await fetch(`${API_BASE_URL}/weddingServ/${category}`)
  if (!response.ok) {
    throw new Error("Failed to fetch services")
  }
  return response.json()
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/category`)
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
}

export async function saveService(service: Omit<Service, "id">): Promise<Service> {
  const response = await fetch(`${API_BASE_URL}/weddingServSave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  })
  if (!response.ok) {
    throw new Error("Failed to save service")
  }
  return response.json()
}

export async function updateService(service: Service): Promise<Service> {
  const response = await fetch(`${API_BASE_URL}/weddingServEdit/${service.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  })
  if (!response.ok) {
    throw new Error("Failed to update service")
  }
  return response.json()
}

export async function deleteService(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/weddingServDelete/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete service")
  }
}

