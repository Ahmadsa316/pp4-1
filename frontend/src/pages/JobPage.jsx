import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function JobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };

    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete job");

      navigate("/");
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  if (!job) return <p>Loading job...</p>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Company:</strong> {job.company.name}</p>
      <p><strong>Email:</strong> {job.company.contactEmail}</p>
      <p><strong>Phone:</strong> {job.company.contactPhone}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>

      <br />

      <button
        onClick={handleDelete}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px"
        }}
      >
        Delete Job
      </button>

      <Link to="/">⬅ Back to home</Link>
    </div>
  );
}

export default JobPage;
