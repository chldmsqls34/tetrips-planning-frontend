import { unstable_noStore as noStore } from 'next/cache';
import clientPromise from './mongodb';
import { ClientPlace } from './definitions';


async function getCollection(collectionName: string) {
  const client = await clientPromise;
  const db = client.db('travel');
  return db.collection(collectionName);
}

export async function fetchAllPlaces():Promise<ClientPlace[]> {
  noStore()
  try {
    const placeCollection = await getCollection('places');
    const data = await placeCollection.find().toArray();
    const places = data.map((place) => ({
      id: place._id.toString(),
      name: place.name,
      address: place.address,
      category: place.category,
      position: place.position,
    })) as ClientPlace[];
    return places;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch places.');
  }

}
