import { create } from 'zustand';

export interface MarkerData {
  position: {
    lat: number;
    lng: number;
  };
  roadAddress: string;
  buildingName: string;

}

export interface MapState {
  markers: MarkerData[];
  setMarkers: (markers:MarkerData[]) => void;
}

const useMapStore = create<MapState>((set) => ({
  markers: [],
  setMarkers: (markers) => set({markers}),
}));

export default useMapStore;