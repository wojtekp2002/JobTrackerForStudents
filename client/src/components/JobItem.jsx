import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function JobItem({ job }) {
  return (
    <li>
        <Link to={`/jobs/${job._id}`}>{job.title}</Link>
        <p>{job.companyName}</p>
        <p>{job.location}</p>
        <p>{job.description}</p>
    </li>
  );
}

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobItem;