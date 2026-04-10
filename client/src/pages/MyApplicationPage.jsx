import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMessage, setErrMessage] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/applications/my-applications",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setApplications(response.data.applications);
                setErrMessage("");
            } catch (error) {
                console.error("Error fetching applications:", error);
                setErrMessage("Failed to load applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errMessage) {
        return <div>{errMessage}</div>;
    }

    return (
    <div>
        <Navbar isLoggedIn={true} />

        <div
            style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "32px 16px",
            }}
        >
            <h1 style={{ marginBottom: "24px" }}>My Applications</h1>

            {applications.length === 0 ? (
                <p>You have not applied to any jobs yet.</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gap: "18px",
                    }}
                >
                    {applications.map((application) => (
                        <div
                            key={application._id}
                            style={{
                                background: "rgba(30, 41, 59, 0.9)",
                                border: "1px solid #334155",
                                borderRadius: "20px",
                                padding: "20px",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                            }}
                        >
                            <h3 style={{ marginBottom: "8px" }}>
                                {application.job?.title}
                            </h3>

                            <p style={{ color: "#cbd5e1", marginBottom: "10px" }}>
                                {application.job?.companyName}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    flexWrap: "wrap",
                                    marginBottom: "12px",
                                }}
                            >
                                <span
                                    style={{
                                        padding: "6px 10px",
                                        borderRadius: "999px",
                                        background: "#0f172a",
                                        border: "1px solid #334155",
                                        fontSize: "13px",
                                    }}
                                >
                                    Status: {application.status}
                                </span>

                                <span
                                    style={{
                                        padding: "6px 10px",
                                        borderRadius: "999px",
                                        background: "#0f172a",
                                        border: "1px solid #334155",
                                        fontSize: "13px",
                                    }}
                                >
                                    Applied:{" "}
                                    {new Date(application.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <Link
                                to={`/jobs/${application.job?._id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "#c4b5fd",
                                }}
                            >
                                View job →
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);
}

export default MyApplicationsPage;