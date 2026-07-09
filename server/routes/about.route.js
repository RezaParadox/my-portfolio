import express from "express";
const router = express.Router();

import { protect } from "../middleware/auth";
import { aboutMe, updateAboutMe } from "../controller/about.controller";

router.use(protect);

// Get about info
router.get("/", aboutMe);
// Update about info (auth required)
router.put("/", protect, updateAboutMe);

export default router;
