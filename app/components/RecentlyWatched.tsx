'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Movie {
  id: number;
  title: string;
  image: string;
}

export default function RecentlyWatched() {
  const [recentMovies, setRecentMovies] = useState<Movie[]>([])

  useEffect(() => {
    // In a real application, this would fetch data from an API or local storage
    const mockRecentMovies = [
      { id: 1, title: 'Inception', image: '/placeholder.svg' },
      { id: 2, title: 'The Dark Knight', image: '/placeholder.svg' },
      { id: 3, title: 'Interstellar', image: '/placeholder.svg' },
      { id: 4, title: 'Pulp Fiction', image: '/placeholder.svg' },
    ]
    setRecentMovies(mockRecentMovies)
  }, [])

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Baru Ditonton</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {recentMovies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id} className="flex-shrink-0">
            <Image src={movie.image} alt={movie.title} width={100} height={150} className="rounded-md" />
            <p className="mt-2 text-sm text-center">{movie.title}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

