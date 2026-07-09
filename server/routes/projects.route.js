import express from "express";
import { getProjects, getProject, createProject, updateProject, deleteProject } from "../controller/projects.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", getProjects);
router.get("/:id", getProject);

// Protected (admin)
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
