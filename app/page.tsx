'use client'

import { useState, useMemo } from 'react'
import rawData from '@/data/distributors.json'
import { Distributor } from '@/lib/types'
import DistributorCard from './components/DistributorCard'
import ThemeToggle from './components/ThemeToggle'

const distributors = rawData.data as Distributor[]

const ALL_KATEGORI = [
  'Semua',
  'Pertanian & Pangan',
  'Fashion & Tekstil',
  'Kerajinan & Handmade',
  'Jasa Profesional',
  'Konstruksi & Bangunan',
  'Elektronik & Teknik',
  'Kesehatan & Kecantikan',
  'Jasa Digital',
  'Hobi & Otomotif',
  'Furnitur & Interior',
  'Kelapa & Turunan',
  'Logistik & Transportasi',
  'Kemasan',
  'Lain-lain',
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [activeKategori, setActiveKategori] = useState('Semua')

  const filtered = useMemo(() => {
    return distributors.filter((d) => {
      const matchKategori = activeKategori === 'Semua' || d.kategori === activeKategori
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        d.username.toLowerCase().includes(q) ||
        d.produk.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        (d.lokasi?.toLowerCase().includes(q) ?? false)
      return matchKategori && matchSearch
    })
  }, [search, activeKategori])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5 shrink-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">Tangan Pertama</h1>
              </div>
              <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium">Langsung dari sumbernya — {distributors.length} supplier verified</p>
            </div>
            <div className="flex items-center gap-2 flex-1 justify-end max-w-md">
              <input
                type="text"
                placeholder="Cari produk, username, atau lokasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-zinc-400 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">

        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-1 w-48 shrink-0 sticky top-20 self-start">
          <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-2 px-3">Kategori</p>
          {ALL_KATEGORI.map((kat) => (
            <button
              key={kat}
              onClick={() => setActiveKategori(kat)}
              className={`text-left text-sm px-3 py-2 rounded-xl font-medium transition-colors ${
                activeKategori === kat
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                  : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              {kat}
            </button>
          ))}
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400 dark:text-zinc-600">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">Tidak ada hasil ditemukan</p>
              <p className="text-sm mt-1">Coba kata kunci yang berbeda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((d, i) => (
                <DistributorCard key={`${d.username}-${i}`} distributor={d} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-xs text-gray-300 dark:text-zinc-700 flex flex-col gap-1">
        <p>Tangan Pertama © 2026</p>
        <p>
          Thread oleh{' '}
          <a href="https://www.threads.com/@esadima" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 dark:hover:text-zinc-400 transition-colors">@esadima</a>
          {' · '}Vibecoded by{' '}
          <a href="https://www.threads.com/@trashbbbin" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 dark:hover:text-zinc-400 transition-colors">@trashbbbin</a>
          {' & Nix'}
        </p>
      </div>
    </main>
  )
}
