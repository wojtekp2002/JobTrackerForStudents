import PropTypes from "prop-types";
import JobItem from "./JobItem";

function JobList({ jobs }) {
    return (
        <ul
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: "18px",
            }}
        >
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