import PlanHeader from "@/components/plan/common/PlanHeader";

export default async function PlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <PlanHeader/>
      <div className="flex-1 flex overflow-hidden">
        {children}
      </div>
    </div>
  );
}
