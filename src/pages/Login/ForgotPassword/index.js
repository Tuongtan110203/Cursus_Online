import { useState } from "react";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import classNames from "classnames/bind";
import styles from "./ForgotPassword.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function ForgotPassword() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!input) {
      setMessage("Please enter your username or email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7269/api/PasswordReset/request-password-reset",
        {
          email: input,
        }
      );
      setMessage(response.data.Message || "Password reset request sent.");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />
      <div className={cx("forgot-password", "margin-bottom-footer")}>
        <div className={cx("container")}>
          <p>
            Forgot your password? Please enter your username or email address.
            You will receive a link to create a new password via email.
          </p>
          <b>
            <p>Please Input Email or Username</p>
          </b>
          <input
            type="text"
            placeholder="Please input email or username"
            className={cx("input-forgot")}
            value={input}
            onChange={handleChange}
          />
          <button
            type="button"
            className={cx("btn btn-primary")}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Forgot Password"}
          </button>
          {message && <p className={cx("message")}>{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
