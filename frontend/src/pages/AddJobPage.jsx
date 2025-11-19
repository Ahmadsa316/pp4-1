import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddJobPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState(0);

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const newJob = {
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
      location,
      salary: Number(salary),
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (res.ok) {
        console.log("Job created!");
        navigate("/");
      } else {
        console.log("Error creating job");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={submitForm} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "20px auto" }}>
      <h2>Add Job</h2>
      
      <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <input type="text" placeholder="Job Type" value={type} onChange={(e) => setType(e.target.value)} required />

      <textarea placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

      <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />

      <input type="email" placeholder="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />

      <input type="text" placeholder="Contact Phone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required />

      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />

      <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />

      <button type="submit" style={{ padding: "10px", backgroundColor: "black", color: "white", borderRadius: "5px" }}>Submit</button>
    </form>
  );
}

export default AddJobPage;
