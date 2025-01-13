'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Eye, TrendingUp, Globe, Play, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  image: string;
  viewCount: number;
  isPopular: boolean;
  resolution: string;
  country: string;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative">
        <Image src={movie.image} alt={movie.title} width={300} height={450} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {movie.resolution}
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex justify-between">
          <Link href={`/movies/${movie.id}?tab=watch`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Play
            </Button>
          </Link>
          <Link href={`/movies/${movie.id}?tab=about`}>
            <Button size="sm" variant="secondary">
              <Info className="w-4 h-4 mr-2" />
              About
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{movie.year}</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{movie.rating}</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            <span>{movie.viewCount.toLocaleString()} views</span>
          </div>
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            <span>{movie.country}</span>
          </div>
        </div>
        {movie.isPopular && (
          <div className="mt-2 flex items-center text-red-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Populer</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

