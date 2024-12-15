import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./registerInstructor.module.scss";
//import Header Footer
import Button from "@mui/material/Button";
import axios from "axios";

const cx = classNames.bind(styles);
function RegisterInstructor() {
  const [formData, setFormData] = useState({
    UserName: "",
    RoleId: 2,
    Password: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    FullName: "",
    Avatar: null,
    DOB: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, Avatar: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataTosend = new FormData();
    formDataTosend.append("UserName", formData.UserName);
    formDataTosend.append("RoleId", formData.RoleId);
    formDataTosend.append("Password", formData.Password);
    formDataTosend.append("Email", formData.Email);
    formDataTosend.append("PhoneNumber", formData.PhoneNumber);
    formDataTosend.append("Address", formData.Address);
    formDataTosend.append("FullName", formData.FullName);
    if (formData.Avatar) {
      formDataTosend.append("Avatar", formData.Avatar);
    }
    formDataTosend.append("DOB", formData.DOB);

    try {
      const response = await axios.post(
        "https://localhost:7269/api/Authen/register",
        formDataTosend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      alert("Register successfully wait Admin Approve");
    } catch (err) {
      alert("Not registered successfully");
    }
  };

  return (
    <div className={cx("wrapper-register-instructor")}>
      <div className={cx("form-container")}>
        <div className={cx("margin-bottom-footer-220")}>
          <h2>Register instructor</h2>
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
                name="DOB"
                value={formData.DOB}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="tel"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="Address"
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

export default RegisterInstructor;
