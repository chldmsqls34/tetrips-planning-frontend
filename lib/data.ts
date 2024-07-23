import { unstable_noStore as noStore } from 'next/cache';
import clientPromise from './mongodb';
import { ClientPlace, ClientProject, Project } from './definitions';
import { ObjectId } from 'mongodb';


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
      title: place.title,
      roadAddress: place.address,
      category: place.category,
      mapx: place.mapx,
      mapy: place.mapy,
    })) as ClientPlace[];
    return places;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch places.');
  }
}


export async function fetchAllProjects():Promise<ClientProject[]> {
  noStore()
  try {
    const projectCollection = await getCollection('projects');
    const data = await projectCollection.find().toArray();
    const projects = data.map((project) => ({
      id: project._id.toString(),
      title: project.title,
      creator: project.creator,
      startDate: project.startDate.toISOString().split('T')[0],
      endDate: project.endDate.toISOString().split('T')[0],
      createdAt: project.createdAt.toISOString().split('T')[0],
      guests: project.guests,
      schedules: project.schedules,
      myPlaces: project.myPlaces,
    })) as ClientProject[];
    return projects;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch places.');
  }
}

export async function fetchProjectById(projectId:string):Promise<ClientProject | null> {
  noStore()
  try{
    const projectCollection = await getCollection('projects');
    const project = await projectCollection.findOne({_id: new ObjectId(projectId)});
    if(!project){
      return null
    }
    return {
      id: project._id.toString(),
      title: project.title,
      creator: project.creator,
      startDate: project.startDate.toISOString().split('T')[0],
      endDate: project.endDate.toISOString().split('T')[0],
      createdAt: project.createdAt.toISOString().split('T')[0],
      guests: project.guests,
      schedules: project.schedules,
      myPlaces: project.myPlaces,
    }
  }catch(error){
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}
