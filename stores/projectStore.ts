import { Destination, Guest, Schedule } from '@/lib/definitions';
import { create } from 'zustand';


interface ProjectState {
  id: string;
  creator: string;
  title: string;
  startDate: string; 
  endDate: string; 
  guests?: Guest[];
  plans: Schedule[];
  myPlaces: Destination[];
  setTitle: (title: string) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setPlans: (plans: Schedule[]) => void;
  updatePlan: (date: string, field: string, value: Destination | string) => void;
  addMyPlaces: (place: Destination) => void;
  removeMyPlaces: (placeId: string) => void;
}

const useProjectStore = create<ProjectState>()(
  (set) => ({
    id: '',
    creator: '',
    title: '',
    startDate: '',
    endDate: '',
    guests: [],
    plans: [],
    myPlaces: [],
    setTitle: (title) => set({ title }),
    setStartDate: (date) => set({ startDate: date.toISOString() }),
    setEndDate: (date) => set({ endDate: date.toISOString() }),
    setPlans: (plans) => set({ plans }),
    updatePlan: (date, field, value) => set((state) => ({
      plans: state.plans.map((plan) =>
        plan.date === date ? { ...plan, [field]: value } : plan
      ),
    })),
    addMyPlaces: (place) => set((state) => ({
      myPlaces: [...state.myPlaces, place],
    })),
    removeMyPlaces: (placeId) => set((state) => ({
      myPlaces: state.myPlaces.filter((place) => place.id !== placeId),
    })),
  }),

  
);


export default useProjectStore;



