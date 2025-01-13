'use client'

import { useState } from 'react'

const genres = [
  'Aksi', 'Petualangan', 'Komedi', 'Drama', 'Fantasi', 'Horor', 'Misteri', 'Romantis', 'Fiksi Ilmiah', 'Thriller'
]

export default function GenreSelection() {
  const [selectedGenre, setSelectedGenre] = useState('')

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value)
    // Di sini Anda akan memanggil fungsi untuk memfilter konten berdasarkan genre
    console.log('Selected genre:', e.target.value)
  }

  return (
    <div className="mb-4">
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Pilih Genre</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  )
}

