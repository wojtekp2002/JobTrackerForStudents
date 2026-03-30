import PropTypes from "prop-types";

function JobItem({ job, onSelectJob }) {
  return (
    <li onClick={() => onSelectJob(job)}>
        <h3>{job.title}</h3>
        <p>{job.companyName}</p>
        <p>{job.description}</p>
        <p>{job.location}</p>
    </li>
  );
}

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
  onSelectJob: PropTypes.func.isRequired
};

export default JobItem;