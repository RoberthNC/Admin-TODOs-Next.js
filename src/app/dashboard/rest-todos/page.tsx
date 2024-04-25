export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { TodosGrid } from "@/todos/components/TodosGrid";
import { NewTodo } from "@/todos/components/NewTodo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "TODOs list",
  description: "This is the page which contains all my todos",
};

export default async function RestTodosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  const todos = await prisma.todo.findMany({
    where: { userId: session?.user?.id },
    orderBy: { description: "asc" },
  });
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
