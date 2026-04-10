import mongoose from "mongoose";

const applicationSchema =  new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
        },
        currLocation: {
            type: String,
        },
        cvFilePath: {
            type: String,
            required: true,
        },
        coverLetter: {
            type: String,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        status: {
            type: String,
            enum: ["applied", "interviewing", "accepted", "rejected"],
            default: "applied",
        },
    },
    {
        timestamps: true,
    }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;