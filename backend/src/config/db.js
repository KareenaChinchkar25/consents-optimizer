import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    if (!uri) throw new Error(" MONGO_URI missing in .env");

    await mongoose.connect(uri, { dbName });

    console.log("MongoDB connected:", dbName);

  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};
