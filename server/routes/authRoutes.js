import express from "express";
import { registerUser, loginUser, getCurrentUser, employerOnlyRoute, getMe } from "../controllers/authController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.get("/employer-only", protect, authorize("employer"), employerOnlyRoute);
router.get("/me", protect, getMe);

export default router;