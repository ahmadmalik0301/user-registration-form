import { useEffect, useState } from "react";
import axios from "axios";
import "./ShowUsers.css";

function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setMessage("");
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data.users || []);
        setMessage(response.data.message || "Users fetched successfully!");
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message || "Failed to fetch users.");
        } else {
          setMessage("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="show-container">
      <header>
        <h2>All Users</h2>
      </header>

      {loading && <p aria-live="polite">Loading users...</p>}

      {message && <p role="alert">{message}</p>}

      <div className="users-list" aria-live="polite">
        {users.length === 0 && !loading && <p>No users to display.</p>}

        {users.map((user) => (
          <article key={user.id} className="user-card">
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Age:</strong> {user.age || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone_number || "N/A"}
            </p>
            <p>
              <strong>Country:</strong> {user.country || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {user.address || "N/A"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ShowUsers;
