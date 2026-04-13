import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddJobPage({ isLoggedIn, role }) {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [workMode, setWorkMode] = useState("onsite");
    const [employmentType, setEmploymentType] = useState("internship");
    const [fieldsOfStudy, setFieldsOfStudy] = useState("");
    const [minYear, setMinYear] = useState("");
    const [maxYear, setMaxYear] = useState("");
    const [skills, setSkills] = useState("");
    const [salary, setSalary] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !location || !workMode || !employmentType || !minYear || !maxYear) {
            setErrMessage("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        setErrMessage("");

        const token = localStorage.getItem("token");

        const payload = {
            title,
            description,
            location,
            workMode,
            employmentType,
            fieldsOfStudy: fieldsOfStudy
                ? fieldsOfStudy.split(",").map((item) => item.trim()).filter(Boolean)
                : [],
            minYear: Number(minYear),
            maxYear: Number(maxYear),
            skills: skills
                ? skills.split(",").map((item) => item.trim()).filter(Boolean)
                : [],
            salary,
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/api/jobs",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error creating job:", error);

            if (error.response?.data?.message) {
                setErrMessage(error.response.data.message);
            } else {
                setErrMessage("Something went wrong while creating the job offer.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (role === "guest") {
        return (
            <div>
                <h1>Please log in first.</h1>
                <Link to="/login">Login</Link>
            </div>
        );
    }

    if (role === null) {
        return <p>Loading...</p>;
    }

    if (role !== "employer") {
        return (
            <div>
                <h1>Only employers can add job offers.</h1>
                <Link to="/">Back to home</Link>
            </div>
        );
    }

    return (
        <div>
            <h2>Create offer</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                </label>

                <label>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location"
                    />
                </label>

                <label>
                    Work Mode:
                    <select value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
                        <option value="onsite">Onsite</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="remote">Remote</option>
                    </select>
                </label>

                <label>
                    Employment Type:
                    <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
                        <option value="internship">Internship</option>
                        <option value="part-time">Part-time</option>
                        <option value="junior">Junior</option>
                    </select>
                </label>

                <label>
                    Fields of Study:
                    <input
                        type="text"
                        value={fieldsOfStudy}
                        onChange={(e) => setFieldsOfStudy(e.target.value)}
                        placeholder="e.g. Computer Science, IT"
                    />
                </label>

                <label>
                    Minimum Year:
                    <input
                        type="number"
                        value={minYear}
                        onChange={(e) => setMinYear(e.target.value)}
                        placeholder="Minimum Year"
                    />
                </label>

                <label>
                    Maximum Year:
                    <input
                        type="number"
                        value={maxYear}
                        onChange={(e) => setMaxYear(e.target.value)}
                        placeholder="Maximum Year"
                    />
                </label>

                <label>
                    Skills:
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g. React, Node.js, MongoDB"
                    />
                </label>

                <label>
                    Salary:
                    <input
                        type="text"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="e.g. 5000 PLN"
                    />
                </label>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Create Job"}
                </button>
            </form>

            {errMessage && <p>{errMessage}</p>}
        </div>
    );
}

export default AddJobPage;