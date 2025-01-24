"use client"

import { useState } from "react"
import ServiceBooking from "@/app/components/ServiceBooking"
import OrderSummary from "app/components/OrderSummary"
import type { EventDetails, ServiceSelection } from "@/app/services/api"

export default function DashboardPage() {
  const [showOrder, setShowOrder] = useState(false)
  const [services, setServices] = useState<ServiceSelection>({
    catering: "",
    music: "",
    decoration: "",
    photography: "",
  })
  const [details, setDetails] = useState<EventDetails>({
    province: "",
    location: "",
    date: undefined,
    time: "12:00",
    guests: 100,
  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <main className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Servicios para tu Boda</h1>
        {showOrder ? (
          <OrderSummary services={services} details={details} onBack={() => setShowOrder(false)} />
        ) : (
          <ServiceBooking
            services={services}
            setServices={setServices}
            details={details}
            setDetails={setDetails}
            onShowOrder={() => setShowOrder(true)}
          />
        )}
      </main>
    </div>
  )
}

