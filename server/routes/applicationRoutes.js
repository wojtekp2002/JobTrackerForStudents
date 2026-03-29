import express from "express";
import { 
    applyToJob, 
    getMyApplications, 
    getApplicationsForJob 
} 
from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply/:jobId", protect, applyToJob);
router.get("/my-applications", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicationsForJob);

export default router;