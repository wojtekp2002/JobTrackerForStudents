import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    university: {
      type: String,
      required: true,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
    },
    studyYear: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    studyMode: {
      type: String,
      enum: ["full-time", "part-time"],
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    studentEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    studentIdNumber: {
      type: String,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

export default StudentProfile;