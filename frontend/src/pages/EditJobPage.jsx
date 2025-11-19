import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();
        setTitle(data.title || "");
        setType(data.type || "");
        setDescription(data.description || "");
        setCompanyName(data.company?.name || "");
        setContactEmail(data.company?.contactEmail || "");
        setContactPhone(data.company?.contactPhone || "");
        setLocation(data.location || "");
        setSalary(data.salary || "");
      } catch (err) {
        console.error(err);
        setError("Unable to load job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedJob = {
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
      location,
      salary,
    };

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJob),
      });

      if (!res.ok) throw new Error("Failed to update job");

      // Navigate to the job details page after successful update
      navigate(`/jobs/${id}`);
    } catch (err) {
      console.error(err);
      setError("Update failed. Please try again.");
    }
  };

  const cancelEdit = () => {
    // Simply navigate back to the job details page
    navigate(`/jobs/${id}`);
  };

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-job">
      <h2>Edit Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Company Name:</label>
        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

        <label>Contact Email:</label>
        <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />

        <label>Contact Phone:</label>
        <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />

        <label>Location:</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} />

        <label>Salary:</label>
        <input value={salary} onChange={(e) => setSalary(e.target.value)} />

        <button type="submit">Update Job</button>
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
