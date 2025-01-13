'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, TrendingUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  image: string;
  viewCount: number;
}

const allTopMovies: Movie[] = [
  { id: 1, title: 'Inception', year: 2010, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', viewCount: 1000000 },
  { id: 2, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', viewCount: 2000000 },
  { id: 3, title: 'The Dark Knight', year: 2008, rating: 9.0, image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', viewCount: 1500000 },
  { id: 4, title: 'Pulp Fiction', year: 1994, rating: 8.9, image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 1200000 },
  { id: 5, title: 'Forrest Gump', year: 1994, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', viewCount: 1800000 },
]

export default function TopMovies() {
  const [timeFilter, setTimeFilter] = useState('all')

  const filteredMovies = allTopMovies.filter(movie => {
    const currentYear = new Date().getFullYear()
    if (timeFilter === 'week') {
      // This is a simplified example. In a real app, you'd use actual dates.
      return movie.year === currentYear
    } else if (timeFilter === 'year') {
      return movie.year === currentYear
    }
    return true
  })

  return (
    <div>
      <div className="mb-4">
        <Select onValueChange={setTimeFilter} defaultValue={timeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Waktu</SelectItem>
            <SelectItem value="week">Minggu Ini</SelectItem>
            <SelectItem value="year">Tahun Ini</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMovies.map((movie, index) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div className="relative">
              <Image src={movie.image} alt={movie.title} width={200} height={300} className="w-full h-48 object-cover" />
              <div className="absolute top-0 left-0 bg-blue-600 text-white px-2 py-1 text-sm font-bold">
                #{index + 1}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1 truncate">{movie.title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>{movie.year}</span>
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                  <span>{movie.rating}</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{movie.viewCount.toLocaleString()} views</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

