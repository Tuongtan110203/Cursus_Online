import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./registerStudent.module.scss";
import Button from "@mui/material/Button";
import axios from "axios";

const cx = classNames.bind(styles);

function RegisterStudent() {
  const [formData, setFormData] = useState({
    RoleId: 1, // Default RoleId
    UserName: "",
    Password: "",
    FullName: "",
    DOB: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    Avatar: null,
    Status: "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      Avatar: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("RoleId", formData.RoleId);
    formDataToSend.append("UserName", formData.UserName);
    formDataToSend.append("Password", formData.Password);
    formDataToSend.append("FullName", formData.FullName);
    formDataToSend.append("DOB", formData.DOB);
    formDataToSend.append("Email", formData.Email);
    formDataToSend.append("PhoneNumber", formData.PhoneNumber);
    formDataToSend.append("Address", formData.Address);
    formDataToSend.append("Status", formData.Status);

    if (formData.Avatar) {
      formDataToSend.append("Avatar", formData.Avatar);
    }

    try {
      const response = await axios.post(
        "https://localhost:7269/api/Authen/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Register successfully");
    } catch (err) {
      alert("Not registered successfully");
    }
  };

  return (
    <div className={cx("wrapper-register-student")}>
      <div className={cx("form-container")}>
        <div className={cx("margin-bottom-footer-220")}>
          <h2>Register Student</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>UserName:</label>
              <input
                type="text"
                name="UserName"
                value={formData.UserName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                required
                autoComplete="current-password"
              />
            </div>
            <div>
              <label>Full Name:</label>
              <input
                type="text"
                name="FullName"
                value={formData.FullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Avatar:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="DOB" // Correct name mapping
                value={formData.DOB}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="Email" // Correct name mapping
                value={formData.Email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="tel"
                name="PhoneNumber" // Correct name mapping
                value={formData.PhoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="Address" // Correct name mapping
                value={formData.Address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={cx("button-regis")}>
              <a href="/login">
                <Button variant="outlined">Back Login</Button>
              </a>
              <button type="submit" className={cx("btn btn-primary")}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterStudent;
