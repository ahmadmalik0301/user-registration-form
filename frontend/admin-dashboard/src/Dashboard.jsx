import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button
        style={{
          display: "block",
          margin: "10px 0",
          padding: "10px",
          width: "100%",
        }}
        onClick={() => navigate("/add-user")}
      >
        Add New User
      </button>
      <button
        style={{
          display: "block",
          margin: "10px 0",
          padding: "10px",
          width: "100%",
        }}
        onClick={() => navigate("/update-user")}
      >
        Update User
      </button>
      <button
        style={{
          display: "block",
          margin: "10px 0",
          padding: "10px",
          width: "100%",
        }}
        onClick={() => navigate("/delete-user")}
      >
        Delete User
      </button>
      <button
        style={{
          display: "block",
          margin: "10px 0",
          padding: "10px",
          width: "100%",
        }}
        onClick={() => navigate("/show-users")}
      >
        Show All Users
      </button>
    </div>
  );
}

export default Dashboard;
