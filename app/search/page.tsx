'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import MovieCard from '../components/MovieCard'

// Dummy data for example
const allMovies = [
  { id: 1, title: 'Inception', year: 2010, rating: 8.8, image: '/placeholder.svg', viewCount: 1000000, isPopular: true },
  { id: 2, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, image: '/placeholder.svg', viewCount: 2000000, isPopular: true },
  { id: 3, title: 'The Dark Knight', year: 2008, rating: 9.0, image: '/placeholder.svg', viewCount: 1500000, isPopular: true },
  { id: 4, title: 'Pulp Fiction', year: 1994, rating: 8.9, image: '/placeholder.svg', viewCount: 1200000, isPopular: false },
  { id: 5, title: 'Forrest Gump', year: 1994, rating: 8.8, image: '/placeholder.svg', viewCount: 1800000, isPopular: true },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (query) {
      const results = allMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
    }
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hasil Pencarian untuk "{query}"</h1>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>Tidak ada hasil yang ditemukan untuk "{query}"</p>
      )}
    </div>
  )
}

