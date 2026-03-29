import mongoose from "mongoose";

const applicationSchema =  new mongoose.Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StudentProfile",
            required: true,
            unique: true,
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;