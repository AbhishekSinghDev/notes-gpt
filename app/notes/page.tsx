import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "@clerk/nextjs";
import Note from "@/lib/database/models/note.model";

const NotesPage = async () => {
  const { userId } = auth();
  if (!userId) throw new Error("Userid is undefined");

  return <div>NotesPage</div>;
};

export default NotesPage;
