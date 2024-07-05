'use client'
import { useState } from 'react';
import useProjectStore from '@/stores/projectStore';
import { ClientPlace } from '@/lib/definitions';
import useMapStore from '@/stores/mapStore';

interface ItineraryModalProps {
  selectPlace: ClientPlace;
  onClose: () => void;
}

export default function ItineraryModal({ selectPlace, onClose }: ItineraryModalProps) {
  const { plans, addPlaceToPlan, addMyPlaces } = useProjectStore();
  const [selectedOption, setSelectedOption] = useState<'plan' | 'myPlaces'>('myPlaces');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedField, setSelectedField] = useState<'startPlace' | 'endPlace'>('startPlace');
  const { markers, setMarkers } = useMapStore();

  const handleSave = () => {
    if (selectedOption === 'plan' && selectedDate) {
      addPlaceToPlan(selectedDate, selectedField, selectPlace);
    } else if (selectedOption === 'myPlaces') {
      addMyPlaces(selectPlace);
      setMarkers([...markers, {
        position: { lat: selectPlace.position.lat, lng: selectPlace.position.lng },
        buildingName: selectPlace.name,
        roadAddress: selectPlace.address,
      }]);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-10">장소 추가</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">추가 옵션</label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value as 'plan' | 'myPlaces')}
            className="block w-full p-4 rounded-md  border focus:ring focus:ring-color7 focus:ring-opacity-50 text-base"
          >
            <option value="plan">일정 리스트에 추가</option>
            <option value="myPlaces">여행지 리스트에 추가</option>
          </select>
        </div>
        {selectedOption === 'plan' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">날짜 선택</label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="block w-full p-4 rounded-md  border focus:ring focus:ring-color7 focus:ring-opacity-50 text-base"
              >
                <option value="">날짜를 선택하세요</option>
                {plans.map(plan => (
                  <option key={plan.date} value={plan.date}>{plan.date}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">지점 선택</label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value as 'startPlace' | 'endPlace')}
                className="block w-full p-4 rounded-md  border focus:ring focus:ring-color7 focus:ring-opacity-50 text-base"
              >
                <option value="startPlace">시작 지점</option>
                <option value="endPlace">종료 지점</option>
              </select>
            </div>
          </>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-color10 text-black px-4 py-2 rounded hover:bg-gray-400 mr-2"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="bg-color2 text-black px-4 py-2 rounded hover:bg-color7"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}




