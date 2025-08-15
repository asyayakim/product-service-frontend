import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserProvider";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";

export const API_BASE_URL = "https://hotelservice-1.onrender.com";

export default function Login() {
  const { login } = useContext(UserContext)!;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || `Login failed: ${response.status}`);
        return;
      }

      const user = {
        id: data.userDto.id,
        username: data.userDto.userName,
        email: data.userDto.email,
        role: data.userDto.role,
        token: data.token,
        imageUrl: data.userDto.imageUrl,
      };

      login({ user, token: data.token });
      setMessage("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <main className="main">
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Login</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Login</li>
            </ol>
          </nav>
        </div>
      </div>

      <section id="login" className="py-12">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="max-w-md p-8 mx-auto bg-white shadow-md rounded-xl">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold">Welcome Back</h3>
              <p>Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="flex items-center mb-4 overflow-hidden border rounded-lg">
                <span className="px-3 text-gray-500">
                  <FaUser />
                </span>
                <input
                  type="text"
                  className="w-full px-1 py-3 outline-none"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center mb-4 overflow-hidden border rounded-lg">
                <span className="px-3 text-gray-500">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-1 py-3 outline-none"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="px-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button
                type="submit"
                className="w-full py-3 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Sign In
              </button>

              {message && <p className="mt-4 text-red-500">{message}</p>}

              <p className="mt-4 text-center">
                Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}