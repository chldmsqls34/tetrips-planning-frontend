'use server';

import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";


async function getCollection(collectionName: string) {
  const client = await clientPromise;
  const db = client.db('travel');
  return db.collection(collectionName);
}

const ProjectFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Project Title is required'),
  creator: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  plans: z.array(z.object({
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    startPlace: z.object({
      id: z.string().optional(),
      order: z.number().optional(),
      name: z.string(),
      address: z.string(),
      category: z.string(),
      position: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
      playTime: z.number().optional(),
    }).optional(),
    endPlace: z.object({
      id: z.string().optional(),
      order: z.number().optional(),
      name: z.string(),
      address: z.string(),
      category: z.string(),
      position: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
      playTime: z.number().optional(),
    }).optional(),
    destinations: z.array(z.object({
      id: z.string().optional(),
      order: z.number().optional(),
      name: z.string(),
      address: z.string(),
      category: z.string(),
      position: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
      playTime: z.number().optional(),

    })).optional(),
  })).optional(),
  myPlaces: z.array(z.object({
    id: z.string().optional(),
    name: z.string(),
    address: z.string(),
    category: z.string(),
    position: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    playTime: z.number().optional(),
  })).optional(),
  collaborators: z.array(z.string()).optional(),
  createdAt: z.string(),
});

const UpdateProject = ProjectFormSchema.omit({
  id: true,
  creator: true,
  collaborators: true,
  createdAt: true,
});

const CreateProject = ProjectFormSchema.omit({
  id: true,
  creator: true,
  collaborators: true,
  createdAt: true,
});


type State = {
  errors?: {
    title?: string[];
    startDate?: string[];
    endDate?: string[];
    plans?: string[];
    myPlaces?: string[];
  };
  message?: string;
};



export async function createProject(prevState:State, formData: FormData){
  try {

    const validatedFields = CreateProject.safeParse({
      title: formData.get('title'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      plans: JSON.parse(formData.get('plans') as string),
      myPlaces: JSON.parse(formData.get('myPlaces') as string),
    });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Project.',
      };
    }
    const { title, startDate, endDate, plans, myPlaces} = validatedFields.data;
    const creator = 'anonymous';
    const createdAt = new Date();

    const projectCollection = await getCollection('projects');
    await projectCollection.insertOne({
      creator,
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      createdAt,
      plans,
      myPlaces,
    });

  } catch (error) {
    return { message: 'Database Error: Failed to Create Project.' };
  }
  revalidatePath('/');
  redirect('/');
}


export async function deleteProject(projectId: string) {
  try {
    const projectCollection = await getCollection('projects');
    await projectCollection.deleteOne({ _id: new ObjectId(projectId) });
    revalidatePath('/');
    return { message: 'Deleted Project' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Project.' };
  }
}

export async function updateProject(projectId:string, data: FormData) {
  try {
    const validatedFields = UpdateProject.safeParse({
      title: data.get('title'),
      startDate: data.get('startDate'),
      endDate: data.get('endDate'),
      plans: JSON.parse(data.get('plans') as string),
  });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: '필수 필드가 누락되었습니다. 프로젝트 업데이트에 실패했습니다.',
      };
    }

    const { title, startDate, endDate, plans} = validatedFields.data;

    const projectCollection = await getCollection('projects');
    await projectCollection.updateOne(
      { _id: new ObjectId(projectId) },
      {
        $set: {
          title,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          plans,
        },
      }
    );

    revalidatePath('/');
    redirect('/');
  } catch (error) {
    console.error('프로젝트 업데이트 실패:', error);
    return { message: '데이터베이스 오류: 프로젝트 업데이트에 실패했습니다.' };
  }
}