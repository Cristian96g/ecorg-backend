import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";
import pointsRoutes from "./routes/pointsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, name: "EcoRG API" }));

/// rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/points", pointsRoutes);

// Middleware de errores
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ API corriendo en http://localhost:${PORT}`)
);
