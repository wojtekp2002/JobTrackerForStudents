import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, GraduationCap, DollarSign } from "lucide-react";

function JobItem({ job }) {
    return (
        <li>
            <Link
                to={`/jobs/${job._id}`}
                style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                }}
            >
                <article
                    style={{
                        background: "rgba(30, 41, 59, 0.9)",
                        border: "1px solid #334155",
                        borderRadius: "20px",
                        padding: "22px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: "16px",
                            marginBottom: "14px",
                            flexWrap: "wrap",
                        }}
                    >
                        <div>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "28px",
                                    color: "#f8fafc",
                                }}
                            >
                                {job.title}
                            </h3>

                            <p
                                style={{
                                    marginTop: "8px",
                                    fontSize: "18px",
                                    color: "#cbd5e1",
                                }}
                            >
                                {job.companyName}
                            </p>
                        </div>

                        <div
                            style={{
                                padding: "8px 12px",
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
                            gap: "10px",
                            flexWrap: "wrap",
                            marginBottom: "16px",
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
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <MapPin size={16} />
                                {job.location}
                            </div>
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
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <Briefcase size={16} />
                                {job.workMode}
                            </div>
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
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <GraduationCap size={16} />
                                Year {job.minYear}-{job.maxYear}
                            </div>
                        </span>

                        {job.salary && (
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
                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <DollarSign size={16} />
                                    {job.salary}
                                </div>
                            </span>
                        )}
                    </div>

                    <p
                        style={{
                            fontSize: "16px",
                            lineHeight: 1.7,
                            color: "#94a3b8",
                            marginBottom: "16px",
                        }}
                    >
                        {job.description.length > 180
                            ? `${job.description.slice(0, 180)}...`
                            : job.description}
                    </p>

                    {job.skills && job.skills.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                            }}
                        >
                            {job.skills.slice(0, 4).map((skill, index) => (
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
                            ))}
                        </div>
                    )}
                </article>
            </Link>
        </li>
    );
}

JobItem.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobItem;