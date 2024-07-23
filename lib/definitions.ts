import { ObjectId } from 'mongodb';


export interface Place {
  _id?: ObjectId;
  title: string;
  roadAddress: string;
  category: string;
  mapx: number;
  mapy: number;
}
export interface ClientPlace {
  id: string;
  title: string;
  roadAddress: string;
  category: string;
  mapx: number;
  mapy: number;
}

export interface Project {
  _id?: ObjectId;
  title: string;
  creator: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  guests?: Guest[];
  schedules?: Schedule[];
  myPlaces?: Destination[];
}

export interface ClientProject {
  id: string;
  title: string;
  creator: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  guests?: Guest[];
  schedules?: Schedule[];
  myPlaces?: Destination[];
}

export interface Guest {
  email: string;
  nickname?: string;
  img?: string;
}

export interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
  startPlace?: Destination;
  endPlace?: Destination;
  destinations?: Destination[];
}

export interface Destination {
  id: string;
  title: string;
  roadAddress: string;
  category: string;
  mapx: number;
  mapy: number;
  playTime?: number;
  startPlay?: string;
  endPlay?: string;
  order?: number;
}

