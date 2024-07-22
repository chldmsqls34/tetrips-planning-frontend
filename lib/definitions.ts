import { ObjectId } from 'mongodb';


export interface Place {
  _id?: ObjectId;
  name: string;
  address: string;
  category: string;
  position: {
    lat: number;
    lng: number;
  };
}
export interface ClientPlace {
  id: string;
  name: string;
  address: string;
  category: string;
  position: {
    lat: number;
    lng: number;
  };
}



