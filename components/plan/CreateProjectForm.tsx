'use client'
import useProjectStore from "@/stores/projectStore";
import ChatBox from "./common/ChatBox";
import NaverMap from "./common/NaverMap";
import DatePicker from "./date/DatePicker";
import PlaceForm from "./place/PlaceForm";
import ItineraryForm from "./result/ItineraryForm";
import { ClientPlace } from "@/lib/definitions";
import { useFormState } from "react-dom";
import { createProject } from "@/lib/projectAction";
import { Button } from "./common/button";
import PlanHeader from "./common/PlanHeader";


export default function CreateProjectForm({places}:{places:ClientPlace[]}){
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createProject, initialState);
  const {title, startDate, endDate, plans, myPlaces} = useProjectStore();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set('title', title);
    formData.set('startDate', startDate);
    formData.set('endDate', endDate);
    formData.set('plans', JSON.stringify(plans));
    formData.set('myPlaces', JSON.stringify(myPlaces));
    dispatch(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col h-screen overflow-hidden">
        <PlanHeader/>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex h-full w-full p-2">
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
            <Button type="submit">Create Project</Button>
          </div>
        </div>
      </div>
    </form>
  )
}