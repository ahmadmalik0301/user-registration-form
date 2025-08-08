import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="container">
      <h2>All Users</h2>

      {loading && <p>Loading users...</p>}

      {message && <p>{message}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginTop: 20,
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              width: "250px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone_number}
            </p>
            <p>
              <strong>Country:</strong> {user.country}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowUsers;
