import PropTypes from "prop-types";
import JobItem from "./JobItem";

function JobList({ jobs, onSelectJob }) {
  if (jobs.length === 0) {
    return <p>No job offers found.</p>;
  }

  return (
    <ul>
        {jobs.map(job => (
            <JobItem key={job._id} job={job} onSelectJob={onSelectJob} />
        ))}
    </ul>
  );
}

JobList.propTypes = {
  jobs: PropTypes.array.isRequired,
  onSelectJob: PropTypes.func.isRequired
};

export default JobList;