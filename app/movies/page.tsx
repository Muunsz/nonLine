'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import MovieCard from '../components/MovieCard'
import EpisodicMovieCard from '../components/EpisodicMovieCard'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const movies = [
  { id: 1, title: 'Inception', year: 2010, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', viewCount: 1000000, isPopular: true, resolution: '1080p', country: 'United States', genre: 'Sci-Fi' },
  { id: 2, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', viewCount: 2000000, isPopular: true, resolution: '4K', country: 'United States', genre: 'Drama' },
  { id: 3, title: 'The Dark Knight', year: 2008, rating: 9.0, image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', viewCount: 1500000, isPopular: true, resolution: '1080p', country: 'United States', genre: 'Action' },
  { id: 4, title: 'Pulp Fiction', year: 1994, rating: 8.9, image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 1200000, isPopular: false, resolution: '720p', country: 'United States', genre: 'Crime' },
  { id: 5, title: 'Forrest Gump', year: 1994, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', viewCount: 1800000, isPopular: true, resolution: '4K', country: 'United States', genre: 'Drama' },
]

const episodicMovies = [
  { id: 101, title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, rating: 9.0, image: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg', viewCount: 3000000, isPopular: true, resolution: '4K', episodeCount: 3, country: 'New Zealand', genre: 'Fantasy' },
  { id: 102, title: 'Harry Potter and the Sorcerer\'s Stone', year: 2001, rating: 8.5, image: 'https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg', viewCount: 2500000, isPopular: true, resolution: '1080p', episodeCount: 8, country: 'United Kingdom', genre: 'Fantasy' },
  { id: 103, title: 'Star Wars: Episode IV - A New Hope', year: 1977, rating: 9.2, image: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 3500000, isPopular: true, resolution: '4K', episodeCount: 3, country: 'United States', genre: 'Sci-Fi' },
]

export default function MoviesPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [sortOption, setSortOption] = useState('popularity')
  const [genreFilter, setGenreFilter] = useState('all')

  const allMovies = useMemo(() => [...movies, ...episodicMovies], [])

  const filteredMovies = useMemo(() => {
    let filtered = activeTab === 'movies' ? movies : activeTab === 'series' ? episodicMovies : allMovies

    if (genreFilter !== 'all') {
      filtered = filtered.filter(movie => movie.genre === genreFilter)
    }

    return filtered.sort((a, b) => {
      if (sortOption === 'popularity') return b.viewCount - a.viewCount
      if (sortOption === 'rating') return b.rating - a.rating
      if (sortOption === 'year') return b.year - a.year
      return 0
    })
  }, [allMovies, activeTab, sortOption, genreFilter])

  const genres = ['all', ...new Set(allMovies.map(movie => movie.genre))]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Film dan Serial</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="movies">Film</TabsTrigger>
            <TabsTrigger value="series">Serial</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex space-x-4">
          <Select onValueChange={setSortOption} value={sortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Urutkan berdasarkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularitas</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="year">Tahun</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setGenreFilter} value={genreFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter berdasarkan genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre === 'all' ? 'Semua Genre' : genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Link href="/sort">
            <Button>Sortir Lanjutan</Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          'episodeCount' in movie ? (
            <EpisodicMovieCard key={movie.id} movie={movie} />
          ) : (
            <MovieCard key={movie.id} movie={movie} />
          )
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Tidak ada film atau serial yang sesuai dengan kriteria pencarian Anda.</p>
      )}
    </div>
  )
}

