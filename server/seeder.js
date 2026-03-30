import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Job from "./models/Job.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const seedJobs = async () => {
  try {
    const employer = await User.findOne({role: "employer"});
    console.log("Employer found:", employer);
    
    const jobs = [
        {
        title: "Praktyki w dziale IT",
        description: "Szukamy praktykanta do działu IT, który pomoże nam w codziennych zadaniach i projektach.",
        employer: employer._id,
        companyName: "Tech Solutions",
        location: "Warszawa",
        workMode: "hybrid",
        employmentType: "internship",
        fieldOfStudy: ["Computer Science", "Information Technology"],
        minYear: 2,
        maxYear: 5,
        skills: ["JavaScript", "Node.js", "MongoDB"],
        salary: "2000 PLN"
        },
        {
        title: "Software Development Internship",
        description: "Join our software development team as an intern and gain hands-on experience working on real projects.",
        employer: employer._id,
        companyName: "NEST Software",
        location: "Kraków",
        workMode: "onsite",
        employmentType: "internship",
        fieldOfStudy: ["Computer Science", "Information Technology", "Telecommunications"],
        minYear: 4,
        maxYear: 5,
        skills: ["TypeScript", "Node.js", "PostgreSQL", "English"],
        salary: "5000 PLN"
        },
        {
        title: "Junior Data Scientist",
        description: "We are looking for a Junior Data Scientist to join our team and help us analyze large datasets to drive business decisions.",
        employer: employer._id,
        companyName: "Nokia Solutions",
        location: "Kraków",
        workMode: "onsite",
        employmentType: "junior",
        fieldOfStudy: ["Computer Science", "Data Science", "Mathematics", "Statistics"],
        minYear: 3,
        maxYear: 5,
        skills: ["Python", "Pandas", "SQL", "Power BI", "English"],
        salary: "3000 PLN"
        }
    ];

    await Job.insertMany(jobs);
    console.log("Jobs seeded successfully");

  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
};

seedJobs();
