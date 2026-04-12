import Job from "../models/Job.js";
import EmployerProfile from "../models/EmployerProfile.js";

export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({
        message: "Only employers can create job offers",
      });
    }

    const {
      title,
      description,
      companyName,
      location,
      workMode,
      employmentType,
      fieldsOfStudy,
      minYear,
      maxYear,
      skills,
      salary,
    } = req.body;

    if (
      !title ||
      !description || 
      !companyName ||
      !location ||
      !workMode ||
      !employmentType ||
      !minYear ||
      !maxYear
    ) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    if (minYear > maxYear) {
      return res.status(400).json({
        message: "Minimum year cannot be greater than maximum year",
      });
    }

    const employerProfile = await EmployerProfile.findOne({ user: req.user._id });

    if (!employerProfile) {
      return res.status(400).json({
        message: "Employer profile is required before creating a job",
      });
    }

    const job = await Job.create({
      title,
      description,
      employer: req.user._id,
      companyName: employerProfile.companyName,
      location,
      workMode,
      employmentType,
      fieldsOfStudy: fieldsOfStudy || [],
      minYear,
      maxYear,
      skills: skills || [],
      salary,
    });

    return res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { location, workMode, employmentType, fieldOfStudy, studyYear } = req.query;

    const filter = {};

    if (location) {
      filter.location = new RegExp(location, "i");
    }

    if (workMode) {
      filter.workMode = workMode;
    }

    if (employmentType) {
      filter.employmentType = employmentType;
    }

    if (fieldOfStudy) {
      filter.fieldsOfStudy = { $in: [new RegExp(fieldOfStudy, "i")] };
    }

    if (studyYear) {
      filter.minYear = { $lte: Number(studyYear) };
      filter.maxYear = { $gte: Number(studyYear) };
    }

    const jobs = await Job.find(filter)
      .populate("employer", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Jobs fetched successfully",
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "employer",
      "name email role"
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({
        message: "Only employers can access their jobs",
      });
    }

    const jobs = await Job.find({ employer: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Employer jobs fetched successfully",
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};