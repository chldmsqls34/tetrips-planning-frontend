import { create } from 'zustand';

export interface GuestState {
  email: string;
  nickname: string;
  image: string;
}

export interface DestinationState {
  id: string;
  name: string;
  address: string;
  category: string;
  position: {
    lat: number;
    lng: number;
  };
  playTime?: string;
  startPlay?: string;
  endPlay?: string;
  order?: number;
}

export interface PlanState {
  date: string;
  startTime: string;
  endTime: string;
  startPlace: DestinationState | undefined;
  endPlace: DestinationState | undefined;
  destinations?: DestinationState[];
}

interface ProjectState {
  id: string;
  creator: string;
  title: string;
  startDate: string; 
  endDate: string; 
  guests?: GuestState[];
  plans: PlanState[];
  myPlaces: DestinationState[];
  setTitle: (title: string) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setPlans: (plans: PlanState[]) => void;
  updatePlan: (date: string, field: string, value: DestinationState | string) => void;
  addMyPlaces: (place: DestinationState) => void;
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



