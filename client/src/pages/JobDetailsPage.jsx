import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";

function JobDetailsPage({ isLoggedIn, onLogout }) {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                console.log("Fetched job details:", response.data);
                setJob(response.data.job);
            } catch (error) {
                console.error("Error fetching job details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    useEffect(() => {
        const checkApplication = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `http://localhost:5000/api/applications/check/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setIsApplied(response.data.applied);
            } catch (error) {
                console.error("Error checking application:", error);
            }
        };

        if (isLoggedIn) {
            checkApplication();
        }
    }, [id, isLoggedIn]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!job) {
        return <div>Job not found.</div>;
    }

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout}/>

            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    padding: "32px 16px",
                }}
            >
                <Link
                    to="/"
                    style={{
                        display: "inline-block",
                        marginBottom: "16px",
                        color: "#c4b5fd",
                        textDecoration: "none",
                    }}
                >
                    Back
                </Link>

                <div
                    style={{
                        background: "rgba(30, 41, 59, 0.9)",
                        border: "1px solid #334155",
                        borderRadius: "24px",
                        padding: "28px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: "16px",
                            flexWrap: "wrap",
                            marginBottom: "24px",
                        }}
                    >
                        <div>
                            <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>{job.title}</h1>
                            <p style={{ fontSize: "18px", color: "#cbd5e1" }}>{job.companyName}</p>
                        </div>

                        <div
                            style={{
                                padding: "8px 14px",
                                borderRadius: "999px",
                                background: "rgba(139, 92, 246, 0.16)",
                                border: "1px solid rgba(139, 92, 246, 0.35)",
                                color: "#ddd6fe",
                                fontSize: "14px",
                                fontWeight: 600,
                            }}
                        >
                            {job.employmentType}
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginBottom: "24px",
                        }}
                    >
                        <span
                            style={{
                                padding: "7px 12px",
                                borderRadius: "999px",
                                background: "#0f172a",
                                border: "1px solid #334155",
                                color: "#cbd5e1",
                                fontSize: "14px",
                            }}
                        >
                            {job.location}
                        </span>

                        <span
                            style={{
                                padding: "7px 12px",
                                borderRadius: "999px",
                                background: "#0f172a",
                                border: "1px solid #334155",
                                color: "#cbd5e1",
                                fontSize: "14px",
                            }}
                        >
                            {job.workMode}
                        </span>

                        <span
                            style={{
                                padding: "7px 12px",
                                borderRadius: "999px",
                                background: "#0f172a",
                                border: "1px solid #334155",
                                color: "#cbd5e1",
                                fontSize: "14px",
                            }}
                        >
                            Year {job.minYear} - {job.maxYear}
                        </span>

                        <span
                            style={{
                                padding: "7px 12px",
                                borderRadius: "999px",
                                background: "#0f172a",
                                border: "1px solid #334155",
                                color: "#cbd5e1",
                                fontSize: "14px",
                            }}
                        >
                            {job.salary || "Salary not specified"}
                        </span>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <h3 style={{ marginBottom: "10px" }}>Fields of study</h3>
                        <p>
                            {job.fieldsOfStudy && job.fieldsOfStudy.length > 0
                                ? job.fieldsOfStudy.join(", ")
                                : "Not specified"}
                        </p>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <h3 style={{ marginBottom: "10px" }}>Skills</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {job.skills && job.skills.length > 0 ? (
                                job.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            padding: "6px 10px",
                                            borderRadius: "10px",
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid #334155",
                                            color: "#cbd5e1",
                                            fontSize: "13px",
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p>Not specified</p>
                            )}
                        </div>
                    </div>

                    <div style={{ marginBottom: "28px" }}>
                        <h3 style={{ marginBottom: "10px" }}>Description</h3>
                        <p style={{ lineHeight: 1.8 }}>{job.description}</p>
                    </div>

                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        {isLoggedIn ? (
                            isApplied ? (
                                <button disabled>Applied</button>
                            ) : (
                                <Link to={`/jobs/${id}/apply`} style={{ textDecoration: "none" }}>
                                    <button>Apply now</button>
                                </Link>
                            )
                        ) : (
                            <Link to="/login" state={{ from: `/jobs/${id}` }} style={{ textDecoration: "none" }}>
                                <button>Login to apply</button>
                            </Link>
                        )}

                        <Link to="/" style={{ textDecoration: "none" }}>
                            <button
                                style={{
                                    background: "transparent",
                                    border: "1px solid #334155",
                                    color: "#e5e7eb",
                                }}
                            >
                                Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

JobDetailsPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func,
};

export default JobDetailsPage;