import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function JobDetails({ job, onBack, isLoggedIn }) {
    return (
        <div>
            <h1>Student Jobs App</h1>
            <button onClick={onBack}>Back</button>

            <h2>{job.title}</h2>
            <p>{job.companyName}</p>
            <p>{job.description}</p>
            <p>{job.location}</p>
            <p>{job.workMode}</p>
            <p>{job.employmentType}</p>
            <p>{job.salary}</p>

            {isLoggedIn ? (
                <button>Apply Now</button>
            ) : (
                <Link to="/login" state={{from: "/"}}>Login to apply</Link>
            )}
        </div>
    );
};

JobDetails.propTypes = {
  job: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default JobDetails;