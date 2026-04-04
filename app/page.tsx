'use client'

import { useState, useMemo, useEffect } from 'react'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

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

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const handleKategori = (kat: string) => {
    setActiveKategori(kat)
    setSidebarOpen(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside className={`fixed top-0 left-0 h-full w-56 bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800 z-30 flex flex-col gap-1 px-3 py-6 overflow-y-auto transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-3 px-1">
          <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Kategori</p>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 text-lg leading-none">✕</button>
        </div>
        {ALL_KATEGORI.map((kat) => (
          <button
            key={kat}
            onClick={() => handleKategori(kat)}
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

      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">Tangan Pertama</h1>
              <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium">
                Langsung dari sumbernya — {distributors.length} supplier verified
              </p>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex gap-2 items-center">
            {/* Kategori toggle button — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center gap-1.5 text-sm px-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
            >
              ☰
              {activeKategori !== 'Semua' && (
                <span className="text-xs font-medium text-gray-900 dark:text-white">{activeKategori}</span>
              )}
            </button>

            {/* Search — expanded on desktop, icon-only on mobile */}
            <div className="flex-1 flex items-center justify-end gap-2">
              {/* Desktop search */}
              <input
                type="text"
                placeholder="Cari produk, username, atau lokasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="hidden md:block w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-zinc-400 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
              />

              {/* Mobile search — expandable */}
              {searchOpen ? (
                <input
                  autoFocus
                  type="text"
                  placeholder="Cari produk, username, atau lokasi..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onBlur={() => { if (!search) setSearchOpen(false) }}
                  className="md:hidden flex-1 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-zinc-400 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                />
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  🔍
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">

        {/* Sidebar — desktop only */}
        <aside className="hidden md:flex flex-col gap-1 w-48 shrink-0 sticky top-36 self-start">
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
        <div className="flex-1 min-w-0">
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
