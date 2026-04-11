import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import JobList from "../components/JobList";
import Navbar from "../components/Navbar";

function HomePage({ isLoggedIn, onLogout }) {
    const [jobs, setJobs] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:5000/api/jobs")
        .then(response => {
            setJobs(response.data.jobs);
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
            console.error("Error fetching job offers:", error);
        });
    }, []);

    const term = filterValue.toLowerCase().trim();
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.companyName.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term)
    );

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    padding: "32px 16px 48px",
                }}
            >
                <section
                    style={{
                        background:
                            "radial-gradient(circle at top left, rgba(139, 92, 246, 0.22), transparent 35%), rgba(30, 41, 59, 0.92)",
                        border: "1px solid #334155",
                        borderRadius: "28px",
                        padding: "36px",
                        boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
                        marginBottom: "28px",
                    }}
                >
                    <p
                        style={{
                            color: "#c4b5fd",
                            fontSize: "14px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: "12px",
                        }}
                    >
                        Student careers platform
                    </p>

                    <h1
                        style={{
                            fontSize: "52px",
                            lineHeight: 1.05,
                            marginBottom: "14px",
                            maxWidth: "700px",
                        }}
                    >
                        Find student jobs that actually fit your skills and studies.
                    </h1>

                    <p
                        style={{
                            fontSize: "18px",
                            color: "#cbd5e1",
                            maxWidth: "720px",
                            lineHeight: 1.7,
                            marginBottom: "28px",
                        }}
                    >
                        Browse internships, part-time roles and junior opportunities.
                        Search by title, company, description or location and apply in a few clicks.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap",
                            marginBottom: "28px",
                        }}
                    >
                        <div
                            style={{
                                padding: "8px 14px",
                                borderRadius: "999px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid #334155",
                                color: "#cbd5e1",
                                fontSize: "14px",
                            }}
                        >
                            Internships
                        </div>

                        <div
                            style={{
                                padding: "8px 14px",
                                borderRadius: "999px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid #334155",
                                color: "#cbd5e1",
                                fontSize: "14px",
                            }}
                        >
                            Part-time jobs
                        </div>

                        <div
                            style={{
                                padding: "8px 14px",
                                borderRadius: "999px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid #334155",
                                color: "#cbd5e1",
                                fontSize: "14px",
                            }}
                        >
                            Junior roles
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search jobs by title, company or location..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && setFilterValue(inputValue)}
                            style={{
                                flex: 1,
                                minWidth: "260px",
                                padding: "14px 16px",
                                fontSize: "16px",
                            }}
                        />
                        <button
                            onClick={() => setFilterValue(inputValue)}
                            style={{
                                minWidth: "140px",
                                fontWeight: 600,
                            }}
                        >
                            Search jobs
                        </button>
                    </div>
                </section>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <h2 style={{ marginBottom: "6px" }}>Latest opportunities</h2>
                        <p>
                            {filterValue
                                ? `Showing results for "${filterValue}"`
                                : "Explore the latest offers for students."}
                        </p>
                    </div>

                    <div
                        style={{
                            padding: "8px 12px",
                            borderRadius: "999px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid #334155",
                            color: "#cbd5e1",
                            fontSize: "14px",
                        }}
                    >
                        {filteredJobs.length} offer{filteredJobs.length === 1 ? "" : "s"}
                    </div>
                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : filteredJobs.length === 0 ? (
                    <div
                        style={{
                            background: "rgba(30, 41, 59, 0.9)",
                            border: "1px solid #334155",
                            borderRadius: "20px",
                            padding: "24px",
                        }}
                    >
                        <h3 style={{ marginBottom: "10px" }}>No job offers found</h3>
                        <p>Try a different keyword or clear your search.</p>
                    </div>
                ) : (
                    <JobList jobs={filteredJobs} />
                )}
            </div>
        </div>
    );
};

export default HomePage;