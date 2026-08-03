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

dotenv.config();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = [
  "http://localhost:5173",
  "https://my-portfolio-nlm6.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
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


// production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend-blog/dist");

  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

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



app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
