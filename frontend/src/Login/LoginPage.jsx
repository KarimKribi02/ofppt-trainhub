import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      console.log("Login Successful:", response.data);

      // Stocker le token et le rôle
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      // Rediriger selon le rôle
      if (response.data.user.role === "CDC") {
        console.log("Redirection vers /CDC");
        navigate("/CDC");
      } else if (response.data.user.role === "DREF") {
        console.log("Redirection vers /DREF");
        navigate("/DREF");
      } else if (response.data.user.role === "ANIMATEUR") {
        console.log("Redirection vers /ANIMATEUR");
        // navigate("/ANIMATEUR");
      }
       else {
        console.log("Redirection vers /");
        navigate("/");
      }
    } catch (err) {
      console.error("Login Failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Identifiants invalides. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
