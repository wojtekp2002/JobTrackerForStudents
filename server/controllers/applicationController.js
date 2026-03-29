import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyToJob = async (req, res) => {
  try {
    if (req.user.role !== "student") {
        return res.status(403).json({
            message: "Only students can apply to jobs",
        });
    }

    const { jobId } = req.params;
    
    const job = await Job.findById(jobId);
    
    if (!job) {
        return res.status(404).json({
            message: "Job not found",
        });
    }
    
    const existingApplication = await Application.findOne({
        student: req.user._id,
        job: jobId,
    });
    
    if (existingApplication) {
        return res.status(400).json({
            message: "Application already exists",
        });
    }
    
    const application = await Application.create({
        student: req.user._id,
        job: jobId,
    })
    
    return res.status(201).json({
        message: "Application created successfully",
        application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};