import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecorg");
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error en MongoDB:", error.message);
    process.exit(1);
  }
}
