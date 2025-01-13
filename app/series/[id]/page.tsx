'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, Calendar, Clock, Download, Globe, MessageSquare, Heart, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import CommentSection from '../../components/CommentSection'
import RecommendedMovies from '../../components/RecommendedMovies'
import EpisodeList from '../../components/EpisodeList'

interface Series {
  id: number;
  title: string;
  year: number;
  rating: number;
  seasons: number;
  episodes: number;
  genre: string[];
  creator: string;
  cast: string[];
  description: string;
  image: string;
  country: string;
  releaseDate: string;
  viewCount: number;
  isPopular: boolean;
}

const seriesList: Series[] = [
{
  id: 1,
  title: 'Stranger Things',
  year: 2016,
  rating: 8.7,
  seasons: 4,
  episodes: 34,
  genre: ['Drama', 'Fantasy', 'Horror'],
  creator: 'The Duffer Brothers',
  cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
  description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
  image: '/placeholder.svg',
  country: 'United States',
  releaseDate: '2016-07-15',
  viewCount: 5000000,
  isPopular: true,
},
{
  id: 2,
  title: 'The Enigma Chronicles',
  year: 2023,
  rating: 9.1,
  seasons: 1,
  episodes: 15,
  genre: ['Sci-Fi', 'Mystery', 'Thriller'],
  creator: 'Jane Doe',
  cast: ['John Smith', 'Emily Johnson', 'Michael Lee'],
  description: 'A mind-bending journey through time and space as a group of scientists unravel the mysteries of the universe.',
  image: '/placeholder.svg',
  country: 'International',
  releaseDate: '2023-06-01',
  viewCount: 3000000,
  isPopular: true,
},
{
  id: 3,
  title: 'Breaking Bad',
  year: 2008,
  rating: 9.5,
  seasons: 5,
  episodes: 62,
  genre: ['Crime', 'Drama', 'Thriller'],
  creator: 'Vince Gilligan',
  cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
  description: 'A high school chemistry teacher turned methamphetamine producer partners with a former student to secure his family\'s financial future as he battles terminal lung cancer.',
  image: '/placeholder.svg',
  country: 'United States',
  releaseDate: '2008-01-20',
  viewCount: 6000000,
  isPopular: true,
},
{
  id: 4,
  title: 'The Crown',
  year: 2016,
  rating: 8.6,
  seasons: 5,
  episodes: 50,
  genre: ['Biography', 'Drama', 'History'],
  creator: 'Peter Morgan',
  cast: ['Claire Foy', 'Olivia Colman', 'Imelda Staunton'],
  description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
  image: '/placeholder.svg',
  country: 'United Kingdom',
  releaseDate: '2016-11-04',
  viewCount: 4000000,
  isPopular: true,
},
{
  id: 5,
  title: 'Squid Game',
  year: 2021,
  rating: 8.0,
  seasons: 1,
  episodes: 9,
  genre: ['Action', 'Drama', 'Mystery'],
  creator: 'Hwang Dong-hyuk',
  cast: ['Lee Jung-jae', 'Park Hae-soo', 'Wi Ha-joon'],
  description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
  image: '/placeholder.svg',
  country: 'South Korea',
  releaseDate: '2021-09-17',
  viewCount: 7000000,
  isPopular: true,
},
{
  id: 6,
  title: 'The Mandalorian',
  year: 2019,
  rating: 8.7,
  seasons: 3,
  episodes: 24,
  genre: ['Action', 'Adventure', 'Sci-Fi'],
  creator: 'Jon Favreau',
  cast: ['Pedro Pascal', 'Carl Weathers', 'Giancarlo Esposito'],
  description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
  image: '/placeholder.svg',
  country: 'United States',
  releaseDate: '2019-11-12',
  viewCount: 5500000,
  isPopular: true,
},
{
  id: 7,
  title: 'Dark',
  year: 2017,
  rating: 8.8,
  seasons: 3,
  episodes: 26,
  genre: ['Crime', 'Drama', 'Mystery'],
  creator: 'Baran bo Odar, Jantje Friese',
  cast: ['Louis Hofmann', 'Karoline Eichhorn', 'Lisa Vicari'],
  description: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.',
  image: '/placeholder.svg',
  country: 'Germany',
  releaseDate: '2017-12-01',
  viewCount: 4500000,
  isPopular: true,
}
]

