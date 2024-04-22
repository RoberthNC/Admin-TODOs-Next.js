import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = +(searchParams.get("take") ?? "10");
  const skip = +(searchParams.get("skip") ?? "0");
  if (isNaN(+take))
    return NextResponse.json({
      method: "GET",
      status: 400,
      error: "The value of take have to be a number",
    });
  if (isNaN(+skip))
    return NextResponse.json({
      method: "GET",
      status: 400,
      error: "The value of offset have to be a number",
    });
  let todos = await prisma.todo.findMany({
    take,
    skip,
  });
  return NextResponse.json({ method: "GET", count: todos.length, data: todos });
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { description, complete } = await postSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.create({ data: { description, complete } });
    return NextResponse.json({ method: "POST", status: 201, data: todo });
  } catch (error) {
    return NextResponse.json({
      method: "POST",
      status: 400,
      message: error,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });
    return NextResponse.json({
      method: "DELETE",
      status: 200,
      message: "Complete TODOs have been deleted",
    });
  } catch (error) {
    return NextResponse.json({
      method: "DELETE",
      status: 400,
      message: error,
    });
  }
}
