'use client'

import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const series = [
  { id: 1, title: 'Stranger Things', year: 2016, rating: 8.7, image: 'https://m.media-amazon.com/images/M/MV5BN2ZmYjg1YmItNWQ4OC00YWM0LWE0ZDktYThjOTZiZjhhN2Q2XkEyXkFqcGdeQXVyNjgxNTQ3Mjk@._V1_SX300.jpg', viewCount: 5000000, isPopular: true, resolution: '4K', country: 'United States' },
  { id: 2, title: 'Breaking Bad', year: 2008, rating: 9.5, image: 'https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTYtZTA3ZWFkODRkNmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 6000000, isPopular: true, resolution: '1080p', country: 'United States' },
  { id: 3, title: 'Game of Thrones', year: 2011, rating: 9.3, image: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg', viewCount: 7000000, isPopular: true, resolution: '4K', country: 'United States' },
  { id: 4, title: 'The Crown', year: 2016, rating: 8.6, image: 'https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjctNTRmNy00Njk3LWFjMzctMWQwZDAwMGJmY2MyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg', viewCount: 3000000, isPopular: false, resolution: '1080p', country: 'United Kingdom' },
  { id: 5, title: 'The Mandalorian', year: 2019, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SX300.jpg', viewCount: 4000000, isPopular: true, resolution: '4K', country: 'United States' },
]

export default function SeriesPage() {
  const [sortOption, setSortOption] = useState('popularity')

  const sortedSeries = [...series].sort((a, b) => {
    if (sortOption === 'popularity') {
      return b.viewCount - a.viewCount
    } else if (sortOption === 'rating') {
      return b.rating - a.rating
    } else if (sortOption === 'year') {
      return b.year - a.year
    }
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Serial TV</h1>
      
      <div className="mb-6">
        <Select onValueChange={setSortOption} defaultValue={sortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Urutkan berdasarkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularitas</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="year">Tahun</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedSeries.map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>
    </div>
  )
}

