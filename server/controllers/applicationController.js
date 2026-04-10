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
    const { name, surname, email, phone, currLocation, coverLetter } = req.body;

    if (!name || !surname || !email) {
        return res.status(400).json({
            message: "Name, surname and email are required",
        });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "CV file is required",
      });
    }

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
      name,
      surname,
      email,
      phone,
      currLocation,
      coverLetter,
      cvFilePath: req.file.path.replace(/\\/g, "/"),
      student: req.user._id,
      job: jobId,
    });

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

export const getMyApplications = async (req, res) => {
  try {
    if (req.user.role !== "student") {
        return res.status(403).json({
            message: "Only students can view their applications",
        });
    };

    const applications = await Application.find({student: req.user._id})
        .populate("job")
        .sort({createdAt: -1});

    return res.status(200).json({
        message: "Applications retrieved successfully",
        count: applications.length,
        applications: applications,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getApplicationsForJob = async (req, res) => {
  try {
    
    if (req.user.role !== "employer") {
        return res.status(403).json({
            message: "Only employers can view applications for their jobs",
        });
    }
    
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    
    if (!job) {
        return res.status(404).json({
            message: "Job not found",
        });
    }
    
    if (job.employer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "You are not authorized",
        });
    }
    
    const applications = await Application.find({job: jobId})
        .populate("student", "name email role")
        .sort({createdAt: -1});
    
    return res.status(200).json({
        message: "Applications retrieved successfully",
        count: applications.length,
        applications: applications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
        return res.status(403).json({
            message: "Only employers can update application status",
        });
    }

    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["interviewing", "accepted", "rejected"].includes(status)) {
        return res.status(400).json({
            message: "Invalid status value",
        });
    }

    const application = await Application.findById(applicationId).populate("job");
    if (!application) {
        return res.status(404).json({
            message: "Application not found",
        });
    }
    
    if (application.job.employer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "You are not authorized",
        });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
        message: "Application status updated successfully",
        application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const checkIfApplied = async (req, res) => {
  try {
    const { jobId } = req.params;

    const existingApplication = await Application.findOne({
      student: req.user._id,
      job: jobId,
    });

    return res.status(200).json({
      applied: !!existingApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};