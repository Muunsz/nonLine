'use client'

import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'

const upcomingMovies = [
  { id: 101, title: 'Dune: Part Two', year: 2023, rating: 0, image: 'https://m.media-amazon.com/images/M/MV5BODI0YjNhNjUtYjM0My00MTUwLWFlYTMtMWI2NGUzYjNjNGMzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg', viewCount: 0, isPopular: false, isNewRelease: true, resolution: '4K', country: 'United States' },
  { id: 102, title: 'The Batman 2', year: 2024, rating: 0, image: 'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg', viewCount: 0, isPopular: false, isNewRelease: true, resolution: '4K', country: 'United States' },
  { id: 103, title: 'Avatar 3', year: 2024, rating: 0, image: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg', viewCount: 0, isPopular: false, isNewRelease: true, resolution: '4K', country: 'United States' },
  { id: 104, title: 'Furiosa', year: 2024, rating: 0, image: 'https://m.media-amazon.com/images/M/MV5BNmQyNGVjMDUtYzU3My00NzRhLTg1NTctNDU5ZGVhMzYzNGIxXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg', viewCount: 0, isPopular: false, isNewRelease: true, resolution: '4K', country: 'Australia' },
]

export default function UpcomingPage() {
  const [movies, setMovies] = useState(upcomingMovies)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Serial dan Film Akan Datang</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

