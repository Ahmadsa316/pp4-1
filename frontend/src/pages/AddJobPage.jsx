import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddJobPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    location: "",
    salary: "",
    companyName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title: formData.title,
      type: formData.type,
      description: formData.description,
      location: formData.location,
      salary: Number(formData.salary),
      company: {
        name: formData.companyName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
      },
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) throw new Error("Failed to add job");

      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add job.");
    }
  };

  return (
    <div>
      <h1>Add New Job</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" onChange={handleChange} required />
        <input name="type" placeholder="Job Type" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />

        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="salary" placeholder="Salary" type="number" onChange={handleChange} required />

        <input name="companyName" placeholder="Company Name" onChange={handleChange} required />
        <input name="contactEmail" placeholder="Contact Email" onChange={handleChange} required />
        <input name="contactPhone" placeholder="Contact Phone" onChange={handleChange} required />

        <button type="submit">Add Job</button>
      </form>

      <br />
      <button onClick={() => navigate("/")}>⬅ Back</button>
    </div>
  );
}

export default AddJobPage;
