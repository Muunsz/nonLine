'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Promotion {
  id: number;
  title: string;
  image: string;
  link: string;
}

export default function PromotionSlider() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // In a real application, this would fetch data from an API
    const mockPromotions = [
      { id: 1, title: 'New Release: Avengers Endgame', image: '/placeholder.svg', link: '/movies/1' },
      { id: 2, title: 'Coming Soon: Black Widow', image: '/placeholder.svg', link: '/upcoming/2' },
      { id: 3, title: 'Popular: Stranger Things Season 4', image: '/placeholder.svg', link: '/series/3' },
    ]
    setPromotions(mockPromotions)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [promotions.length])

  if (promotions.length === 0) return null

  const currentPromotion = promotions[currentIndex]

  return (
    <div className="relative h-96 mb-8">
      <Image
        src={currentPromotion.image}
        alt={currentPromotion.title}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">{currentPromotion.title}</h2>
          <Link href={currentPromotion.link} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Lihat Sekarang
          </Link>
        </div>
      </div>
    </div>
  )
}

