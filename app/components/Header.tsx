'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Film, Tv, Calendar, Info, TrendingUp, Globe, Heart, Search, Menu, X, Sun, Moon } from 'lucide-react'
import SearchBar from './SearchBar'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/movies', icon: Film, label: 'movies' },
    { href: '/series', icon: Tv, label: 'series' },
    { href: '/sort', icon: TrendingUp, label: 'sort' },
    { href: '/upcoming', icon: Calendar, label: 'upcoming' },
    { href: '/countries', icon: Globe, label: 'countries' },
    { href: '/favorites', icon: Heart, label: 'favorites' },
    { href: '/about', icon: Info, label: 'about' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background' : 'bg-gradient-to-b from-background to-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              nonLine
            </motion.span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200">
                <item.icon className="w-4 h-4 mr-1" />
                {t(item.label)}
              </Link>
            ))}
            <Select value={language} onValueChange={(value: 'id' | 'en' | 'fr' | 'es') => setLanguage(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={t('selectLanguage')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">Indonesia</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar placeholder={t('search')} />
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background"
          >
            <nav className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center text-muted-foreground hover:text-foreground py-2">
                  <item.icon className="w-4 h-4 mr-2" />
                  {t(item.label)}
                </Link>
              ))}
              <div className="mt-4 space-y-4">
                <Select value={language} onValueChange={(value: 'id' | 'en' | 'fr' | 'es') => setLanguage(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('selectLanguage')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem] mr-2" /> : <Sun className="h-[1.2rem] w-[1.2rem] mr-2" />}
                  {t(theme === 'light' ? 'darkMode' : 'lightMode')}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

