import { useState } from "react";
import axios from "axios";
import "./DeleteUser.css";

function DeleteUser() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [deletedUser, setDeletedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!userId.trim()) {
      setMessage("Please enter a user ID.");
      return;
    }

    setLoading(true);
    setMessage("");
    setDeletedUser(null);

    try {
      const token = localStorage.getItem("token");

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
    <section className="container">
      <header>
        <h2>Delete User</h2>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
        }}
        aria-label="Delete user form"
      >
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            id="userId"
            name="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Deleting..." : "Delete User"}
        </button>
      </form>

      {message && <p role="alert">{message}</p>}

      {deletedUser && (
        <article className="deleted-user-info">
          <h3>Deleted User:</h3>
          <pre>{JSON.stringify(deletedUser, null, 2)}</pre>
        </article>
      )}
    </section>
  );
}

export default DeleteUser;
