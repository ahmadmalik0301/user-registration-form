import { useState } from "react";
import axios from "axios";
import "./UpdateUser.css";

function UpdateUser() {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [message, setMessage] = useState("");

  const countries = ["USA", "Canada", "UK", "Australia", "Other"];

  const fetchUser = async () => {
    if (!userId) {
      setMessage("Please enter a user ID.");
      return;
    }
    setLoadingUser(true);
    setMessage("");
    setUserData(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.user) {
        setUserData(response.data.user);
      } else {
        setMessage("User not found.");
      }
    } catch (error) {
      setMessage("Failed to fetch user.");
    } finally {
      setLoadingUser(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!userData) return;

    setLoadingUpdate(true);
    setMessage("");

    try {
      const { id, ...dataWithoutId } = userData;
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        dataWithoutId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message || "User updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      if (error.response) {
        setMessage(error.response.data.message || "Failed to update user.");
      } else if (error.request) {
        setMessage("No response from server.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <section className="updateuser-container">
      <header>
        <h2>Update User</h2>
      </header>

      <div className="load-user-section">
        <label htmlFor="userIdInput">Enter User ID:</label>
        <input
          id="userIdInput"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
        />
        <button
          onClick={fetchUser}
          disabled={loadingUser}
          className="load-user-btn"
        >
          {loadingUser ? "Loading..." : "Load User"}
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      {userData && (
        <form onSubmit={handleUpdate} className="updateuser-form">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            name="first_name"
            value={userData.first_name || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            name="last_name"
            value={userData.last_name || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            name="age"
            value={userData.age || ""}
            onChange={handleChange}
            required
            min={1}
          />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            type="tel"
            name="phone_number"
            value={userData.phone_number || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={userData.email || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={userData.country || ""}
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

          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={userData.address || ""}
            onChange={handleChange}
            rows={3}
            required
          />

          <button type="submit" disabled={loadingUpdate} className="update-btn">
            {loadingUpdate ? "Updating..." : "Update User"}
          </button>
        </form>
      )}
    </section>
  );
}

export default UpdateUser;
