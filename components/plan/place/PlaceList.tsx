'use client'
import { useState } from 'react';
import { ClientPlace } from '@/lib/definitions';
import { PlusIcon } from '@heroicons/react/24/outline';
import PlaceSearch from './PlaceSearch';
import useProjectStore, { DestinationState } from '@/stores/projectStore';
import useMapStore from '@/stores/mapStore';

const categories = ['숙소', '명소', '식당', '카페', '교통'];

export default function PlaceList({ places }: { places: ClientPlace[] }) {
  const [activeCategory, setActiveCategory] = useState('숙소');
  const {addMyPlaces} = useProjectStore();
  const { markers, setMarkers } = useMapStore();

  const handleAddPlace = (selectPlace: DestinationState) => {
    addMyPlaces(selectPlace);
    setMarkers([...markers, {
      position: { lat: selectPlace.position.lat, lng: selectPlace.position.lng },
      buildingName: selectPlace.name,
      roadAddress: selectPlace.address,
    }]);
  };

  return (
    <div className="flex-col">
      <PlaceSearch/>
      <div className="flex py-2 justify-between">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`mx-1 px-4 py-2 rounded whitespace-nowrap ${activeCategory === category ? 'bg-color7 text-white text-sm' : 'f border border-color10 text-sm'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="max-h-[calc(100vh-320px)] space-y-3 py-3 overflow-y-auto no-scrollbar">
        {places
          .filter(place => place.category === activeCategory)
          .map(place => (
            <li key={place.id} className="border p-2 rounded flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{place.name}</h3>
                <p className="text-sm text-gray-600">{place.address}</p>
              </div>
              <button
                className="bg-color2 text-white p-2 rounded hover:bg-color7"
                onClick={() => handleAddPlace(place)}
              >
                <PlusIcon className='w-5' />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}



