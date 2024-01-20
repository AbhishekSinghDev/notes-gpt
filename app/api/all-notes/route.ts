import Note from "@/lib/database/models/note.model";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId } = body;

  try {
    console.log(userId);

    return Response.json({ wow: "working" }, { status: 200 });

    // const allNotes = await Note.find({userId: })
  } catch (err) {
    console.log(err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
