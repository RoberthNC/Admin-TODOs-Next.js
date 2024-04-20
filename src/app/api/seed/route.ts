import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.todo.createMany({
    data: [
      { description: "Piedra del alma", complete: true },
      { description: "Piedra del poder", complete: false },
      { description: "Piedra del espacio", complete: false },
      { description: "Piedra del realidad", complete: false },
    ],
  });
  return NextResponse.json({ message: "Seed executed" });
}
