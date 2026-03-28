import express from "express";
import {
  createStudentProfile,
  createEmployerProfile,
  getMyProfile,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/student", protect, createStudentProfile);
router.post("/employer", protect, createEmployerProfile);
router.get("/me", protect, getMyProfile);

export default router;