'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Info } from 'lucide-react'
import { motion } from 'framer-motion'

interface Movie {
  id: number;
  title: string;
  image: string;
  progress: number;
}

export default function ContinueWatching() {
  const [continueWatching, setContinueWatching] = useState<Movie[]>([])

  useEffect(() => {
    // In a real application, this would fetch data from an API or local storage
    const mockContinueWatching = [
      { id: 1, title: 'Inception', image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', progress: 35 },
      { id: 2, title: 'The Dark Knight', image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', progress: 70 },
      { id: 3, title: 'Interstellar', image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', progress: 20 },
      { id: 4, title: 'Pulp Fiction', image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', progress: 90 },
    ]
    setContinueWatching(mockContinueWatching)
  }, [])

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Lanjutkan Menonton</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {continueWatching.map((movie) => (
          <motion.div
            key={movie.id}
            className="flex-shrink-0 relative w-64"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href={`/movies/${movie.id}`}>
              <Image src={movie.image} alt={movie.title} width={256} height={144} className="rounded-md" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-semibold">{movie.title}</h3>
                <div className="mt-2 bg-gray-600 rounded-full h-1">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${movie.progress}%` }}></div>
                </div>
              </div>
            </Link>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-2 rounded-full transition-colors duration-200">
                <Play className="w-4 h-4" />
              </button>
              <button className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-2 rounded-full transition-colors duration-200">
                <Info className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

