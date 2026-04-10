import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import JobList from "../components/JobList";

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
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 24px",
                    borderBottom: "1px solid #ccc",
                }}
            >
                <h2 style={{ margin: 0 }}>StudentyWantWork</h2>

                <div style={{ display: "flex", alignItems: "center", gap: "12px"}}>
                    {!isLoggedIn ? (
                        <Link to="/login" style={{borderRadius: "25%"}}>Login</Link>
                    ) : (
                        <>
                            <Link to="/my-applications" >My Applications</Link>
                            <button onClick={onLogout} style={{cursor: "pointer"}}>Logout</button>
                        </>
                    )}
                </div>
            </div>

            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    padding: "24px 16px",
                }}
            >
                <h1 style={{ marginBottom: "8px" }}>Job Offers</h1>
                <p style={{ marginTop: 0 }}>Find internships, part-time jobs and junior roles.</p>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "20px",
                        marginBottom: "24px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && setFilterValue(inputValue)}
                        style={{
                            flex: 1,
                            padding: "10px",
                        }}
                    />
                    <button onClick={() => setFilterValue(inputValue)}>Search</button>
                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : filteredJobs.length === 0 ? (
                    <p>No job offers found.</p>
                ) : (
                    <JobList jobs={filteredJobs} />
                )}
            </div>
        </div>

    );
};

export default HomePage;