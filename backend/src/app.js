import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();

const app = express();

// 1. GLOBAL SECURITY & UTILITY MIDDLEWARE FIRST
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

// 2. BODY PARSERS SECOND
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. YOUR API ROUTES LAST
app.use("/api/auth", authRoutes);
app.use("/api/interviews",interviewRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI MockInterview is Running",
    });
});

export default app;