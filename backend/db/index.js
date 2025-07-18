import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    );
    console.log(
      "MongoDB connected successfully",
      connectionInstance.connection.name
    );
  } catch (error) {
    console.log("MongoDB Connection failed", error.message);
    process.exit(1);
  }
};
