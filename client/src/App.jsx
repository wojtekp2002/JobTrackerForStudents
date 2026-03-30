import { useState, useEffect } from "react";
import axios from "axios";
import JobList from "./components/JobList";
import JobDetails from "./components/Jobdetails";

function App() {
  
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:5000/api/jobs")
      .then(response => {
        setJobs(response.data.jobs);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching job offers:", error);
      });
  }, []);

  const term = filterValue.toLowerCase().trim();
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(term) ||
    job.companyName.toLowerCase().includes(term) ||
    job.description.toLowerCase().includes(term) ||
    job.location.toLowerCase().includes(term)
  );

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
        <input
          type="text"
          placeholder="Search jobs..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setFilterValue(inputValue)}
        />
        <button onClick={() => setFilterValue(inputValue)}>Search</button>

        <JobList jobs={filteredJobs} onSelectJob={setSelectedJob} />
      </div>

    </div>
  );
}

export default App;