'use client'
import useProjectStore from '@/stores/projectStore';

export default function ItineraryScheduleList() {
  const { plans, updatePlan } = useProjectStore();

  const handleTimeChange = (date: string, field: 'startTime' | 'endTime', value: string) => {
    updatePlan(date, field, value);
  };

  return (
    <div className="p-2 flex-col overflow-hidden">
      <ul className="space-y-4 overflow-y-auto no-scrollbar max-h-[calc(100vh-170px)]">
        {plans.map(plan => (
          <li key={plan.date} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{plan.date}</h3>
            <div className="mt-2">
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">활동 시작 시간</label>
                  <input
                    type="time"
                    value={plan.startTime}
                    onChange={(e) => handleTimeChange(plan.date, 'startTime', e.target.value)}
                    className="mt-1 block w-full border px-2 focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">활동 종료 시간</label>
                  <input
                    type="time"
                    value={plan.endTime}
                    onChange={(e) => handleTimeChange(plan.date, 'endTime', e.target.value)}
                    className="mt-1 block w-full rounded-md border px-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className='my-4'>
                <label className="block text-sm font-medium text-gray-700">시작 지점</label>
                <div className='my-1 border p-3'>
                  <p className="text-sm">
                    {plan.startPlace && `${plan.startPlace.title} (${plan.startPlace.roadAddress})`}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">종료 지점</label>
                <div className='my-1 border p-3'>
                  <p className="text-sm">
                    {plan.endPlace ? `${plan.endPlace.title} (${plan.endPlace.roadAddress})` : ''}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
