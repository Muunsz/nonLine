'use client'

import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const countries = [
  // Europe
  'United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Russia', 'Sweden', 'Denmark', 'Poland',
  // Africa
  'Nigeria', 'South Africa', 'Egypt', 'Kenya', 'Morocco',
  // Asia
  'Japan', 'South Korea', 'China', 'India', 'Indonesia', 'Thailand', 'Vietnam', 'Iran',
  // Americas
  'United States', 'Canada', 'Brazil', 'Mexico', 'Argentina',
  // Australia and Oceania
  'Australia', 'New Zealand'
]

const movies = [
  // United States
  { id: 1, title: 'Inception', year: 2010, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', viewCount: 1000000, country: 'United States', isPopular: true, resolution: '4K' },
  { id: 2, title: 'The Godfather', year: 1972, rating: 9.2, image: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 1200000, country: 'United States', isPopular: true, resolution: '4K' },
  { id: 3, title: 'Pulp Fiction', year: 1994, rating: 8.9, image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 950000, country: 'United States', isPopular: true, resolution: '4K' },

  // United Kingdom
  { id: 4, title: 'The King\'s Speech', year: 2010, rating: 8.0, image: 'https://m.media-amazon.com/images/M/MV5BMzU5MjEwMTg2Nl5BMl5BanBnXkFtZTcwNzM3MTYxNA@@._V1_SX300.jpg', viewCount: 800000, country: 'United Kingdom', isPopular: false, resolution: '1080p' },
  { id: 5, title: '1917', year: 2019, rating: 8.3, image: 'https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_SX300.jpg', viewCount: 750000, country: 'United Kingdom', isPopular: true, resolution: '4K' },

  // France
  { id: 6, title: 'Amélie', year: 2001, rating: 8.3, image: 'https://m.media-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg', viewCount: 600000, country: 'France', isPopular: true, resolution: '1080p' },
  { id: 7, title: 'The Intouchables', year: 2011, rating: 8.5, image: 'https://m.media-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SX300.jpg', viewCount: 700000, country: 'France', isPopular: true, resolution: '1080p' },

  // Japan
  { id: 8, title: 'Spirited Away', year: 2001, rating: 8.6, image: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', viewCount: 700000, country: 'Japan', isPopular: true, resolution: '4K' },
  { id: 9, title: 'Your Name', year: 2016, rating: 8.4, image: 'https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_SX300.jpg', viewCount: 650000, country: 'Japan', isPopular: true, resolution: '4K' },

  // South Korea
  { id: 10, title: 'Parasite', year: 2019, rating: 8.6, image: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg', viewCount: 900000, country: 'South Korea', isPopular: true, resolution: '4K' },
  { id: 11, title: 'Oldboy', year: 2003, rating: 8.4, image: 'https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg', viewCount: 550000, country: 'South Korea', isPopular: true, resolution: '1080p' },

  // India
  { id: 12, title: '3 Idiots', year: 2009, rating: 8.4, image: 'https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', viewCount: 850000, country: 'India', isPopular: true, resolution: '1080p' },
  { id: 13, title: 'Dangal', year: 2016, rating: 8.4, image: 'https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SX300.jpg', viewCount: 800000, country: 'India', isPopular: true, resolution: '4K' },

  // Indonesia
  { id: 14, title: 'The Raid', year: 2011, rating: 7.6, image: 'https://m.media-amazon.com/images/M/MV5BZGIxNDIwNTgtMDg5Yi00ZDNhLThhNmYtNjI5NzM1NmU2ZDNjXkEyXkFqcGdeQXVyMjQ2MTk1OTE@._V1_SX300.jpg', viewCount: 500000, country: 'Indonesia', isPopular: true, resolution: '1080p' },
  { id: 15, title: 'Laskar Pelangi', year: 2008, rating: 7.9, image: 'https://m.media-amazon.com/images/M/MV5BZjJhNTBmNTgtMDViOC00NDY2LWE4N2ItMDJiM2ZiYmQzYzliXkEyXkFqcGdeQXVyMzY3MDU4NDk@._V1_SX300.jpg', viewCount: 400000, country: 'Indonesia', isPopular: true, resolution: '1080p' },
  { id: 16, title: 'Pengabdi Setan', year: 2017, rating: 7.0, image: 'https://m.media-amazon.com/images/M/MV5BN2RkMDY5NTUtZGU0NC00NzNlLTgwOTUtMWI0NzBhOTRiOGU3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_SX300.jpg', viewCount: 350000, country: 'Indonesia', isPopular: true, resolution: '4K' },

  // China
  { id: 17, title: 'Crouching Tiger, Hidden Dragon', year: 2000, rating: 7.9, image: 'https://m.media-amazon.com/images/M/MV5BNDdhMzMxOTctNDMyNS00NTZmLTljNWEtNTc4MDBmZTYxY2NmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', viewCount: 750000, country: 'China', isPopular: true, resolution: '4K' },
  { id: 18, title: 'In the Mood for Love', year: 2000, rating: 8.1, image: 'https://m.media-amazon.com/images/M/MV5BYjZjODRlMjQtMjJlYy00ZDBjLTkyYTQtZGQxZTk5NzJhYmNmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', viewCount: 450000, country: 'China', isPopular: false, resolution: '1080p' },

  // Germany
  { id: 19, title: 'Run Lola Run', year: 1998, rating: 7.7, image: 'https://m.media-amazon.com/images/M/MV5BNGIzY2IzODQtNThmMi00ZDE4LWI5YzAtNzNlZTM1ZjYyYjUyXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_SX300.jpg', viewCount: 450000, country: 'Germany', isPopular: false, resolution: '1080p' },
  { id: 20, title: 'The Lives of Others', year: 2006, rating: 8.4, image: 'https://m.media-amazon.com/images/M/MV5BOTQxOGU0OWUtMzExYy00ZjIxLWJmMzAtNTI1ZTcyYjRjYmE3XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg', viewCount: 500000, country: 'Germany', isPopular: true, resolution: '1080p' },

  // Italy
  { id: 21, title: 'Cinema Paradiso', year: 1988, rating: 8.5, image: 'https://m.media-amazon.com/images/M/MV5BM2FhYjEyYmYtMDI1Yy00YTdlLWI2NWQtYmEzNzAxOGY1NjY2XkEyXkFqcGdeQXVyNTA3NTIyNDg@._V1_SX300.jpg', viewCount: 550000, country: 'Italy', isPopular: true, resolution: '4K' },
  { id: 22, title: 'Life Is Beautiful', year: 1997, rating: 8.6, image: 'https://m.media-amazon.com/images/M/MV5BYmJmM2Q4NmMtYThmNC00ZjRlLWEyZmItZTIwOTBlZDQ3NTQ1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', viewCount: 600000, country: 'Italy', isPopular: true, resolution: '1080p' },

  // Nigeria
  { id: 23, title: 'The Figurine', year: 2009, rating: 7.1, image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', viewCount: 200000, country: 'Nigeria', isPopular: false, resolution: '1080p' },
  { id: 24, title: 'Lionheart', year: 2018, rating: 6.2, image: 'https://m.media-amazon.com/images/M/MV5BZDhjODJlYWItYWJlMy00OWMyLTg5ZTUtNWY1ZjNiOTU5YzY1XkEyXkFqcGdeQXVyMzY0MTE3Nz@._V1_SX300.jpg', viewCount: 250000, country: 'Nigeria', isPopular: true, resolution: '4K' },

  // Brazil
  { id: 25, title: 'City of God', year: 2002, rating: 8.6, image: 'https://m.media-amazon.com/images/M/MV5BOTMwYjc5ZmItYTFjZC00ZGQ3LTlkNTMtMjZiNTZlMWQzNzI5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', viewCount: 700000, country: 'Brazil', isPopular: true, resolution: '1080p' },
  { id: 26, title: 'Central Station', year: 1998, rating: 8.0, image: 'https://m.media-amazon.com/images/M/MV5BNmFuYzlkZmUtZDY0Yi00NmJlLWE3MGQtYmFiNzNhYjM3MzY3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', viewCount: 350000, country: 'Brazil', isPopular: false, resolution: '1080p' },

  // Australia
  { id: 27, title: 'Mad Max: Fury Road', year: 2015, rating: 8.1, image: 'https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', viewCount: 850000, country: 'Australia', isPopular: true, resolution: '4K' },
  { id: 28, title: 'The Babadook', year: 2014, rating: 6.8, image: 'https://m.media-amazon.com/images/M/MV5BMTk0NzMzODc2NF5BMl5BanBnXkFtZTgwOTYzNTM1MzE@._V1_SX300.jpg', viewCount: 400000, country: 'Australia', isPopular: false, resolution: '1080p' },
]

export default function CountriesPage() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMovies = movies.filter(movie => 
    (selectedCountry === '' || movie.country === selectedCountry) &&
    (searchTerm === '' || movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold mb-6">Film berdasarkan Negara</h1>
      
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Cari film..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <Button
          onClick={() => setSelectedCountry('')}
          variant={selectedCountry === '' ? "default" : "outline"}
        >
          Semua Negara
        </Button>
        {countries.map(country => (
          <Button
            key={country}
            onClick={() => setSelectedCountry(country)}
            variant={selectedCountry === country ? "default" : "outline"}
          >
            {country}
          </Button>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold mb-4">
        {selectedCountry ? `Film dari ${selectedCountry}` : 'Semua Film'}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {filteredMovies.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Tidak ada film yang tersedia untuk kriteria pencarian ini.</p>
      )}
    </div>
  )
}

