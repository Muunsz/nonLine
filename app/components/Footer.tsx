import { Facebook, Twitter, Instagram, Send } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">nonLine</h3>
            <p className="text-gray-400">Your ultimate streaming destination for movies and series.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/movies" className="text-gray-400 hover:text-white">Movies</Link></li>
              <li><Link href="/series" className="text-gray-400 hover:text-white">Series</Link></li>
              <li><Link href="/upcoming" className="text-gray-400 hover:text-white">Upcoming</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Send /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Featured Series</h4>
            <p className="text-gray-400">Don't miss our latest 13-episode series:</p>
            <Link href="/series/featured" className="text-blue-400 hover:text-blue-300">
              "The Enigma Chronicles"
            </Link>
            <p className="text-gray-400 mt-2">A mind-bending journey through time and space.</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2023 nonLine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

