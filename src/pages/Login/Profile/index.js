import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import Avatar from "~/images/avatar.png";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ananymous from "~/images/anonymous.png";
import "react-image-crop/src/ReactCrop.scss";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const cx = classNames.bind(styles);

function Profile() {
  const [selectedContent, setSelectedContent] = useState("Profile");
  const [imagePreview, setImagePreview] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "Nguyen Tan Tuong",
    email: "example@example.com",
    phone: "0123456789",
    address: "123 Main St",
    fullName: "Nguyen Tan Tuong",
    birthDate: "2000-01-01",
    createDate: "2023-11-01",
    referralCode: "ABC123",
  });
  // input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  //preview image
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  //button mui
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const renderContent = () => {
    switch (selectedContent) {
      case "Profile":
        return (
          <div>
            <div className={cx("title-profile")}>
              <div className={cx("content-profile")}>
                <b>
                  <h4>Profile</h4>
                </b>
                <p>Information about yourself</p>
              </div>
            </div>
            <div className={cx("input-profile")}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={userInfo.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Birth Date</label>
                <input
                  type="date"
                  name="birthDate"
                  placeholder="Birth Date"
                  value={userInfo.birthDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Create Date</label>
                <input
                  readOnly
                  type="date"
                  placeholder="Create Date"
                  value={userInfo.createDate}
                />
              </div>
              <div>
                <label>Referral Code</label>
                <input
                  readOnly
                  type="text"
                  placeholder="Referral Code"
                  value={userInfo.referralCode}
                />
              </div>
            </div>
            <div className={cx("button-save")}>
              <Button variant="outlined">Save</Button>
            </div>
          </div>
        );
      case "Photo":
        return (
          <div>
            <div className={cx("title-profile")}>
              <div className={cx("content-photo")}>
                <h4>Photo</h4>
                <p>Add a nice photo of yourself for your profile</p>
              </div>
            </div>
            <div className={cx("upload-photo")}>
              <h5>Image preview</h5>
              <div className={cx("image-preview")}>
                <div className={cx("image-view")}>
                  <img src={imagePreview || ananymous} alt="Profile" />
                </div>
              </div>
              <div className={cx("add-file")}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Button>
                <Button variant="contained">Save</Button>
              </div>
            </div>
          </div>
        );

      case "Account Security":
        return (
          <div>
            <div className={cx("title-profile")}>
              <div className={cx("content-security")}>
                <h4>Account Security</h4>
                <p>Edit your account settings and change your password here</p>
              </div>
            </div>
            <div className={cx("security-email")}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
              <button className={cx("button-security-email")}>
                Change Email
              </button>
            </div>
            <div className={cx("spacing-border-top")}></div>
            <div className={cx("security-password")}>
              <form>
                <label>Password:</label>
                <input type="password" placeholder="Enter current password" />
                <input type="password" placeholder="Enter new password" />
                <input type="password" placeholder="Enter Re-type password" />
                <button
                  className={cx("button-security-password")}
                  type="submit"
                >
                  Change password
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className={cx("wrapper-profile")}>
        <div className={cx("container", "profile")}>
          <div className={cx("row")}>
            <div className={cx("col-3", "content-left")} style={{ padding: 0 }}>
              <div className={cx("avatar")}>
                <img src={Avatar} alt="avatar" />
              </div>
              <div className={cx("name-profile")}>
                <b>
                  <span>Nguyen Tan Tuong</span>
                </b>
              </div>
              <div className={cx("list-content")}>
                <ul>
                  <li
                    onClick={() => setSelectedContent("Profile")}
                    className={
                      selectedContent === "Profile" ? cx("active") : ""
                    }
                  >
                    <Link to="#">Profile</Link>
                  </li>
                  <li
                    onClick={() => setSelectedContent("Photo")}
                    className={selectedContent === "Photo" ? cx("active") : ""}
                  >
                    <Link to="#">Photo</Link>
                  </li>
                  <li
                    onClick={() => setSelectedContent("Account Security")}
                    className={
                      selectedContent === "Account Security" ? cx("active") : ""
                    }
                  >
                    <Link to="#">Account Security</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx("col-9")} style={{ padding: 0 }}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Profile;
