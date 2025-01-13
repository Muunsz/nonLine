'use client'

import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'

// Dummy data untuk contoh
const allMovies = [
  { id: 1, title: 'Inception', year: 2010, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', viewCount: 1000000, isPopular: true, resolution: '1080p', country: 'United States' },
  { id: 2, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', viewCount: 2000000, isPopular: true, resolution: '4K', country: 'United States' },
  { id: 3, title: 'The Dark Knight', year: 2008, rating: 9.0, image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', viewCount: 1500000, isPopular: true, resolution: '1080p', country: 'United States' },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // In a real application, you would fetch the user's favorites from an API or local storage
    const dummyFavorites = allMovies.slice(0, 3) // Just use the first 3 movies as favorites for this example
    setFavorites(dummyFavorites)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Film Favorit Anda</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>Anda belum memiliki film favorit.</p>
      )}
    </div>
  )
}

