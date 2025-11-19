import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditJobPage() {
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
        console.error("Error fetching job:", err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedJob),
      });

      if (!res.ok) throw new Error("Update failed");

      navigate(`/jobs/${id}`);
    } catch (err) {
      console.error("Error updating job:", err);
      setError("Failed to update job.");
    }
  };

  const cancelEdit = () => navigate(`/jobs/${id}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Edit Job</h1>
      <form onSubmit={handleSubmit}>
        <input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />

        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <textarea value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />

        <input value={companyName} placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)} required />
        <input value={contactEmail} placeholder="Email" onChange={(e) => setContactEmail(e.target.value)} required />
        <input value={contactPhone} placeholder="Phone" onChange={(e) => setContactPhone(e.target.value)} required />

        <input value={location} placeholder="Location" onChange={(e) => setLocation(e.target.value)} required />
        <input type="number" value={salary} placeholder="Salary" onChange={(e) => setSalary(e.target.value)} required />

        <br /><br />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={cancelEdit} style={{ marginLeft: "10px" }}>Cancel</button>
      </form>
    </div>
  );
}

export default EditJobPage;
