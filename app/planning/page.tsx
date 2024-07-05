import ChatBox from "@/components/plan/common/ChatBox";
import NaverMap from "@/components/plan/common/NaverMap";
import DatePicker from "@/components/plan/date/DatePicker";
import PlaceForm from "@/components/plan/place/PlaceForm";
import ItineraryForm from "@/components/plan/result/ItineraryForm";
import { fetchAllPlaces } from "@/lib/data";




export default async function PlanPage() {
  const places = await fetchAllPlaces();

  return (
    <div className="flex h-full w-full p-2 overflow-hidden">
      <section className="p-2 w-1/5">
        <DatePicker />
        <PlaceForm places={places}/>
      </section>
      <section className="p-2 w-1/5">
        <ItineraryForm />
      </section>
      <section className="flex-1 p-2">
        <NaverMap/>
      </section>
      <section className="p-2 w-1/5">
        <ChatBox/>
      </section>
    </div>
  );

}