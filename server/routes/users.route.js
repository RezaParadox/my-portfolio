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
  // About
  getAbout,
  updateAbout,
  // Messages
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
  // Upload
  uploadImage,
} from "../controller/users.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// ===================== AUTH =====================
router.post("/register", register);
router.post("/login", login);

// ===================== USER PROFILE =====================
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);
router.get("/", protect, getUsers);
router.delete("/:id", protect, deleteUser);

// ===================== ABOUT =====================
router.get("/about", getAbout);
router.put("/about", protect, updateAbout);

// ===================== MESSAGES =====================
router.post("/contact", sendMessage);
router.get("/messages", protect, getMessages);
router.put("/messages/:id/read", protect, markAsRead);
router.delete("/messages/:id", protect, deleteMessage);

// ===================== UPLOAD =====================
router.post("/upload", protect, uploadImage);

export default router;
