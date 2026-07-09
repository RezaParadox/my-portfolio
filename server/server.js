import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// imports routes
import about from "./routes/about.route.js";
import auth from "./routes/auth.route.js";
import contact from "./routes/contact.route.js";
import messages from "./routes/messages.route.js";
import projects from "./routes/projects.route.js";
import upload from "./routes/upload.route.js";

// DB
import connectDB from "./config/db.js";

dotenv.config();

// Connect to MongoDB
connectDB();

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
app.use("/api/auth", about);
app.use("/api/projects", projects);
app.use("/api/about", about);
app.use("/api/contact", contact);
app.use("/api/messages", messages);
app.use("/api/upload", upload);

//  for fist time check server is run or not you don't need always
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Blog API is running!",
    endpoints: {
      users: "/api/users",
      authors: "/api/authors",
      posts: "/api/posts",
    },
  });
});

// ERROR HANDLING
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
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
