"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/app/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { fetchServices, fetchCategories } from "../services/api"
import type { Service, ServiceSelection, EventDetails } from "../services/api"

interface ServiceBookingProps {
  services: ServiceSelection
  setServices: React.Dispatch<React.SetStateAction<ServiceSelection>>
  details: EventDetails
  setDetails: React.Dispatch<React.SetStateAction<EventDetails>>
  onShowOrder: () => void
}

export default function ServiceBooking({
  services,
  setServices,
  details,
  setDetails,
  onShowOrder,
}: ServiceBookingProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [serviceOptions, setServiceOptions] = useState<Record<string, Service[]>>({})

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    loadCategories()
  }, [])

  useEffect(() => {
    const loadServices = async () => {
      const servicePromises = categories.map(async (category) => {
        try {
          const fetchedServices = await fetchServices(category)
          return { [category]: fetchedServices }
        } catch (error) {
          console.error(`Error fetching services for ${category}:`, error)
          return { [category]: [] }
        }
      })

      const results = await Promise.all(servicePromises)
      const newServiceOptions = Object.assign({}, ...results)
      setServiceOptions(newServiceOptions)
    }

    if (categories.length > 0) {
      loadServices()
    }
  }, [categories])

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={services[category.toLowerCase() as keyof ServiceSelection]}
                onValueChange={(value) =>
                  setServices((prev) => ({
                    ...prev,
                    [category.toLowerCase()]: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Selecciona ${category}`} />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions[category]?.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - ${service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Provincia</label>
                <Select
                  value={details.province}
                  onValueChange={(value) => setDetails((prev) => ({ ...prev, province: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pichincha">Pichincha</SelectItem>
                    <SelectItem value="guayas">Guayas</SelectItem>
                    <SelectItem value="azuay">Azuay</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Ubicación</label>
                <Select
                  value={details.location}
                  onValueChange={(value) => setDetails((prev) => ({ ...prev, location: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salon1">Salón de fiestas El Edén</SelectItem>
                    <SelectItem value="salon2">Centro de Eventos Luna</SelectItem>
                    <SelectItem value="salon3">Hacienda Los Olivos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Hora</label>
                <Input
                  type="time"
                  value={details.time}
                  onChange={(e) => setDetails((prev) => ({ ...prev, time: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Número de Invitados</label>
                <Input
                  type="number"
                  value={details.guests}
                  onChange={(e) => setDetails((prev) => ({ ...prev, guests: Number.parseInt(e.target.value) }))}
                  min={1}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Fecha</label>
              <Calendar
                mode="single"
                selected={details.date}
                onSelect={(date) => setDetails((prev) => ({ ...prev, date }))}
                className="rounded-md border"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button size="lg" onClick={onShowOrder}>
          Ver tu Orden
        </Button>
      </div>
    </div>
  )
}

