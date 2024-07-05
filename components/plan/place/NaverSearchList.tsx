'use client'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline';
import { ClientPlace } from '@/lib/definitions';
import ItineraryModal from '../result/ItineraryModal';

interface SearchResult {
  id: string;
  name: string;
  address: string;
  category: string;
  position: { lat: number; lng: number };
}

export default function NaverSearchList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<ClientPlace | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const mockResults = [
      { id: '1', name: '검색결과1', address: '서울시 강남구',category:'숙소',position:{lat:37.123,lng:127.123} },
      { id: '2', name: '검색결과2', address: '서울시 서초구',category:'숙소',position:{lat:37.123,lng:127.123} },
    ]
    setResults(mockResults);
  }
  const handleAddPlace = (selectPlace: ClientPlace) => {
    setSelectedPlace(selectPlace);
    setIsModalOpen(true);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="py-2">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="네이버 지도 검색"
            className="text-sm flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-color2 text-white text-sm px-4 py-2 rounded-r hover:bg-color7"
          >
            검색
          </button>
        </div>
      </form>
      <ul className="space-y-2">
        {results.map((result) => (
          <li key={result.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{result.name}</h3>
              <p className="text-sm text-gray-600">{result.address}</p>
            </div>
            <button
                className="bg-color2 text-white p-2 rounded hover:bg-color7"
                onClick={() => handleAddPlace(result)}
              >
                <PlusIcon className='w-5' />
              </button>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedPlace && (
        <ItineraryModal
          selectPlace={selectedPlace}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}