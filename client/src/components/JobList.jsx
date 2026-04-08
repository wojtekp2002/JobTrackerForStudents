import PropTypes from "prop-types";
import JobItem from "./JobItem";

function JobList({ jobs }) {

  return (
    <ul>
        {jobs.map(job => (
            <JobItem key={job._id} job={job} />
        ))}
    </ul>
  );
}

JobList.propTypes = {
  jobs: PropTypes.array.isRequired,
};

export default JobList;