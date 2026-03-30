import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then(response => {
        setJobs(response.data.jobs);
      })
      .catch(error => {
        console.error("Error fetching job offers:", error);
      });
  }, []);

  const [selectedJob, setSelectedJob] = useState(null);
  
  if (selectedJob) {
  return (
    <div>
      <h1>Student Jobs App</h1>
      <button onClick={() => setSelectedJob(null)}>Back</button>

      <h2>{selectedJob.title}</h2>
      <p>{selectedJob.companyName}</p>
      <p>{selectedJob.description}</p>
      <p>{selectedJob.location}</p>
      <p>{selectedJob.workMode}</p>
      <p>{selectedJob.employmentType}</p>
      <p>{selectedJob.salary}</p>
    </div>
  );
  }

  return (
    <div>
      <h1>Student Jobs App</h1>
      <div>
        <h2>Job Offers</h2>
        <ul>
          {jobs.map(job => (
            <li key={job._id} onClick={() => setSelectedJob(job)}>
              <h3>{job.title}</h3>
              <p>{job.companyName}</p>
              <p>{job.description}</p>
              <p>{job.location}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;