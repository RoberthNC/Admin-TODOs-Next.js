import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TODOs list",
  description: "This is the page which contains all my todos",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div>
      <h1>{JSON.stringify(todos)}</h1>
    </div>
  );
}
