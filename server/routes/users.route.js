import express from "express";
import {
  // Auth
  register,
  login,
  // User profile
  getMe,
  updateProfile,
  getUsers,
  deleteUser,
  // Messages
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} from "../controller/users.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// ===================== AUTH =====================
router.post("/register", register);
router.post("/login", login);

// ===================== USER PROFILE =====================
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);
router.get("/", protect, adminOnly, getUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

// ===================== MESSAGES =====================
router.post("/contact", sendMessage);
router.get("/messages", protect, adminOnly, getMessages);
router.put("/messages/:id/read", protect, adminOnly, markAsRead);
router.delete("/messages/:id", protect, adminOnly, deleteMessage);

export default router;
