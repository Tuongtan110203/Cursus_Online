import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./registerStudent.module.scss";
//import Header Footer
import Button from "@mui/material/Button";

const cx = classNames.bind(styles);

function RegisterStudent() {
  const [formData, setFormData] = useState({
    userName: "",
    roleID: 1,
    password: "",
    email: "",
    phone: "",
    address: "",
    fullName: "",
    avatar: null,
    dob: "",
  });

  const defaultAvatar = "~/images/avatar.png";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formSubmitData = {
      ...formData,
      avatar: formData.avatar || defaultAvatar,
    };
    console.log(formSubmitData);
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
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
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
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
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
