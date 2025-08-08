import { useState } from "react";
import axios from "axios";

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
        console.error("Response data:", error.response.data);
        setMessage(error.response.data.message || "Failed to update user.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setMessage("No response from server.");
      } else {
        console.error("Request setup error:", error.message);
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div className="container">
      <h2>Update User</h2>

      <div>
        <label>Enter User ID:</label>
        <br />
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
        />
        <button
          onClick={fetchUser}
          disabled={loadingUser}
          style={{ marginLeft: 10 }}
        >
          {loadingUser ? "Loading..." : "Load User"}
        </button>
      </div>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}

      {userData && (
        <form onSubmit={handleUpdate} style={{ marginTop: 20 }}>
          <label>First Name:</label>
          <br />
          <input
            type="text"
            name="first_name"
            value={userData.first_name || ""}
            onChange={handleChange}
            required
          />
          <br />

          <label>Last Name:</label>
          <br />
          <input
            type="text"
            name="last_name"
            value={userData.last_name || ""}
            onChange={handleChange}
            required
          />
          <br />

          <label>Age:</label>
          <br />
          <input
            type="number"
            name="age"
            value={userData.age || ""}
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
            value={userData.phone_number || ""}
            onChange={handleChange}
            required
          />
          <br />

          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={userData.email || ""}
            onChange={handleChange}
            required
          />
          <br />

          <label>Country:</label>
          <br />
          <select
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
          <br />

          <label>Address:</label>
          <br />
          <textarea
            name="address"
            value={userData.address || ""}
            onChange={handleChange}
            rows={3}
            required
          ></textarea>
          <br />

          <button type="submit" disabled={loadingUpdate}>
            {loadingUpdate ? "Updating..." : "Update User"}
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateUser;
