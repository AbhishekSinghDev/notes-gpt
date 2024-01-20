"use client";

import { NoteSchemaInterface } from "@/lib/database/models/note.model";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import EditDeleteNoteDialog from "./EditDeleteNoteDialog";

interface NoteCardProps {
  note: NoteSchemaInterface;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const [open, setOpen] = useState<boolean>(false);
  const wasUpdated = note.updatedAt > note.createdAt;

  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString();

  return (
    <>
      <Card
        className="cursor-pointer transition-shadow hover:shadow-lg"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {createdUpdatedAtTimestamp}
            {wasUpdated && "(updated)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{note.content}</p>
        </CardContent>
      </Card>

      <EditDeleteNoteDialog noteToEdit={note} open={open} setOpen={setOpen} />
    </>
  );
};

export default NoteCard;
