"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginModal from "app/components/LoginModal"

export default function Home() {
  const router = useRouter()
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/dashboard")
    } else {
      setShowLogin(true)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-8">Bienvenido a la Plataforma de Reserva de Bodas</h1>
        <p className="mb-4">Inicia sesión para comenzar a planificar tu boda perfecta.</p>
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </main>
    </div>
  )
}

