'use client'

import { useState, useMemo } from 'react'
import rawData from '@/data/distributors.json'
import { Distributor } from '@/lib/types'
import DistributorCard from './components/DistributorCard'

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
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Tangan Pertama</h1>
                <p className="text-xs text-gray-400">
                  {distributors.length} distributor & supplier Indonesia
                </p>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                {filtered.length} hasil
              </span>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Cari produk, username, atau lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50"
            />

            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {ALL_KATEGORI.map((kat) => (
                <button
                  key={kat}
                  onClick={() => setActiveKategori(kat)}
                  className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    activeKategori === kat
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
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

      {/* Footer */}
      <div className="text-center py-8 text-xs text-gray-300">
        Data bersumber dari Threads · Tangan Pertama © 2026
      </div>
    </main>
  )
}
