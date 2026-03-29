import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    workMode: {
      type: String,
      enum: ["onsite", "hybrid", "remote"],
      required: true,
    },
    employmentType: {
      type: String,
      enum: ["internship", "part-time", "junior"],
      required: true,
    },
    fieldsOfStudy: [
      {
        type: String,
        trim: true,
      },
    ],
    minYear: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    maxYear: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    salary: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;