import React from "react";
import { auth } from "@clerk/nextjs";
import Note from "@/lib/database/models/note.model";
import connectToDatabase from "@/lib/database";

const NotesPage = async () => {
  const { userId } = auth();
  if (!userId) throw new Error("userId is undefined");

  await connectToDatabase();
  const allNotes = await Note.find({ clerkId: userId });

  if (!userId) throw new Error("Userid is undefined");

  return <div>{JSON.stringify(allNotes)}</div>;
};

export default NotesPage;
