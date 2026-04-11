import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Job from "./models/Job.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const seedJobs = async () => {
  try {
    const employer = await User.findOne({ role: "employer" });

    if (!employer) {
      console.log("No employer found. Create one first.");
      process.exit(1);
    }

    await Job.deleteMany();

    const jobs = [
      {
        title: "Frontend Developer Intern",
        description: "Work with React and modern frontend stack to build user interfaces.",
        employer: employer._id,
        companyName: "TechFlow",
        location: "Kraków",
        workMode: "hybrid",
        employmentType: "internship",
        fieldsOfStudy: ["Computer Science", "IT"],
        minYear: 2,
        maxYear: 5,
        skills: ["React", "JavaScript", "CSS"],
        salary: "3000 PLN",
      },
      {
        title: "Backend Node.js Developer",
        description: "Build scalable APIs using Node.js, Express and MongoDB.",
        employer: employer._id,
        companyName: "CodeBase",
        location: "Warszawa",
        workMode: "remote",
        employmentType: "junior",
        fieldsOfStudy: ["Computer Science"],
        minYear: 3,
        maxYear: 5,
        skills: ["Node.js", "Express", "MongoDB"],
        salary: "6000 PLN",
      },
      {
        title: "Part-time React Developer",
        description: "Develop UI components and collaborate with design team.",
        employer: employer._id,
        companyName: "UI Studio",
        location: "Wrocław",
        workMode: "remote",
        employmentType: "part-time",
        fieldsOfStudy: ["IT", "Software Engineering"],
        minYear: 2,
        maxYear: 5,
        skills: ["React", "TypeScript"],
        salary: "4000 PLN",
      },
      {
        title: "Junior Data Analyst",
        description: "Analyze datasets and create reports using BI tools.",
        employer: employer._id,
        companyName: "DataCorp",
        location: "Kraków",
        workMode: "onsite",
        employmentType: "junior",
        fieldsOfStudy: ["Data Science", "Mathematics"],
        minYear: 3,
        maxYear: 5,
        skills: ["SQL", "Excel", "Power BI"],
        salary: "5500 PLN",
      },
      {
        title: "QA Tester Intern",
        description: "Test applications and report bugs.",
        employer: employer._id,
        companyName: "SoftCheck",
        location: "Poznań",
        workMode: "hybrid",
        employmentType: "internship",
        fieldsOfStudy: ["IT"],
        minYear: 1,
        maxYear: 5,
        skills: ["Testing", "Manual QA"],
        salary: "2500 PLN",
      },
      {
        title: "Mobile Developer (React Native)",
        description: "Build mobile apps using React Native.",
        employer: employer._id,
        companyName: "Appify",
        location: "Gdańsk",
        workMode: "remote",
        employmentType: "junior",
        fieldsOfStudy: ["Computer Science"],
        minYear: 3,
        maxYear: 5,
        skills: ["React Native", "JavaScript"],
        salary: "7000 PLN",
      },
      {
        title: "DevOps Intern",
        description: "Help maintain CI/CD pipelines and cloud infrastructure.",
        employer: employer._id,
        companyName: "CloudOps",
        location: "Warszawa",
        workMode: "hybrid",
        employmentType: "internship",
        fieldsOfStudy: ["IT", "DevOps"],
        minYear: 2,
        maxYear: 5,
        skills: ["Docker", "Linux", "Git"],
        salary: "3500 PLN",
      },
      {
        title: "UI/UX Designer",
        description: "Design modern interfaces and improve user experience.",
        employer: employer._id,
        companyName: "DesignHub",
        location: "Kraków",
        workMode: "remote",
        employmentType: "part-time",
        fieldsOfStudy: ["Design"],
        minYear: 2,
        maxYear: 5,
        skills: ["Figma", "UX", "UI"],
        salary: "4500 PLN",
      },
      {
        title: "Java Developer Junior",
        description: "Work on backend systems using Java and Spring Boot.",
        employer: employer._id,
        companyName: "EnterpriseSoft",
        location: "Katowice",
        workMode: "onsite",
        employmentType: "junior",
        fieldsOfStudy: ["Computer Science"],
        minYear: 3,
        maxYear: 5,
        skills: ["Java", "Spring Boot"],
        salary: "6500 PLN",
      },
      {
        title: "Cybersecurity Intern",
        description: "Support security audits and monitor threats.",
        employer: employer._id,
        companyName: "SecureIT",
        location: "Warszawa",
        workMode: "hybrid",
        employmentType: "internship",
        fieldsOfStudy: ["Cybersecurity"],
        minYear: 2,
        maxYear: 5,
        skills: ["Networking", "Security"],
        salary: "3000 PLN",
      },
    ];

    await Job.insertMany(jobs);

    console.log("Jobs seeded successfully 🚀");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
};

seedJobs();