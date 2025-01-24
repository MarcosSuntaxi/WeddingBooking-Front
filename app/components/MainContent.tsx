import { Button } from '@/app/components/ui/button'

export default function MainContent() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Reserva tu boda de ensueño</h1>
      <p className="text-xl text-center mb-12">
        Encuentra los mejores lugares y servicios para hacer de tu día especial un momento inolvidable.
      </p>
      <div className="flex justify-center">
        <Button className="text-lg px-8 py-4">Explorar venues</Button>
      </div>
    </main>
  )
}

