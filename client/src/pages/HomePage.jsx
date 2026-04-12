import { useState, useEffect } from "react";
import axios from "axios";
import JobList from "../components/JobList";
import Navbar from "../components/Navbar";
import "./HomePage.css";

function HomePage({ isLoggedIn, onLogout, role}) {
    const [jobs, setJobs] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

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

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(term) ||
            job.companyName.toLowerCase().includes(term) ||
            job.description.toLowerCase().includes(term) ||
            job.location.toLowerCase().includes(term);

        const matchesQuickFilter =
            activeFilter === "all" ||
            job.workMode === activeFilter ||
            job.employmentType === activeFilter;

        return matchesSearch && matchesQuickFilter;
    });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (sortBy === "title-asc") {
            return a.title.localeCompare(b.title);
        }

        if (sortBy === "title-desc") {
            return b.title.localeCompare(a.title);
        }

        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} role={role} />

            <div className="homepage-container" >
                <section className="homepage-hero" >
                    <p className="homepage-hero-label">
                        Student careers platform
                    </p>

                    <h1 className="homepage-hero-title">
                        Find student jobs that actually fit your skills and studies
                    </h1>

                    <p className="homepage-hero-text">
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

                    <div className="homepage-search-row">
                        <input
                            className="homepage-search-input"
                            type="text"
                            placeholder="Search jobs by title, company or location..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && setFilterValue(inputValue)}
                        />
                        <button
                            className="homepage-search-button"
                            onClick={() => setFilterValue(inputValue)}
                        >
                            Search jobs
                        </button>
                    </div>

                    <div className="homepage-filters">
                        {["all", "remote", "hybrid", "onsite", "internship", "part-time", "junior"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                style={{
                                    background: activeFilter === filter ? "#8b5cf6" : "transparent",
                                    color: "#ffffff",
                                    border: "1px solid #334155",
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                </section>

                <div className="homepage-results-bar">
                    <div>
                        <h2 style={{ marginBottom: "6px" }}>Latest opportunities</h2>
                        <p>
                            {filterValue
                                ? `Showing results for "${filterValue}"`
                                : "Explore the latest offers for students."}
                        </p>
                    </div>

                    <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                width: "auto",
                                minWidth: "180px",
                            }}
                        >
                            <option value="newest">Newest</option>
                            <option value="title-asc">Title A-Z</option>
                            <option value="title-desc">Title Z-A</option>
                    </select>

                    <div className="homepage-results-count" >
                        {sortedJobs.length} offer{sortedJobs.length === 1 ? "" : "s"}
                    </div>
                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : sortedJobs.length === 0 ? (
                    <div className="homepage-empty-state">
                        <h3 style={{ marginBottom: "10px" }}>No job offers found</h3>
                        <p>Try a different keyword or clear your search.</p>
                    </div>
                ) : (
                    <JobList jobs={sortedJobs} />
                )}
            </div>
        </div>
    );
};

export default HomePage;