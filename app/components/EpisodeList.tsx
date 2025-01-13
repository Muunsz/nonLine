'use client'

import { useState, useEffect } from 'react'
import { Play } from 'lucide-react'

interface Episode {
  id: number;
  title: string;
  description: string;
  duration: string;
}

export default function EpisodeList({ seriesId, seasons, episodes }: { seriesId: number, seasons: number, episodes: number }) {
  const [currentSeason, setCurrentSeason] = useState(1)
  const [episodeList, setEpisodeList] = useState<Episode[]>([])

  useEffect(() => {
    // In a real application, this would fetch data from an API
    const mockEpisodes: Episode[] = Array.from({ length: episodes }, (_, i) => ({
      id: i + 1,
      title: `Episode ${i + 1}`,
      description: `This is the description for episode ${i + 1}.`,
      duration: `${Math.floor(Math.random() * 20) + 40}m` // Random duration between 40-60 minutes
    }))
    setEpisodeList(mockEpisodes)
  }, [seriesId, episodes])

  const episodesPerSeason = Math.ceil(episodes / seasons)
  const currentSeasonEpisodes = episodeList.slice(
    (currentSeason - 1) * episodesPerSeason,
    currentSeason * episodesPerSeason
  )

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="season" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Season</label>
        <select
          id="season"
          value={currentSeason}
          onChange={(e) => setCurrentSeason(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {[...Array(seasons)].map((_, i) => (
            <option key={i} value={i + 1}>Season {i + 1}</option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        {currentSeasonEpisodes.map((episode) => (
          <div key={episode.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Episode {episode.id}: {episode.title}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{episode.duration}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{episode.description}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center text-sm">
              <Play className="w-4 h-4 mr-2" />
              Watch
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

