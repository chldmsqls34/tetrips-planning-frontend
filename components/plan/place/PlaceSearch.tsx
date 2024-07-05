'use client'
import { useState } from 'react'

export default function PlaceSearch() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className="py-1">
      <div className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="장소 검색"
          className="flex-grow text-sm border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-color7"
        />
        <button
          type="submit"
          className="bg-color7 text-white text-sm px-4 py-2 rounded-r hover:bg-color7"
        >
          검색
        </button>
      </div>
    </form>
  )
}

