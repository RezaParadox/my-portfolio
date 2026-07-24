import express from "express";
import {
  // Auth
  register,
  login,
  sendOtp,
  verifyOtp,
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
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// ===================== AUTH =====================
router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// ===================== USER PROFILE =====================
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);
router.get("/", protect, adminOnly, getUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

// ===================== ABOUT =====================
router.get("/about", getAbout);
router.put("/about", protect, adminOnly, updateAbout);

// ===================== MESSAGES =====================
router.post("/contact", sendMessage);
router.get("/messages", protect, adminOnly, getMessages);
router.put("/messages/:id/read", protect, adminOnly, markAsRead);
router.delete("/messages/:id", protect, adminOnly, deleteMessage);

// ===================== UPLOAD =====================
router.post("/upload", protect, adminOnly, uploadImage);

export default router;
