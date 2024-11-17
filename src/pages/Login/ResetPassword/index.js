import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import classNames from "classnames/bind";
import styles from "./ResetPassword.module.scss";
import axios from "axios";
import password1 from "~/images/password.svg";
import passwordshowup from "~/images/passwordshowup.svg";

const cx = classNames.bind(styles);

function ResetPassword() {
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Thêm state loading
  const [token, setToken] = useState(""); // State để lưu token
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputNewPassword || !inputConfirmPassword) {
      setMessage("Please fill in both fields.");
      return;
    }
    if (inputNewPassword !== inputConfirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    if (!token) {
      setMessage("Invalid token.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://localhost:7269/api/PasswordReset/reset-password",
        {
          token: token,
          newPassword: inputNewPassword,
          confirmPassword: inputConfirmPassword,
        }
      );
      setMessage("Password has been reset successfully.");
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage(
        error.response
          ? error.response.data.Message
          : "An error occurred while resetting your password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={cx("section-reset-password")}>
      <section className={cx("section-header")}>
        <header>
          <Header />
        </header>
      </section>
      <section className={cx("section-body")}>
        <div className={cx("forgot-password", "margin-bottom-footer")}>
          <div className={cx("container")}>
            <p>
              Reset password. Please enter your new password and confirm
              password. You will have a new password to login.
            </p>
            <b>
              <p>Please Input Password</p>
            </b>
            <form onSubmit={handleSubmit}>
              {/* New Password Input */}
              <div className={cx("input-group")}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New password"
                  className={cx("input-new-password")}
                  value={inputNewPassword}
                  onChange={(e) => setInputNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <img
                  src={showNewPassword ? passwordshowup : password1}
                  className={cx("icon-password")}
                  alt="password-icon"
                  onClick={() => setShowNewPassword(!showNewPassword)} // Chỉ điều khiển ô New Password
                />
              </div>

              {/* Confirm Password Input */}
              <div className={cx("input-group")}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className={cx("input-confirm-password")}
                  value={inputConfirmPassword}
                  onChange={(e) => setInputConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <img
                  src={showConfirmPassword ? passwordshowup : password1}
                  className={cx("icon-password")}
                  alt="password-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Chỉ điều khiển ô Confirm Password
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className={cx("btn btn-primary")}>
                Reset Password
              </button>
            </form>

            {message && <p>{message}</p>}
          </div>
        </div>
      </section>
      <section className={cx("section-footer")}>
        <footer>
          <Footer />
        </footer>
      </section>
    </section>
  );
}

export default ResetPassword;
