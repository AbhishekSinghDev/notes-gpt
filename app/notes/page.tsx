import React from "react";
import { auth } from "@clerk/nextjs";
import Note from "@/lib/database/models/note.model";
import NoteCard from "@/components/shared/NoteCard";

const NotesPage = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("userId is undefined");

  const data = await Note.find({ userId: userId });

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((note) => (
        <NoteCard note={note} key={note._id} />
      ))}

      {data.length === 0 && (
        <p className="col-span-full text-center text-xl">
          You don&apos;t have any notes yet. Why don&apos;t create one ?
        </p>
      )}
    </div>
  );
};

export default NotesPage;
