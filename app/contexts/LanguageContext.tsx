'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'id' | 'en' | 'fr' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    home: 'Beranda',
    movies: 'Film',
    series: 'Serial',
    sort: 'Urutkan',
    upcoming: 'Akan Datang',
    countries: 'Negara',
    favorites: 'Favorit',
    about: 'Tentang',
    search: 'Cari film atau serial...',
    sortAndFilterMovies: 'Urutkan dan Filter Film',
    sortBy: 'Urutkan berdasarkan',
    popularity: 'Popularitas',
    rating: 'Peringkat',
    year: 'Tahun',
    title: 'Judul',
    filterByCountry: 'Filter berdasarkan Negara',
    filterByGenre: 'Filter berdasarkan Genre',
    allCountries: 'Semua Negara',
    allGenres: 'Semua Genre',
    searchMovies: 'Cari film...',
    noMoviesFound: 'Tidak ada film yang sesuai dengan kriteria pencarian Anda.',
    selectLanguage: 'Pilih Bahasa',
    darkMode: 'Mode Gelap',
    lightMode: 'Mode Terang',
  },
  en: {
    home: 'Home',
    movies: 'Movies',
    series: 'Series',
    sort: 'Sort',
    upcoming: 'Upcoming',
    countries: 'Countries',
    favorites: 'Favorites',
    about: 'About',
    search: 'Search movies or series...',
    sortAndFilterMovies: 'Sort and Filter Movies',
    sortBy: 'Sort by',
    popularity: 'Popularity',
    rating: 'Rating',
    year: 'Year',
    title: 'Title',
    filterByCountry: 'Filter by Country',
    filterByGenre: 'Filter by Genre',
    allCountries: 'All Countries',
    allGenres: 'All Genres',
    searchMovies: 'Search movies...',
    noMoviesFound: 'No movies found matching your search criteria.',
    selectLanguage: 'Select Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
  },
  fr: {
    home: 'Accueil',
    movies: 'Films',
    series: 'Séries',
    sort: 'Trier',
    upcoming: 'À venir',
    countries: 'Pays',
    favorites: 'Favoris',
    about: 'À propos',
    search: 'Rechercher des films ou des séries...',
    sortAndFilterMovies: 'Trier et Filtrer les Films',
    sortBy: 'Trier par',
    popularity: 'Popularité',
    rating: 'Note',
    year: 'Année',
    title: 'Titre',
    filterByCountry: 'Filtrer par Pays',
    filterByGenre: 'Filtrer par Genre',
    allCountries: 'Tous les Pays',
    allGenres: 'Tous les Genres',
    searchMovies: 'Rechercher des films...',
    noMoviesFound: 'Aucun film trouvé correspondant à vos critères de recherche.',
    selectLanguage: 'Choisir la Langue',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair',
  },
  es: {
    home: 'Inicio',
    movies: 'Películas',
    series: 'Series',
    sort: 'Ordenar',
    upcoming: 'Próximamente',
    countries: 'Países',
    favorites: 'Favoritos',
    about: 'Acerca de',
    search: 'Buscar películas o series...',
    sortAndFilterMovies: 'Ordenar y Filtrar Películas',
    sortBy: 'Ordenar por',
    popularity: 'Popularidad',
    rating: 'Calificación',
    year: 'Año',
    title: 'Título',
    filterByCountry: 'Filtrar por País',
    filterByGenre: 'Filtrar por Género',
    allCountries: 'Todos los Países',
    allGenres: 'Todos los Géneros',
    searchMovies: 'Buscar películas...',
    noMoviesFound: 'No se encontraron películas que coincidan con sus criterios de búsqueda.',
    selectLanguage: 'Seleccionar Idioma',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
  },
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id')

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

