import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { API_BASE_URL } from "../apiConfig";
import { useAppDispatch, useAppSelector } from "../components/app/Store";
import { login as loginAction } from "../features/User/userSlice";
import { Link } from "react-router-dom";

export default function Login() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  if (user.user) {
    navigate("/");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userName, password }),
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
        favorites: data.userDto.favorites || [],
        basket: data.userDto.basket || [],
      };

      dispatch(loginAction(user));
      setMessage("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <main className="main">
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
                Login
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