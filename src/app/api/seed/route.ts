import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456", 10),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          { description: "Piedra del alma", complete: true },
          { description: "Piedra del poder", complete: false },
          { description: "Piedra del espacio", complete: false },
          { description: "Piedra del realidad", complete: false },
          { description: "Conquistar a Maricielo", complete: false },
          { description: "Comprar una casita", complete: false },
        ],
      },
    },
  });
  return NextResponse.json({ message: "Seed executed" });
}
