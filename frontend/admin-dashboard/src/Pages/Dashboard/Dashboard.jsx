import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button className="button" onClick={() => navigate("/add-user")}>
        Add New User
      </button>
      <button className="button" onClick={() => navigate("/update-user")}>
        Update User
      </button>
      <button className="button" onClick={() => navigate("/delete-user")}>
        Delete User
      </button>
      <button className="button" onClick={() => navigate("/show-users")}>
        Show All Users
      </button>
    </div>
  );
}

export default Dashboard;
