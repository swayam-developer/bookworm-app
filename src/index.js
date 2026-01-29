import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import job from "./lib/cron.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

job.start();
console.log("🕒 Cron job started — sending keep-alive every 14 minutes.");
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: [
      "http://localhost:8081", // Expo web
      "https://bookworm-app-wlck.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
