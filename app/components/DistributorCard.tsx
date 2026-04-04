'use client'

import { useState } from 'react'
import { Distributor } from '@/lib/types'

const KATEGORI_COLORS: Record<string, string> = {
  'Pertanian & Pangan': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  'Fashion & Tekstil': 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
  'Kerajinan & Handmade': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  'Jasa Profesional': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  'Konstruksi & Bangunan': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  'Elektronik & Teknik': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
  'Kesehatan & Kecantikan': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  'Jasa Digital': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  'Hobi & Otomotif': 'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300',
  'Furnitur & Interior': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'Kelapa & Turunan': 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300',
  'Logistik & Transportasi': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300',
  'Kemasan': 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  'Lain-lain': 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400',
}

function cleanText(text: string) {
  return text.replace(/\s+\d+$/, '').replace(/Translate\s*/gi, '').trim()
}

export default function DistributorCard({ distributor }: { distributor: Distributor }) {
  const [expanded, setExpanded] = useState(false)
  const badgeClass = KATEGORI_COLORS[distributor.kategori] ?? 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400'
  const originalText = distributor.original_text ? cleanText(distributor.original_text) : null

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <a
            href={`https://www.threads.com/@${distributor.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            @{distributor.username}
          </a>
          {distributor.lokasi && (
            <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">📍 {distributor.lokasi}</p>
          )}
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${badgeClass}`}>
          {distributor.kategori}
        </span>
      </div>

      <div>
        <p className="font-medium text-gray-800 dark:text-zinc-100 text-sm">{distributor.produk}</p>
        <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1 leading-relaxed">{distributor.summary}</p>
      </div>

      {/* Expandable original comment */}
      {originalText && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            <span>{expanded ? '▲' : '▼'}</span>
            <span>{expanded ? 'Sembunyikan' : 'Preview'}</span>
          </button>
          {expanded && (
            <div className="mt-2 p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl text-xs text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap border border-gray-100 dark:border-zinc-700">
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
            className="flex-1 text-sm text-center border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-xl py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Lihat Komentar
          </a>
        )}
        <a
          href={`https://www.threads.com/@${distributor.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-sm text-center bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl py-2 hover:bg-gray-700 dark:hover:bg-zinc-200 transition-colors"
        >
          DM di Threads
        </a>
      </div>
    </div>
  )
}
