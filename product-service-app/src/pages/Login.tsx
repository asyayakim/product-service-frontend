import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserProvider";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

export const API_BASE_URL = "https://hotelservice-1.onrender.com";

export default function Login() {
  const { login } = useContext(UserContext)!;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

      <section id="login" className="login section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="auth-container" data-aos="fade-in" data-aos-delay="200">
                <div className="auth-form login-form active">
                  <div className="form-header">
                    <h3>Welcome Back</h3>
                    <p>Sign in to your account</p>
                  </div>

                  <form className="auth-form-content" onSubmit={handleLogin}>
                    <div className="input-group mb-3">
                      <span className="input-icon">
                        <img
                          src="https://img.icons8.com/?size=100&id=zxB19VPoVLjK&format=png&color=000000"
                          alt="Username Icon"
                          width="20"
                          height="20"
                        />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        autoComplete="username"
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-icon">
                        <img
                          src="https://img.icons8.com/?size=100&id=14095&format=png&color=000000"
                          alt="Password Icon"
                          width="20"
                          height="20"
                        />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                      <span 
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>

                    <div className="form-options mb-4">
                      <div className="remember-me">
                        <input 
                          type="checkbox" 
                          id="rememberLogin"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberLogin">Remember me</label>
                      </div>
                      <Link to="/login/restorePassword" className="forgot-password">
                        Forgot password?
                      </Link>
                    </div>

                    <button type="submit" className="auth-btn primary-btn mb-3">
                      Sign In
                      <i className="bi bi-arrow-right"></i>
                    </button>

                    {message && <div className="message mb-3">{message}</div>}

                    <div className="divider">
                      <span>or</span>
                    </div>

                    <button type="button" className="auth-btn social-btn">
                      <FaGoogle />
                      Continue with Google
                    </button>

                    <div className="switch-form">
                      <span>Don't have an account?</span>
                      <button 
                        type="button" 
                        className="switch-btn" 
                        onClick={() => navigate("/signUp")}
                      >
                        Create account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}