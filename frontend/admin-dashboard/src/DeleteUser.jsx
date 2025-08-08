import { useState } from "react";
import axios from "axios";

function DeleteUser() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [deletedUser, setDeletedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!userId) {
      setMessage("Please enter a user ID.");
      return;
    }

    setLoading(true);
    setMessage("");
    setDeletedUser(null);

    try {
      const token = localStorage.getItem("token");

      // Assuming your API endpoint is something like /api/users/:id
      const response = await axios.delete(
        `http://localhost:3000/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message || "User deleted successfully.");
      setDeletedUser(response.data.user || null);
      setUserId(""); // Clear input after delete
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Failed to delete user.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Delete User</h2>

      <label>User ID:</label>
      <br />
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user ID"
      />
      <br />

      <button
        onClick={handleDelete}
        disabled={loading}
        style={{ marginTop: 10 }}
      >
        {loading ? "Deleting..." : "Delete User"}
      </button>

      {message && <p style={{ marginTop: 20 }}>{message}</p>}

      {deletedUser && (
        <div style={{ marginTop: 10 }}>
          <h3>Deleted User:</h3>
          <pre>{JSON.stringify(deletedUser, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DeleteUser;
