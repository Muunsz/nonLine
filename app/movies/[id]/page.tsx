'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, Calendar, Clock, Download, Globe, MessageSquare, Heart, Play, List } from 'lucide-react'
import CommentSection from '../../components/CommentSection'
import RecommendedMovies from '../../components/RecommendedMovies'
import TopMovies from '../../components/TopMovies'
import Feedback from '../../components/Feedback'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  duration: string;
  genre: string[];
  director: string;
  cast: string[];
  description: string;
  image: string;
  country: string;
  releaseDate: string;
  viewCount: number;
  isPopular: boolean;
  resolution: string;
  episodeCount?: number;
}

const movies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    rating: 8.8,
    duration: '2h 28min',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    country: 'United States',
    releaseDate: '2010-07-16',
    viewCount: 1000000,
    isPopular: true,
    resolution: '4K',
  },
  {
    id: 2,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
    rating: 9.0,
    duration: '2h 58min',
    genre: ['Adventure', 'Drama', 'Fantasy'],
    director: 'Peter Jackson',
    cast: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom'],
    description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    image: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',
    country: 'New Zealand',
    releaseDate: '2001-12-19',
    viewCount: 3000000,
    isPopular: true,
    resolution: '4K',
    episodeCount: 3,
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
    duration: '2h 32min',
    genre: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    country: 'United States',
    releaseDate: '2008-07-18',
    viewCount: 2500000,
    isPopular: true,
    resolution: '4K',
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    year: 1994,
    rating: 8.9,
    duration: '2h 34min',
    genre: ['Crime', 'Drama'],
    director: 'Quentin Tarantino',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    country: 'United States',
    releaseDate: '1994-10-14',
    viewCount: 2000000,
    isPopular: true,
    resolution: '4K',
  },
  {
    id: 5,
    title: 'Forrest Gump',
    year: 1994,
    rating: 8.8,
    duration: '2h 22min',
    genre: ['Drama', 'Romance'],
    director: 'Robert Zemeckis',
    cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    image: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    country: 'United States',
    releaseDate: '1994-07-06',
    viewCount: 1800000,
    isPopular: true,
    resolution: '4K',
  },
  {
    id: 6,
    title: 'The Matrix',
    year: 1999,
    rating: 8.7,
    duration: '2h 16min',
    genre: ['Action', 'Sci-Fi'],
    director: 'Lana Wachowski, Lilly Wachowski',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    description: 'A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity, and joins a rebellion to break free.',
    image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    country: 'United States',
    releaseDate: '1999-03-31',
    viewCount: 2200000,
    isPopular: true,
    resolution: '4K',
  },
  {
    id: 7,
    title: 'Goodfellas',
    year: 1990,
    rating: 8.7,
    duration: '2h 26min',
    genre: ['Biography', 'Crime', 'Drama'],
    director: 'Martin Scorsese',
    cast: ['Robert De Niro', 'Ray Liotta', 'Joe Pesci'],
    description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.',
    image: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    country: 'United States',
    releaseDate: '1990-09-19',
    viewCount: 1700000,
    isPopular: true,
    resolution: '4K',
  },
  {
    id: 8,
    title: 'Schindler\'s List',
    year: 1993,
    rating: 9.0,
    duration: '3h 15min',
    genre: ['Biography', 'Drama', 'History'],
    director: 'Steven Spielberg',
    cast: ['Liam Neeson', 'Ralph Fiennes', 'Ben Kingsley'],
    description: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    image: 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    country: 'United States',
    releaseDate: '1994-02-04',
    viewCount: 1600000,
    isPopular: true,
    resolution: '4K',
  },
  {
    id: 9,
    title: 'Interstellar',
    year: 2014,
    rating: 8.6,
    duration: '2h 49min',
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    country: 'United States',
    releaseDate: '2014-11-07',
    viewCount: 2100000,
    isPopular: true,
    resolution: '4K',
  },
  {
    id: 10,
    title: 'The Silence of the Lambs',
    year: 1991,
    rating: 8.6,
    duration: '1h 58min',
    genre: ['Crime', 'Drama', 'Thriller'],
    director: 'Jonathan Demme',
    cast: ['Jodie Foster', 'Anthony Hopkins', 'Lawrence A. Bonney'],
    description: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
    image: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    country: 'United States',
    releaseDate: '1991-02-14',
    viewCount: 1900000,
    isPopular: true,
    resolution: '4K',
  },
  // ... Add more movies here
]

