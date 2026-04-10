import express from "express";
import { 
    applyToJob, 
    getMyApplications, 
    getApplicationsForJob,
    updateApplicationStatus 
} 
from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/apply/:jobId", protect, upload.single("cvFile"), applyToJob);
router.get("/my-applications", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicationsForJob);
router.patch("/:applicationId/status", protect, updateApplicationStatus);

export default router;