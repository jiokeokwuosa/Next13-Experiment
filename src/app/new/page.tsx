import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Add New Todo',
    description: 'On this page we add new todo item',
  }

async function handleSubmit(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();
  if (!title || typeof title != "string") throw Error("Invalid title");
  // save toto
  await prisma.todo.create({
    data: {
      title,
      complete: false,
    },
  });

  redirect('/')
}

export default function New() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl">New Todo</h1>
      </header>
      <form className="flex gap-2 flex-col" action={handleSubmit}>
        <input
          type="text"
          name="title"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus:bg-slate-950"
        />
        <div className="flex gap-1 ml-6 mt-4 justify-end">
          <Link
            href="/"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus:bg-slate-950"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus:bg-slate-950"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
