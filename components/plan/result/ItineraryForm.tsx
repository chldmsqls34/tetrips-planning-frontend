'use client'
import { useState } from "react";
import ItineraryScheduleList from "../date/ItineraryScheduleList";
import ItineraryPlaceList from "../place/ItineraryPlaceList";

export default function ItineraryForm() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'place'>('schedule')

  return (
    <div className="p-2 border flex flex-col">
      <div className="flex p-2">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === 'schedule' ? 'bg-color7 text-white text-sm' : 'border border-color10 text-sm'
          }`}
        >
          일정 리스트
        </button>
        <button
          onClick={() => setActiveTab('place')}
          className={`px-4 py-2 rounded ${
            activeTab === 'place' ? 'bg-color7 text-white text-sm' : 'border border-color10 text-sm'
          }`}
        >
          여행지 리스트
        </button>
      </div>
      <div className="flex-1">
        {activeTab === 'schedule' ? <ItineraryScheduleList /> : <ItineraryPlaceList />}
      </div>
    </div>
  )
}