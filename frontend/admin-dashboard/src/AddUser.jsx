import { useState } from "react";
import axios from "axios";

function AddUser() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    phone_number: "",
    email: "",
    country: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [addedUser, setAddedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const countries = ["USA", "Canada", "UK", "Australia", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setAddedUser(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/users", // replace with your API endpoint
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message || "User added successfully!");
      setAddedUser(response.data.user || null);

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        age: "",
        phone_number: "",
        email: "",
        country: "",
        address: "",
      });
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Failed to add user.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Add New User</h2>

      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <br />
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <br />

        <label>Last Name:</label>
        <br />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <br />

        <label>Age:</label>
        <br />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          min={1}
        />
        <br />

        <label>Phone Number:</label>
        <br />
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <br />

        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label>Country:</label>
        <br />
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <br />

        <label>Address:</label>
        <br />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          required
        ></textarea>
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddUser;
