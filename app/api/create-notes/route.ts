import connectToDatabase from "@/lib/database";
import Note, { NoteSchemaInterface } from "@/lib/database/models/note.model";
import { createNoteSchema } from "@/lib/database/validation/note.validation";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const parseResult = createNoteSchema.safeParse(body);
    if (!parseResult.success) {
      console.log("while creating note validation failed");
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, content } = parseResult.data;

    const { userId } = auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newNote: NoteSchemaInterface = new Note({
      title: title,
      content: content,
      userId: userId,
    });

    await newNote.save();

    return Response.json(
      {
        newNote,
      },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
