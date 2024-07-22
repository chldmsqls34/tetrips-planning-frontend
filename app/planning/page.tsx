
import CreateProjectForm from "@/components/plan/CreateProjectForm";
import { fetchAllPlaces } from "@/lib/data";

export default async function PlanPage() {
  const places = await fetchAllPlaces();
  return (
    <>
      <CreateProjectForm places={places}/>
    </>
  );

}