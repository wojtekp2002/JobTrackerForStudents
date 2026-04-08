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
            <h1>Student Jobs App</h1>
            <h2>Job Offers</h2>
            {!isLoggedIn ? <Link to="/login">Login</Link> : <button onClick={onLogout}>Logout</button>}
            <input
            type="text"
            placeholder="Search jobs..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setFilterValue(inputValue)}
            />
            <button onClick={() => setFilterValue(inputValue)}>Search</button>

            {isLoading ? (
            <p>Loading...</p>
            ) : filteredJobs.length === 0 ? (
            <p>No job offers found.</p>
            ) : (
            <JobList jobs={filteredJobs} />
            )}
        </div>
    );
};

export default HomePage;