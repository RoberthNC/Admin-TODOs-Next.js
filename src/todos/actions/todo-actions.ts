"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = (sec: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, sec * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(3);
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  if (!todo) throw `Todo with id ${id} not found`;
  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      complete,
    },
  });
  revalidatePath("/dashboard/server-actions");
  return updatedTodo;
};

export const createTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({
      data: {
        description,
      },
    });
    revalidatePath("/dashboard/server-actions");
    return todo;
  } catch (error) {
    return {
      message: "An unexpected error occurred meanwhile creating TODO",
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({
    where: {
      complete: true,
    },
  });
  revalidatePath("/dashboard/server-actions");
};
