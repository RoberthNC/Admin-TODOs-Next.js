export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata: Metadata = {
  title: "Server TODOs Page",
  description: "This is the page for todos using server actions",
};

export default async function ServerActionsPage() {
  const todos = await prisma.todo.findMany();
  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
