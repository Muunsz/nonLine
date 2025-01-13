import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  image: string;
}

export default function RecommendedMovies({ currentMovieId }: { currentMovieId: number }) {
  // In a real application, this data would come from an API
  const recommendedMovies: Movie[] = [
    { id: 2, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
    { id: 3, title: 'The Dark Knight', year: 2008, rating: 9.0, image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg' },
    { id: 4, title: 'Pulp Fiction', year: 1994, rating: 8.9, image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' },
    { id: 5, title: 'Forrest Gump', year: 1994, rating: 8.8, image: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg' },
  ].filter(movie => movie.id !== currentMovieId)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {recommendedMovies.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
          <Image src={movie.image} alt={movie.title} width={150} height={225} className="w-full h-36 object-cover" />
          <div className="p-2">
            <h3 className="font-semibold text-sm mb-1 truncate">{movie.title}</h3>
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>{movie.year}</span>
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                <span>{movie.rating}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

