'use client'

import { useState, useMemo } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MovieCard from '../components/MovieCard'
import EpisodicMovieCard from '../components/EpisodicMovieCard'
import { useLanguage } from '../contexts/LanguageContext'

const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const countries = ['United States', 'United Kingdom', 'France', 'Japan', 'South Korea', 'India', 'Germany', 'Italy', 'Spain', 'Canada']
const genres = ['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller']

const allMovies = [
  { id: 1, title: 'Inception', year: 2010, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', viewCount: 1000000, isPopular: true, resolution: '1080p', country: 'United States', genre: 'Sci-Fi' },
  { id: 2, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', viewCount: 2000000, isPopular: true, resolution: '4K', country: 'United States', genre: 'Drama' },
  { id: 3, title: 'The Dark Knight', year: 2008, rating: 9.0, image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', viewCount: 1500000, isPopular: true, resolution: '1080p', country: 'United States', genre: 'Action' },
  { id: 4, title: 'Pulp Fiction', year: 1994, rating: 8.9, image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 1200000, isPopular: false, resolution: '720p', country: 'United States', genre: 'Crime' },
  { id: 5, title: 'Forrest Gump', year: 1994, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', viewCount: 1800000, isPopular: true, resolution: '4K', country: 'United States', genre: 'Drama' },
  { id: 101, title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, rating: 9.0, image: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg', viewCount: 3000000, isPopular: true, resolution: '4K', episodeCount: 3, country: 'New Zealand', genre: 'Fantasy' },
  { id: 102, title: 'Harry Potter and the Sorcerer\'s Stone', year: 2001, rating: 8.5, image: 'https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg', viewCount: 2500000, isPopular: true, resolution: '1080p', episodeCount: 8, country: 'United Kingdom', genre: 'Fantasy' },
  { id: 103, title: 'Star Wars: Episode IV - A New Hope', year: 1977, rating: 9.2, image: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 3500000, isPopular: true, resolution: '4K', episodeCount: 3, country: 'United States', genre: 'Sci-Fi' },
  { id: 6, title: '12 Angry Men', year: 1957, rating: 9.0, image: 'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg', viewCount: 1000000, isPopular: false, resolution: '1080p', country: 'United States', genre: 'Drama' },
  { id: 7, title: 'Schindler\'s List', year: 1993, rating: 9.0, image: 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', viewCount: 1100000, isPopular: true, resolution: '4K', country: 'United States', genre: 'Biography' },
  { id: 8, title: 'The Godfather', year: 1972, rating: 9.2, image: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 2200000, isPopular: true, resolution: '4K', country: 'United States', genre: 'Crime' },
  { id: 9, title: 'The Matrix', year: 1999, rating: 8.7, image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', viewCount: 1900000, isPopular: true, resolution: '4K', country: 'United States', genre: 'Sci-Fi' },
  { id: 10, title: 'Goodfellas', year: 1990, rating: 8.7, image: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 1300000, isPopular: true, resolution: '1080p', country: 'United States', genre: 'Crime' },
]

export default function SortPage() {
  const { t } = useLanguage()
  const [sortOption, setSortOption] = useState('popularity')
  const [letterFilter, setLetterFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('all')
  const [genreFilter, setGenreFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMovies = useMemo(() => {
    return allMovies.filter(movie => {
      const matchesLetter = letterFilter === '' || 
        (letterFilter === '#' ? /^\d/.test(movie.title) : movie.title.toLowerCase().startsWith(letterFilter.toLowerCase()))
      const matchesCountry = countryFilter === 'all' || countryFilter === '' || movie.country === countryFilter
      const matchesGenre = genreFilter === 'all' || genreFilter === '' || movie.genre === genreFilter
      const matchesSearch = searchTerm === '' || movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesLetter && matchesCountry && matchesGenre && matchesSearch
    }).sort((a, b) => {
      if (sortOption === 'popularity') return b.viewCount - a.viewCount
      if (sortOption === 'rating') return b.rating - a.rating
      if (sortOption === 'year') return b.year - a.year
      if (sortOption === 'title') return a.title.localeCompare(b.title)
      return 0
    })
  }, [allMovies, sortOption, letterFilter, countryFilter, genreFilter, searchTerm])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('sortAndFilterMovies')}</h1>
      
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <Select onValueChange={setSortOption} value={sortOption}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={t('sortBy')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">{t('popularity')}</SelectItem>
              <SelectItem value="rating">{t('rating')}</SelectItem>
              <SelectItem value="year">{t('year')}</SelectItem>
              <SelectItem value="title">{t('title')}</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setCountryFilter} value={countryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={t('filterByCountry')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allCountries')}</SelectItem>
              {countries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setGenreFilter} value={genreFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={t('filterByGenre')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allGenres')}</SelectItem>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <form onSubmit={(e) => { e.preventDefault(); }} className="w-full sm:w-auto">
            <Input
              type="text"
              placeholder={t('searchMovies')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[250px]"
            />
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-full overflow-x-auto py-2">
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={letterFilter === letter ? "default" : "outline"}
              onClick={() => setLetterFilter(letterFilter === letter ? '' : letter)}
              className="w-8 h-8 p-0 text-xs sm:w-10 sm:h-10 sm:text-sm"
            >
              {letter}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="w-full">
            {'episodeCount' in movie ? (
              <EpisodicMovieCard movie={movie} />
            ) : (
              <MovieCard movie={movie} />
            )}
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <p className="text-center text-gray-500 mt-8">{t('noMoviesFound')}</p>
      )}
    </div>
  )
}

