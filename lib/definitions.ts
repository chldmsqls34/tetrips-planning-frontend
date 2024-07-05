import { ObjectId } from 'mongodb';
export interface Position{
  lat: number;
  lng: number;
}

export interface Place {
  _id?: ObjectId;
  name: string;
  address: string;
  category?: string;
  position?: Position;
  description?: string;
}
export interface ClientPlace {
  id: string;
  name: string;
  address: string;
  category: string;
  position: Position;
  description?: string;
}



