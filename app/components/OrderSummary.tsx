"use client"

import { useEffect, useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { fetchServices } from "@/app/services/api"
import type { Service, ServiceSelection, EventDetails } from "@/app/services/api"

interface OrderSummaryProps {
  services: ServiceSelection
  details: EventDetails
  onBack: () => void
}

export default function OrderSummary({ services, details, onBack }: OrderSummaryProps) {
  const [selectedServices, setSelectedServices] = useState<Service[]>([])

  useEffect(() => {
    const loadSelectedServices = async () => {
      const servicePromises = Object.entries(services).map(async ([category, serviceId]) => {
        if (serviceId) {
          const categoryServices = await fetchServices(category)
          return categoryServices.find((service) => service.id === serviceId)
        }
        return null
      })

      const loadedServices = await Promise.all(servicePromises)
      setSelectedServices(loadedServices.filter((service): service is Service => service !== null))
    }

    loadSelectedServices()
  }, [services])

  const total = selectedServices.reduce((sum, service) => sum + service.price, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Órdenes de Servicios para Bodas</h2>
        <Button onClick={onBack} variant="outline">
          Volver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orden #1 - Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-medium">Fecha del evento:</p>
              <p>{details.date ? format(details.date, "dd/MM/yyyy", { locale: es }) : "No seleccionada"}</p>
            </div>
            <div>
              <p className="font-medium">Ubicación:</p>
              <p>{details.location || "No seleccionada"}</p>
            </div>
            <div>
              <p className="font-medium">Estado:</p>
              <p className="text-green-600">Confirmada</p>
            </div>
            <div>
              <p className="font-medium">Total:</p>
              <p className="text-xl font-bold">${total}</p>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Servicio</th>
                <th className="text-right py-2">Precio</th>
              </tr>
            </thead>
            <tbody>
              {selectedServices.map((service) => (
                <tr key={service.id} className="border-b">
                  <td className="py-2">{service.name}</td>
                  <td className="text-right">${service.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

