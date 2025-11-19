import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="home">
      <div className="job-list">
        {jobs.length === 0 && <p>No jobs found</p>}
        {jobs.length !== 0 &&
          jobs.map((job) => <JobListing key={job.id} {...job} />)}
      </div>
    </div>
  );
};

export default Home;
