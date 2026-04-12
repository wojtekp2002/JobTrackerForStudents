import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, GraduationCap, DollarSign } from "lucide-react";
import "./JobItem.css";

function JobItem({ job }) {
    return (
        <li>
            <Link to={`/jobs/${job._id}`} className="job-item-link">
                <article className="job-card">
                    <div className="job-card-header">
                        <div>
                            <h3 className="job-card-title">{job.title}</h3>
                            <p className="job-card-company">{job.companyName}</p>
                        </div>

                        <div className="job-card-badge">
                            {job.employmentType}
                        </div>
                    </div>

                    <div className="job-card-meta">
                        <span className="job-card-meta-item">
                            <MapPin size={16} />
                            {job.location}
                        </span>

                        <span className="job-card-meta-item">
                            <Briefcase size={16} />
                            {job.workMode}
                        </span>

                        <span className="job-card-meta-item">
                            <GraduationCap size={16} />
                            Year {job.minYear}-{job.maxYear}
                        </span>

                        {job.salary && (
                            <span className="job-card-meta-item">
                                <DollarSign size={16} />
                                {job.salary}
                            </span>
                        )}
                    </div>

                    <p className="job-card-description">
                        {job.description.length > 180
                            ? `${job.description.slice(0, 180)}...`
                            : job.description}
                    </p>

                    {job.skills && job.skills.length > 0 && (
                        <div className="job-card-skills">
                            {job.skills.slice(0, 4).map((skill, index) => (
                                <span key={index} className="job-card-skill">
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