export default function SeriesDetail({ params }: { params: { id: string } }) {
  const [series, setSeries] = useState<Series | null>(null)
  const [activeTab, setActiveTab] = useState('about')
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState(1)

  useEffect(() => {
    const foundSeries = seriesList.find(s => s.id === parseInt(params.id))
    setSeries(foundSeries || null)
  }, [params.id])

  if (!series) return <div>Loading...</div>

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In a real application, you would update this in the backend
    console.log(isFavorite ? 'Removed from favorites' : 'Added to favorites')
  }

  const goToNextEpisode = () => {
    if (currentEpisode < series.episodes) {
      setCurrentEpisode(currentEpisode + 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/3"
        >
          <Image src={series.image} alt={series.title} width={300} height={450} className="w-full rounded-lg shadow-lg" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-2/3"
        >
          <h1 className="text-3xl font-bold mb-4">{series.title}</h1>
          <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="mr-4">{series.year}</span>
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            <span>{series.rating}</span>
            <Globe className="w-4 h-4 mx-2" />
            <span>{series.country}</span>
          </div>

          <div className="flex space-x-4 mb-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
              <Play className="w-4 h-4 mr-2" />
              Watch Now
            </button>
            <button
              onClick={handleFavorite}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center ${
                isFavorite ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              <Heart className="w-4 h-4 mr-2" />
              {isFavorite ? 'Favorit' : 'Add to Favorites'}
            </button>
          </div>

          <div className="mb-6">
            <div className="flex space-x-4 border-b">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-2 px-4 ${activeTab === 'about' ? 'border-b-2 border-blue-600' : ''}`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('episodes')}
                className={`py-2 px-4 ${activeTab === 'episodes' ? 'border-b-2 border-blue-600' : ''}`}
              >
                Episodes
              </button>
              <button
                onClick={() => setActiveTab('watch')}
                className={`py-2 px-4 ${activeTab === 'watch' ? 'border-b-2 border-blue-600' : ''}`}
              >
                Watch
              </button>
            </div>
          </div>

          {activeTab === 'about' && (
            <div>
              <p className="mb-4">{series.description}</p>
              <div className="mb-4">
                <strong className="mr-2">Genre:</strong>
                {series.genre.join(', ')}
              </div>
              <div className="mb-4">
                <strong className="mr-2">Creator:</strong>
                {series.creator}
              </div>
              <div className="mb-4">
                <strong className="mr-2">Cast:</strong>
                {series.cast.join(', ')}
              </div>
              <div className="mb-4">
                <strong className="mr-2">Release Date:</strong>
                {series.releaseDate}
              </div>
              <div className="mb-4">
                <strong className="mr-2">Views:</strong>
                <span className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {series.viewCount.toLocaleString()}
                </span>
              </div>
              {series.isPopular && (
                <div className="mb-4">
                  <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'episodes' && (
            <EpisodeList seriesId={series.id} seasons={series.seasons} episodes={series.episodes} />
          )}

          {activeTab === 'watch' && (
            <div>
              <div className="mb-4">
                <label htmlFor="episode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pilih Episode
                </label>
                <select
                  id="episode"
                  value={currentEpisode}
                  onChange={(e) => setCurrentEpisode(Number(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {[...Array(series.episodes)].map((_, i) => (
                    <option key={i} value={i + 1}>Episode {i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <video
                  src={`https://example.com/series/${series.id}/episode${currentEpisode}.mp4`}
                  controls
                  className="w-full h-full"
                ></video>
              </div>
              <button onClick={goToNextEpisode} disabled={currentEpisode === series.episodes} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Episode Selanjutnya
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <CommentSection movieId={series.id} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Recommended Series</h2>
        <RecommendedMovies currentMovieId={series.id} />
      </div>
    </div>
  )
}

