import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setToken(null);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      // Assuming your API returns { token: "...", message: "..." }
      setToken(response.data.token);
      setMessage(response.data.message || "Login successful!");

      // Optional: Save token in localStorage for persistence
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      // Handle errors (network or API errors)
      if (error.response) {
        // Server responded with an error status
        setMessage(error.response.data.message || "Login failed!");
      } else {
        // Network or other error
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label>Password:</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Show message below the form */}
      {message && (
        <div style={{ marginTop: 20, color: token ? "green" : "red" }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default App;
