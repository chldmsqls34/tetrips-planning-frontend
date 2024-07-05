'use client'
import useProjectStore from "@/stores/projectStore";

export default function ItineraryPlaceList() {
  const { myPlaces, removeMyPlaces } = useProjectStore();

  const handleRemovePlace = (placeId: string) => {
    removeMyPlaces(placeId);
  };

  return (
    <div className="bg-white p-4 rounded-lg h-full overflow-hidden">
      <ul className="space-y-4 overflow-y-auto no-scrollbar max-h-[calc(100vh-170px)]">
        {myPlaces.map(place => (
          <li key={place.id} className="border p-4 rounded-xl flex justify-between items-center">
            <div>
              <h3 className="font-semibold p-2">{place.name}</h3>
            </div>
            <input
              id={place.playTime}
              type="number"
              max='12'
              defaultValue='2'
              className="border rounded-md w-8"
              onChange={(e) => console.log(e.target.value)}
            />
            <span>시간</span>
            <input
              id={place.playTime}
              type="number"
              step='10'
              defaultValue='00'
              min='00'
              max='50'
              className="border rounded-md w-10"
              onChange={(e) => console.log(e.target.value)}
            />
            <span>분</span>
            <button
              className="bg-color11 text-white px-3 py-1 rounded hover:bg-color5"
              onClick={() => handleRemovePlace(place.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}