export default function MovieDetail({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [activeTab, setActiveTab] = useState('about')
  const [isFavorite, setIsFavorite] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [trailerUrl, setTrailerUrl] = useState('https://www.youtube.com/embed/YoHD9XEInc0')
  const [downloadOption, setDownloadOption] = useState('')

  useEffect(() => {
    const foundMovie = movies.find(m => m.id === parseInt(params.id))
    setMovie(foundMovie || null)
  }, [params.id])

  if (!movie) return <div>Loading...</div>

  const handleDownload = () => {
    if (downloadOption) {
      console.log(`Downloading movie: ${movie.title} via ${downloadOption}`)
      // Implement actual download logic here
    } else {
      alert('Please select a download option')
    }
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In a real application, you would update this in the backend
    console.log(isFavorite ? 'Removed from favorites' : 'Added to favorites')
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Image src={movie.image} alt={movie.title} width={300} height={450} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="mr-4">{movie.year}</span>
            <Clock className="w-4 h-4 mr-2" />
            <span className="mr-4">{movie.duration}</span>
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            <span>{movie.rating}</span>
            <Globe className="w-4 h-4 mx-2" />
            <span>{movie.country}</span>
            {movie.episodeCount && (
              <>
                <List className="w-4 h-4 mx-2" />
                <span>{movie.episodeCount} episodes</span>
              </>
            )}
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('watch')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <Play className="w-4 h-4 mr-2" />
              Tonton Sekarang
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Tonton Trailer
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={trailerUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
            <button
              onClick={handleFavorite}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center ${
                isFavorite ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              <Heart className="w-4 h-4 mr-2" />
              {isFavorite ? 'Favorit' : 'Tambah ke Favorit'}
            </button>
          </div>

          <div className="mb-6">
            <div className="flex space-x-4 border-b">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-2 px-4 ${activeTab === 'about' ? 'border-b-2 border-blue-600' : ''}`}
              >
                Tentang Film
              </button>
              <button
                onClick={() => setActiveTab('watch')}
                className={`py-2 px-4 ${activeTab === 'watch' ? 'border-b-2 border-blue-600' : ''}`}
              >
                Tonton
              </button>
              <button
                onClick={() => setActiveTab('download')}
                className={`py-2 px-4 ${activeTab === 'download' ? 'border-b-2 border-blue-600' : ''}`}
              >
                Unduh
              </button>
            </div>
          </div>

          {activeTab === 'about' && (
            <div>
              <p className="mb-4">{movie.description}</p>
              <div className="mb-4">
                <strong className="mr-2">Genre:</strong>
                {movie.genre.join(', ')}
              </div>
              <div className="mb-4">
                <strong className="mr-2">Director:</strong>
                {movie.director}
              </div>
              <div className="mb-4">
                <strong className="mr-2">Cast:</strong>
                {movie.cast.join(', ')}
              </div>
              <div className="mb-4">
                <strong className="mr-2">Release Date:</strong>
                {movie.releaseDate}
              </div>
              <div className="mb-4">
                <strong className="mr-2">Views:</strong>
                <span className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {movie.viewCount.toLocaleString()}
                </span>
              </div>
              <div className="mb-4">
                <strong className="mr-2">Resolution:</strong>
                {movie.resolution}
              </div>
              {movie.episodeCount && (
                <div className="mb-4">
                  <strong className="mr-2">Total Episodes:</strong>
                  {movie.episodeCount}
                </div>
              )}
              {movie.isPopular && (
                <div className="mb-4">
                  <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-semibold">
                    Populer
                  </span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'watch' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Tonton {movie.title}</h2>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <video src={`https://example.com/movies/${movie.id}.mp4`} controls className="w-full h-full"></video>
              </div>
              {movie.episodeCount && (
                <div className="mb-4">
                  <label htmlFor="episode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pilih Episode
                  </label>
                  <select
                    id="episode"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {[...Array(movie.episodeCount)].map((_, i) => (
                      <option key={i} value={i + 1}>Episode {i + 1}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="server" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pilih Server
                </label>
                <select
                  id="server"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option>Server 1</option>
                  <option>Server 2</option>
                  <option>Server 3</option>
                </select>
              </div>
              <button
                onClick={toggleDarkMode}
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                {isDarkMode ? 'Nyalakan Lampu' : 'Matikan Lampu'}
              </button>
            </div>
          )}

          {activeTab === 'download' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Unduh {movie.title}</h2>
              <div className="mb-4">
                <Select onValueChange={setDownloadOption}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih opsi unduh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google_drive">Google Drive</SelectItem>
                    <SelectItem value="dropbox">Dropbox</SelectItem>
                    <SelectItem value="mega">MEGA</SelectItem>
                    <SelectItem value="torrent">Torrent</SelectItem>
                    <SelectItem value="direct">Direct Download</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Unduh
              </Button>
            </div>
          )}
        </div>
      </div>

      <CommentSection movieId={movie.id} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Rekomendasi Film</h2>
        <RecommendedMovies currentMovieId={movie.id} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Film Terpopuler</h2>
        <TopMovies />
      </div>

      <Feedback />
    </div>
  )
}

