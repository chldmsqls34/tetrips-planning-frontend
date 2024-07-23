'use client'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import useProjectStore from '@/stores/projectStore'
import useMapStore from '@/stores/mapStore'
import { ClientPlace, Destination, Place } from '@/lib/definitions'

interface SearchResult {
  status: string;
  meta: {
    totalCount: number;
    page: number;
    count: number;
  };
  places: {
    title: string;
    roadAddress: string;
    mapx: string;
    mapy: string;
    category: string;
  }[];
  errorMessage?: string;
}

export default function NaverSearchList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Destination[]>([]);
  const {plans, addMyPlaces} = useProjectStore();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { markers, setMarkers } = useMapStore()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data: SearchResult = await response.json();

      if (data.status === 'OK' && data.places && data.places.length > 0) {
        const destinations: Destination[] = data.places.map((place) => ({
          id: place.mapx + place.mapy,
          title: place.title,
          roadAddress: place.roadAddress,
          category: place.category,
          mapx: parseFloat(place.mapx),
          mapy: parseFloat(place.mapy),
        }));
        setResults(destinations);
      } else {
        setError(data.errorMessage || '검색 결과가 없습니다.');
      }
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddPlace = async (destination: ClientPlace) => {
    try {
      const response = await fetch('/api/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(destination),
      });
      if (!response.ok) {
        throw new Error('Failed to add place');
      }
      const data = await response.json();
      console.log('Place added successfully:', data);
    } catch (err) {
      setError('장소 추가 중 오류가 발생했습니다.');
      console.error('Add place error:', err);
    }
    addMyPlaces(destination);
    if ( plans&& plans.length > 0) {
      setMarkers([...markers, {
        id: destination.title + destination.mapx + destination.mapy,
        position: { lat: destination.mapx, lng: destination.mapy },
        buildingName: destination.title,
        roadAddress: destination.roadAddress,
      }]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="py-2">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="장소 검색"
            className="text-sm flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-color2 text-white text-sm px-4 py-2 rounded-r hover:bg-color7"
            disabled={isLoading}
          >
            {isLoading ? '검색 중...' : '검색'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ul className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {results.map((result, index) => (
          <li key={index} className="border p-2 rounded flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{result.title}</h3>
              <p className="text-sm text-gray-600">{result.roadAddress}</p>
              <p className="text-xs text-gray-500">{result.category}</p>
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
    </div>
  )
}