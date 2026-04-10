import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
            <h1>My Applications</h1>
            <Link to="/">Back</Link>

            {applications.length === 0 ? (
                <p>You have not applied to any jobs yet.</p>
            ) : (
                <div>
                    {applications.map((application) => (
                        <div key={application._id}>
                            <h3>{application.job?.title}</h3>
                            <p>Company: {application.job?.companyName}</p>
                            <p>Status: {application.status}</p>
                            <p>
                                Applied at:{" "}
                                {new Date(application.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyApplicationsPage;