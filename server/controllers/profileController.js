import StudentProfile from "../models/StudentProfile.js";
import EmployerProfile from "../models/EmployerProfile.js";

export const createStudentProfile = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can create a student profile",
      });
    }

    const {
      university,
      fieldOfStudy,
      studyYear,
      studyMode,
      city,
      studentEmail,
      studentIdNumber,
    } = req.body;

    if (!university || !fieldOfStudy || !studyYear || !studyMode || !city) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const existingProfile = await StudentProfile.findOne({ user: req.user._id });

    if (existingProfile) {
      return res.status(400).json({
        message: "Student profile already exists",
      });
    }

    const profile = await StudentProfile.create({
      user: req.user._id,
      university,
      fieldOfStudy,
      studyYear,
      studyMode,
      city,
      studentEmail,
      studentIdNumber,
    });

    return res.status(201).json({
      message: "Student profile created successfully",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const createEmployerProfile = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({
        message: "Only employers can create an employer profile",
      });
    }

    const { companyName, companyDescription, website, location } = req.body;

    if (!companyName || !companyDescription || !location) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const existingProfile = await EmployerProfile.findOne({ user: req.user._id });

    if (existingProfile) {
      return res.status(400).json({
        message: "Employer profile already exists",
      });
    }

    const profile = await EmployerProfile.create({
      user: req.user._id,
      companyName,
      companyDescription,
      website,
      location,
    });

    return res.status(201).json({
      message: "Employer profile created successfully",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    let profile = null;

    if (req.user.role === "student") {
      profile = await StudentProfile.findOne({ user: req.user._id }).populate(
        "user",
        "name email role"
      );
    }

    if (req.user.role === "employer") {
      profile = await EmployerProfile.findOne({ user: req.user._id }).populate(
        "user",
        "name email role"
      );
    }

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
