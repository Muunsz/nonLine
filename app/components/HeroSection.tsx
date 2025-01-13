'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, Info } from 'lucide-react'

const heroMovies = [
  { id: 1, title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg' },
  { id: 2, title: 'The Dark Knight', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg' },
  { id: 3, title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
]

export default function HeroSection() {
  const [currentMovie, setCurrentMovie] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % heroMovies.length)
    }, 7000) // Changed from 10000 to 7000 for faster transitions
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen">
      {heroMovies.map((movie, index) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentMovie ? 1 : 0 }}
          transition={{ duration: 0.7 }} // Changed from 1 to 0.7 for faster transitions
          className="absolute inset-0"
        >
          <Image
            src={movie.image}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white max-w-2xl">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl font-bold mb-4"
            >
              {movie.title}
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg mb-6"
            >
              {movie.description}
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex space-x-4"
            >
              <button className="bg-white text-black px-6 py-2 rounded-full flex items-center hover:bg-opacity-80 transition-colors duration-200">
                <Play className="w-5 h-5 mr-2" />
                Play
              </button>
              <button className="bg-gray-500 bg-opacity-50 text-white px-6 py-2 rounded-full flex items-center hover:bg-opacity-70 transition-colors duration-200">
                <Info className="w-5 h-5 mr-2" />
                More Info
              </button>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

