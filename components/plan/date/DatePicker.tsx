'use client'
import { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import useProjectStore from '@/stores/projectStore'
import { ko } from 'date-fns/locale'

export default function DatePicker() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { startDate, endDate, setStartDate, setEndDate, setPlans } = useProjectStore();
  const [range, setRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  });

  const modifiersStyles={
    selected: {
      color: 'white',
      backgroundColor: '#94D9DA',
    }
  };

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const daysDifference = (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDifference > 15) {
        alert('최대 15일의 기간만 선택할 수 있습니다.');
        return;
      }
      setStartDate(range.from);
      setEndDate(range.to);

      const datesArray: Date[] = [];
      for (let d = new Date(range.from); d <= range.to; d.setDate(d.getDate() + 1)) {
        datesArray.push(new Date(d));
      }
      setPlans(
        datesArray.map(date => ({
          date: date.toLocaleDateString().split('T')[0],
          startTime: '10:00',
          endTime: '22:00',
          startPlace: undefined,
          endPlace: undefined,
        }))
      );
      setIsDatePickerOpen(false);
    }
    setRange(range as { from: Date | undefined; to: Date | undefined });
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center p-2">
        <div>
          {startDate && endDate && range != undefined ? (
            <span className="font-semibold">
              {range.from?.toLocaleDateString()} - {range.to?.toLocaleDateString()}
            </span>
          ) : (
            <span className="text-gray-500 text-sm">날짜를 선택해주세요</span>
          )}
        </div>
        <button
          onClick={() => setIsDatePickerOpen(true)}
          className="bg-color2 text-white text-sm py-2 px-4 rounded hover:bg-color7"
        >
          날짜 선택
        </button>
      </div>
      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <DayPicker
              locale={ko}
              mode="range"
              selected={range}
              onSelect={handleSelect}
              numberOfMonths={2}
              modifiersStyles={modifiersStyles}
              
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsDatePickerOpen(false)}
                className="bg-color2 text-black px-4 py-2 rounded hover:bg-color7 hover:text-white"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


