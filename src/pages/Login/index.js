import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import login from "~/images/login.svg";
import password1 from "~/images/password.svg";
import passwordshowup from "~/images/passwordshowup.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "~/Animation/Loading/Loading";
import google from "~/images/google.png";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";

const cx = classNames.bind(styles);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7269/api/Authen/login",
        { email, password },
        { withCredentials: true }
      );
      const token = Cookies.get("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        const roleId = decodedToken.RoleId;

        if (roleId === "1") {
          navigate("/");
        } else if (roleId === "2") {
          navigate("/instructor-dash-board");
        } else if (roleId === "3") {
          navigate("/admin-dash-board");
        }
      } else {
        alert("Token not found. Please log in again.");
      }
    } catch (error) {
      alert("Login failed. Please check your email and password.");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("login-background")}>
      {loading ? (
        <Loading />
      ) : (
        <div className={cx("wrapper")}>
          <div className={cx("scale-in-center")}>
            <div className={cx("online-course-management")}>
              <button className={cx("home-goto")} onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faHouse} />
              </button>
              <p className={cx("cursus-title")}>Online Course Management</p>
            </div>
            <h1>Login</h1>
            <>
              <div className={cx("input-box")}>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onKeyDown={handleKeyDown}
                />
                <img
                  src={login}
                  className={cx("icon-login")}
                  alt="login-icon"
                />
              </div>

              <div className={cx("input-box")}>
                <form onSubmit={handleLogin}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    onKeyDown={handleKeyDown}
                    autoComplete="@Sktt9123@"
                  />
                </form>
                <img
                  src={showPassword ? passwordshowup : password1}
                  className={cx("icon-login")}
                  alt="password-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>

              <div className={cx("google-forgot-container")}>
                <div className={cx("google-button")}>
                  <GoogleLogin
                    //  onSuccess={handleGoogleLoginSuccess}
                    onError={() => console.error("Google login failed")}
                  />
                </div>

                <div className={cx("remember-forgot")}>
                  <a href="/forgot-password">Forgot password?</a>
                </div>
              </div>

              <button className={cx("button-login-page")} onClick={handleLogin}>
                Login
              </button>
              <div className={cx("register-link")}>
                <p>Don't have an account?</p>
                <div className={cx("linkregist")}>
                  <a href="register-student">
                    <span>Register as student</span>
                  </a>
                  <span>|</span>
                  <a href="register-instructor">
                    <span>Register as instructor</span>
                  </a>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
