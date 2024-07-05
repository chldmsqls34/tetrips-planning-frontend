import { Position } from '@/lib/definitions';
import { create } from 'zustand';


export interface GuestState {
  id: number;
  nickname: string;
  image: string;
}

export interface PlaceState {
  id: string;
  name: string;
  address: string;
  category: string;
  position: Position;
  description?: string;
  playTime?: string;
  startPlay?: string;
  endPlay?: string;
}

export interface PlanState {
  date: string;
  startTime: string;
  endTime: string;
  startPlace: PlaceState | undefined;
  endPlace: PlaceState | undefined;
}

interface ProjectState {
  id: string;
  userId: string;
  title: string;
  startDate: string | undefined; 
  endDate: string | undefined; 
  guests: GuestState[];
  plans: PlanState[];
  myPlaces: PlaceState[];
  setTitle: (title: string) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setPlans: (plans: PlanState[]) => void;
  updatePlan: (date: string, field: string, value: PlaceState | string) => void;
  addPlaceToPlan: (date: string, field: 'startPlace' | 'endPlace', place: PlaceState) => void;
  addMyPlaces: (place: PlaceState) => void;
  removeMyPlaces: (placeId: string) => void;
}

const useProjectStore = create<ProjectState>()(
  (set) => ({
    id: '',
    userId: '',
    title: '',
    startDate: undefined,
    endDate: undefined,
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
    addPlaceToPlan: (date, field, place) => set((state) => ({
      plans: state.plans.map((plan) =>
        plan.date === date ? { ...plan, [field]: place } : plan
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



