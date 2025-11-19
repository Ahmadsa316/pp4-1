import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  if (jobs.length === 0) return <p>No jobs found</p>;

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id} style={{ marginBottom: "20px" }}>
          <h2>
            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
          </h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Company: {job.company.name}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;