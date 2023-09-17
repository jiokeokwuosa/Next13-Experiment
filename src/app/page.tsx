import TodoItem from "@/components/todoItem";
import { prisma } from "@/db";
import Link from "next/link";

const getTodos = async () => {
 return prisma.todo.findMany();
}

const handleToggle = async (id: string, complete: boolean) => {
  "use server"
  await prisma.todo.update({
    where:{
      id
    },
    data:{
      complete
    }
  })
 }

export default async function Home() {
  const todos = await getTodos();
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl">My Todo List</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus:bg-slate-950"
          href="/new"
        >
          Create new
        </Link>
      </header>
      <ul>
        {todos.map((item) => {
          return <TodoItem key={item.id} {...item} toggleTodo={handleToggle}/>;
        })}
      </ul>
    </>
  );
}
