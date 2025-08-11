import { useState } from "react";
import api from "../../api/api";
import "./AddUser.css";

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

  const countries = ["USA", "Canada", "UK", "Australia", "Pakistan", "Other"];

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
      const response = await api.post("users", formData);

      setMessage(response.data.message || "User added successfully!");
      setAddedUser(response.data.user || null);

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
    <div className="adduser-container">
      <h2 className="adduser-title">Add New User</h2>

      <form onSubmit={handleSubmit} className="adduser-form">
        <label className="adduser-label" htmlFor="first_name">
          First Name:
        </label>
        <input
          id="first_name"
          className="adduser-input"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />

        <label className="adduser-label" htmlFor="last_name">
          Last Name:
        </label>
        <input
          id="last_name"
          className="adduser-input"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />

        <label className="adduser-label" htmlFor="age">
          Age:
        </label>
        <input
          id="age"
          className="adduser-input"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min={1}
        />

        <label className="adduser-label" htmlFor="phone_number">
          Phone Number:
        </label>
        <input
          id="phone_number"
          className="adduser-input"
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />

        <label className="adduser-label" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          className="adduser-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="adduser-label" htmlFor="country">
          Country:
        </label>
        <select
          id="country"
          className="adduser-select"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label className="adduser-label" htmlFor="address">
          Address:
        </label>
        <textarea
          id="address"
          className="adduser-textarea"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
        />

        <button type="submit" disabled={loading} className="adduser-button">
          {loading ? "Adding..." : "Submit"}
        </button>

        {message && <p className="adduser-message">{message}</p>}
        {addedUser && (
          <pre className="adduser-userdata">
            {JSON.stringify(addedUser, null, 2)}
          </pre>
        )}
      </form>
    </div>
  );
}

export default AddUser;
