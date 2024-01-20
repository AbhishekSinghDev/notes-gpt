import mongoose, { Document, Schema, models } from "mongoose";
import { NoteSchemaInterface } from "./note.model";

export interface UserSchemaInterface extends Document {
  clerkId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  notes: Array<NoteSchemaInterface>;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    clerkId: { type: String, required: true, unique: true },
    notes: [{ type: Schema.Types.ObjectId, ref: "Notes" }],
  },
  {
    timestamps: true,
  },
);

const User = models.User || mongoose.model("User", UserSchema);
export default User;
