import PropTypes from "prop-types";

function JobDetails({ job, onBack }) {
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
        </div>
    );
};

JobDetails.propTypes = {
  job: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired
};

export default JobDetails;