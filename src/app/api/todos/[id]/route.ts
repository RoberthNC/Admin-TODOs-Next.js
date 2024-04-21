import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, segments: Segments) {
  const {
    params: { id },
  } = segments;
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  if (!todo)
    return NextResponse.json({
      method: "GET",
      status: 404,
      message: `TODO with id ${id} doens't exists`,
    });
  return NextResponse.json({ method: "GET", status: 200, data: todo });
}

const patchSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PATCH(request: Request, segments: Segments) {
  const {
    params: { id },
  } = segments;
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  if (!todo) {
    return NextResponse.json({
      method: "PATCH",
      status: 404,
      message: `TODO with id ${id} doesn't exists`,
    });
  }
  try {
    const { description, complete } = await patchSchema.validate(
      await request.json()
    );
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { description, complete },
    });
    return NextResponse.json({
      method: "PATCH",
      status: 200,
      data: updatedTodo,
    });
  } catch (error) {
    return NextResponse.json({
      method: "PATCH",
      status: 400,
      message: `TODO with id ${id} cannot be updated, please check logs`,
    });
  }
}
