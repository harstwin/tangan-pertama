'use client'

import { useState } from 'react'
import { Distributor } from '@/lib/types'

const KATEGORI_COLORS: Record<string, string> = {
  'Pertanian & Pangan': 'bg-green-100 text-green-800',
  'Fashion & Tekstil': 'bg-pink-100 text-pink-800',
  'Kerajinan & Handmade': 'bg-yellow-100 text-yellow-800',
  'Jasa Profesional': 'bg-blue-100 text-blue-800',
  'Konstruksi & Bangunan': 'bg-orange-100 text-orange-800',
  'Elektronik & Teknik': 'bg-indigo-100 text-indigo-800',
  'Kesehatan & Kecantikan': 'bg-red-100 text-red-800',
  'Jasa Digital': 'bg-purple-100 text-purple-800',
  'Hobi & Otomotif': 'bg-gray-100 text-gray-800',
  'Furnitur & Interior': 'bg-amber-100 text-amber-800',
  'Kelapa & Turunan': 'bg-lime-100 text-lime-800',
  'Logistik & Transportasi': 'bg-cyan-100 text-cyan-800',
  'Kemasan': 'bg-teal-100 text-teal-800',
  'Lain-lain': 'bg-gray-100 text-gray-600',
}

// Strip trailing numbers (like "208", "93") from scraped text
function cleanText(text: string) {
  return text.replace(/\s+\d+$/, '').replace(/Translate\s*/gi, '').trim()
}

export default function DistributorCard({ distributor }: { distributor: Distributor }) {
  const [expanded, setExpanded] = useState(false)
  const badgeClass = KATEGORI_COLORS[distributor.kategori] ?? 'bg-gray-100 text-gray-600'
  const originalText = distributor.original_text ? cleanText(distributor.original_text) : null

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <a
            href={`https://www.threads.com/@${distributor.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            @{distributor.username}
          </a>
          {distributor.lokasi && (
            <p className="text-xs text-gray-400 mt-0.5">📍 {distributor.lokasi}</p>
          )}
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${badgeClass}`}>
          {distributor.kategori}
        </span>
      </div>

      <div>
        <p className="font-medium text-gray-800 text-sm">{distributor.produk}</p>
        <p className="text-gray-500 text-sm mt-1 leading-relaxed">{distributor.summary}</p>
      </div>

      {/* Expandable original comment */}
      {originalText && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
          >
            <span>{expanded ? '▲' : '▼'}</span>
            <span>{expanded ? 'Sembunyikan' : 'Lihat komentar asli'}</span>
          </button>
          {expanded && (
            <div className="mt-2 p-3 bg-gray-50 rounded-xl text-xs text-gray-600 leading-relaxed whitespace-pre-wrap border border-gray-100">
              {originalText}
            </div>
          )}
        </div>
      )}

      <div className="mt-auto flex gap-2">
        {distributor.permalink && (
          <a
            href={distributor.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-sm text-center border border-gray-200 text-gray-700 rounded-xl py-2 hover:bg-gray-50 transition-colors"
          >
            Lihat Komentar
          </a>
        )}
        <a
          href={`https://www.threads.com/@${distributor.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-sm text-center bg-gray-900 text-white rounded-xl py-2 hover:bg-gray-700 transition-colors"
        >
          DM di Threads
        </a>
      </div>
    </div>
  )
}
