import { useState, useEffect } from "react";
import axios from "axios";
import JobList from "./components/JobList";
import JobDetails from "./components/Jobdetails";

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
      <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
    );
  }

  return (
    <div>
      <h1>Student Jobs App</h1>
      <div>
        <h2>Job Offers</h2>
        <JobList jobs={jobs} onSelectJob={setSelectedJob} />
      </div>

    </div>
  );
}

export default App;