// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reports", reportRoutes);

export default app;
