'use client'
import { useState } from 'react'
import { ClientPlace } from '@/lib/definitions'
import PlaceList from './PlaceList'
import NaverSearchList from './NaverSearchList'

export default function PlaceForm({places}: {places: ClientPlace[]}) {
  const [activeTab, setActiveTab] = useState<'list' | 'search'>('list')

  return (
    <div className="bg-white border">
      <div className="flex p-2">
        <button
          onClick={() => setActiveTab('list')}
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === 'list' ? 'bg-color7 text-white text-sm' : 'border border-color10 text-sm'
          }`}
        >
          장소 리스트
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2 rounded ${
            activeTab === 'search' ? 'bg-color7 text-white text-sm' : 'border border-color10 text-sm'
          }`}
        >
          네이버 지도 검색
        </button>
      </div>
      <div className='p-2 justify-center items-center'>
        {activeTab === 'list' ? <PlaceList places={places} /> : <NaverSearchList/>}
      </div>
    </div>
  )
}


