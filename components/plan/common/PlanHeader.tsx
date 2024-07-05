'use client'
import useProjectStore from "@/stores/projectStore";

export default function PlanHeader() {
  const {title, setTitle} = useProjectStore();

  const handleTitleChange = (e:any) => {
    setTitle(e.target.value)
  }

  return (
    <header className="bg-white">
      <div className="px-10 py-2 flex justify-between items-center">
        <input
          type="text"
          placeholder="여행 계획 이름"
          value={title}
          onChange={handleTitleChange}
          className="border rounded p-2 text-sm"
        />
        <div>
          <button className="bg-color7 text-white text-sm p-2 rounded">초대 링크 복사</button>
          <div className="inline-block">
            {/* 참가한 사용자 아이콘 */}
          </div>
        </div>
      </div>
    </header>
  );
}