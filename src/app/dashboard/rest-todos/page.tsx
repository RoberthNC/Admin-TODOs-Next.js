import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { TodosGrid } from "@/todos/components/TodosGrid";
import { NewTodo } from "@/todos/components/NewTodo";

export const metadata: Metadata = {
  title: "TODOs list",
  description: "This is the page which contains all my todos",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
