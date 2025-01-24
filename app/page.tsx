import Header from './components/Header'
import MainContent from './components/MainContent'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
      <Header />
      <MainContent />
    </div>
  )
}

