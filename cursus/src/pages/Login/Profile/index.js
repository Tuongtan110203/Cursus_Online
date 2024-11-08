import React, { useState } from "react"; // import react và useState
import classNames from "classnames/bind"; // import classNames
import styles from "./Profile.module.scss"; // import scss
import Header from "~/components/Layout/Header"; // import header
import Footer from "~/components/Layout/Footer"; // import footer
import Avatar from "~/images/avatar.png"; // import avatar
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const cx = classNames.bind(styles);

function Profile() {
  const [selectedContent, setSelectedContent] = useState("Profile");
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
                <input type="text" placeholder="Name" value={userInfo.name} />
              </div>
              <div>
                <label>Email</label>
                <input type="text" placeholder="Email" value={userInfo.email} />
              </div>
              <div>
                <label>Phone</label>
                <input type="text" placeholder="Phone" value={userInfo.phone} />
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  value={userInfo.address}
                />
              </div>
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={userInfo.fullName}
                />
              </div>
              <div>
                <label>Birth Date</label>
                <input
                  type="date"
                  placeholder="Birth Date"
                  value={userInfo.birthDate}
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
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
            </div>
          </div>
        );
      case "Photo":
        return (
          <div>
            <h4>Photo</h4>
            <p>Photos section content here</p>
          </div>
        );
      case "Account Security":
        return (
          <div>
            <h4>Account Security</h4>
            <p>Account security information here</p>
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
