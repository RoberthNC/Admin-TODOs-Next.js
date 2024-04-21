import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { TodosGrid } from "@/todos/components/TodosGrid";

export const metadata: Metadata = {
  title: "TODOs list",
  description: "This is the page which contains all my todos",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div>
      <TodosGrid todos={todos} />
    </div>
  );
}
