'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          WeddingBooker
        </Link>
        <nav>
          <Button variant="ghost" onClick={() => setIsLoginModalOpen(true)}>Iniciar sesión</Button>
          <Button variant="outline" className="ml-4" onClick={() => setIsRegisterModalOpen(true)}>Registrarse</Button>
        </nav>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </header>
  )
}

