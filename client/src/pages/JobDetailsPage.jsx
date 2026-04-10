import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function JobDetailsPage({ isLoggedIn }) {
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
            <h1>Student Jobs App</h1>
            {isLoggedIn && <Link state={{from: `/jobs/${id}`}} to="/my-applications">My Applications</Link>}

            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.companyName}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Work mode:</strong> {job.workMode}</p>
            <p><strong>Employment type:</strong> {job.employmentType}</p>
            <p><strong>Salary:</strong> {job.salary || "Not specified"}</p>
            <p><strong>Year of study:</strong> {job.minYear} - {job.maxYear}</p>

            <p>
                <strong>Fields of study:</strong>{" "}
                {job.fieldsOfStudy && job.fieldsOfStudy.length > 0
                    ? job.fieldsOfStudy.join(", ")
                    : "Not specified"}
            </p>

            <p>
                <strong>Skills:</strong>{" "}
                {job.skills && job.skills.length > 0
                    ? job.skills.join(", ")
                    : "Not specified"}
            </p>

            <p><strong>Description:</strong></p>
            <p>{job.description}</p>

            {isLoggedIn ? (
                isApplied ? (
                    <button disabled>Applied</button>
                ) : (
                    <Link to={`/jobs/${id}/apply`} state={{ from: `/jobs/${id}` }}>
                        Apply
                    </Link>
                )
            ) : (
                <Link to="/login" state={{ from: `/jobs/${id}` }}>
                    Login to apply
                </Link>
            )}

            <Link to="/">Back</Link>
        </div>
    );
};

JobDetailsPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default JobDetailsPage;