import Note from "@/lib/database/models/note.model";
import { deleteNoteSchema } from "@/lib/database/validation/note.validation";
import { auth } from "@clerk/nextjs";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const parseResult = deleteNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.log("While deleting note validation failed");
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" });
    }

    const { id } = parseResult.data;

    const isNoteExist = await Note.findById(id);

    if (Object.keys(isNoteExist).length === 0) {
      return Response.json({ error: "Note does not exist" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId != isNoteExist.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await Note.findByIdAndDelete(id);

    return Response.json(
      { message: "Note deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return Response.json({ error: "Internal server error" });
  }
}
