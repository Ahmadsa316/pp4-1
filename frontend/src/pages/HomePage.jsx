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

  if (loading) return <p>Loading...</p>;
  if (jobs.length === 0) return <p>No jobs found</p>;

  return (
    <div>
      <h1>Job Listings</h1>

      <Link to="/add-job">
        <button>Add Job</button>
      </Link>

      {jobs.map((job) => (
        <div key={job._id}>
          <Link to={`/job/${job._id}`}><h2>{job.title}</h2></Link>
          <p>Type: {job.type}</p>
          <p>{job.company?.name}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
