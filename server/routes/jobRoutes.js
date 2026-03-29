import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
} from "../controllers/jobController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/my-jobs", protect, authorize("employer"), getMyJobs);
router.get("/:id", getJobById);
router.post("/", protect, authorize("employer"), createJob);

export default router;