import Note, { NoteSchemaInterface } from "@/lib/database/models/note.model";
import { updateNoteSchema } from "@/lib/database/validation/note.validation";
import { auth } from "@clerk/nextjs";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const parseResult = updateNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.log("While updating note validation failed");
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" });
    }

    const { title, content, id } = parseResult.data;

    const isNoteExist = await Note.findById(id);

    if (Object.keys(isNoteExist).length === 0) {
      return Response.json({ error: "Note does not exist" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId != isNoteExist.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title: title,
        content: content,
      },
      { new: true },
    );

    if (!updatedNote) {
      return Response.json(
        { error: "Error while updating note" },
        { status: 500 },
      );
    }

    return Response.json({ note: updatedNote }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ error: "Internal server error" });
  }
}
