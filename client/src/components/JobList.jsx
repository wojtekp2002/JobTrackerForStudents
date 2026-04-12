import PropTypes from "prop-types";
import JobItem from "./JobItem";
import "./JobList.css";

function JobList({ jobs }) {
    return (
        <ul className="job-list">
            {jobs.map((job) => (
                <JobItem key={job._id} job={job} />
            ))}
        </ul>
    );
}

JobList.propTypes = {
    jobs: PropTypes.array.isRequired,
};

export default JobList;