import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes
import users from "./routes/users.route.js";
import projects from "./routes/projects.route.js";

// DB
import connectDB from "./config/db.js";

// Email
import { verifyEmailConfig } from "./utils/email.js";

dotenv.config();

connectDB();

// Verify email configuration on startup
verifyEmailConfig();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", users);
app.use("/api/projects", projects);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Portfolio API is running!",
    endpoints: {
      users: "/api/users",
      projects: "/api/projects",
    },
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
