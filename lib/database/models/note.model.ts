import mongoose, { Document, Schema, models } from "mongoose";

export interface NoteSchemaInterface extends Document {
  id?: string;
  title: string;
  content?: string;
  userId: string;
  updatedAt: Date;
  createdAt: Date;
}

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: false },
    userId: {
      type: String,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Note = models.Note || mongoose.model("Note", NoteSchema);
export default Note;
