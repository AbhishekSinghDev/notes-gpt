import mongoose from "mongoose";

const DATABASE_URL: string | undefined = process.env.DATABASE_URL;

let cached = (global as any).mongoose || { conn: null, promise: null };

const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!DATABASE_URL) throw new Error("DATABASE_URL is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(DATABASE_URL, {
      dbName: "notes-gpt",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};

export default connectToDatabase;
