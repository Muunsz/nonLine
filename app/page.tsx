import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import HeroSection from './components/HeroSection'
import MovieCarousel from './components/MovieCarousel'
import ContinueWatching from './components/ContinueWatching'

export default function Home() {
  return (
    <div className="space-y-12 pt-16">
      <HeroSection />
      
      <ContinueWatching />

      <section>
        <h2 className="text-2xl font-bold mb-4">Film Terpopuler</h2>
        <MovieCarousel category="popular" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Serial Terbaru</h2>
        <MovieCarousel category="series" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Akan Datang</h2>
        <MovieCarousel category="upcoming" />
      </section>
    </div>
  )
}

