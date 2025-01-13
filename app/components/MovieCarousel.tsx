'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import MovieCard from './MovieCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const movies = [
  { id: 1, title: 'Inception', year: 2010, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', viewCount: 1000000, isPopular: true, resolution: '1080p', country: 'United States' },
  { id: 2, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', viewCount: 2000000, isPopular: true, resolution: '4K', country: 'United States' },
  { id: 3, title: 'The Dark Knight', year: 2008, rating: 9.0, image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', viewCount: 1500000, isPopular: true, resolution: '1080p', country: 'United States' },
  { id: 4, title: 'Pulp Fiction', year: 1994, rating: 8.9, image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 1200000, isPopular: false, resolution: '720p', country: 'United States' },
  { id: 5, title: 'Forrest Gump', year: 1994, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', viewCount: 1800000, isPopular: true, resolution: '4K', country: 'United States' },
  { id: 6, title: 'The Matrix', year: 1999, rating: 8.7, image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', viewCount: 1600000, isPopular: true, resolution: '4K', country: 'United States' },
  { id: 7, title: 'Goodfellas', year: 1990, rating: 8.7, image: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 1100000, isPopular: true, resolution: '1080p', country: 'United States' },
  { id: 8, title: 'The Silence of the Lambs', year: 1991, rating: 8.6, image: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', viewCount: 1300000, isPopular: false, resolution: '1080p', country: 'United States' },
]

export default function MovieCarousel({ category }: { category: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (currentIndex < movies.length - 4) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 25}%)`
    }
  }, [currentIndex])

  return (
    <div className="relative">
      <motion.div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ width: `${movies.length * 25}%` }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="w-1/4 px-2">
            <MovieCard movie={movie} />
          </div>
        ))}
      </motion.div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        disabled={currentIndex === 0}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        disabled={currentIndex === movies.length - 4}
      >
        <ChevronRight />
      </button>
    </div>
  )
}

