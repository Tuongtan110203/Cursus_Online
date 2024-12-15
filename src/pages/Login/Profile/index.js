import React, { useState, useEffect } from "react";
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
import UserAPI from "~/API/UserAPI";
import { toast } from "react-toastify"; // Import thư viện thông báo nếu cần
import "react-toastify/dist/ReactToastify.css"; // Import CSS nếu dùng react-toastify
import { useUser } from "~/Context/UserContext/UserContext"; // use context

const cx = classNames.bind(styles);

function Profile() {
  const [selectedContent, setSelectedContent] = useState("Profile");
  const [imagePreview, setImagePreview] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { userInfo, setUserInfo } = useUser(); // Lấy thông tin và hàm cập nhật từ context

  // get profile user
  const getProfileUser = async () => {
    try {
      const response = await UserAPI().getProfileByUserName();
      setUserInfo({
        ...response,
        dob: formatDate(response.dob),
        createdDate: formatDate(response.createdDate),
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProfileUser();
  }, []);
  //get profile user

  // Update password function
  const updatePassword = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    const OldPassword = e.target.OldPassword.value;
    const NewPassword = e.target.NewPassword.value;
    const ConfirmPassword = e.target.ConfirmPassword.value;

    if (NewPassword !== ConfirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    try {
      // Gọi API
      const response = await UserAPI().updatePassword({
        OldPassword,
        NewPassword,
        ConfirmPassword,
      });

      if (response.status === 200) {
        toast.success(response, { autoClose: 2000 });
      } else {
        toast.error(response || "Failed to update password");
      }
    } catch (error) {
      toast.error(error.message || "Error updating password");
    }
  };
  // end update password

  //update profile
  const updateProfile = async () => {
    if (isUpdating) return; // Prevent multiple submissions

    setIsUpdating(true);

    const formData = new FormData();
    formData.append("email", userInfo.email);
    formData.append("address", userInfo.address);
    formData.append("fullName", userInfo.fullName);
    formData.append("dob", userInfo.dob);

    if (userInfo.avatar) {
      formData.append("avatar", userInfo.avatar); // Add the avatar file to the form data
    }

    try {
      const response = await UserAPI().updateProfile(formData);

      if (response === "Success Update") {
        toast.success("Profile updated successfully!", {
          autoClose: 2000,
        });

        // Get updated user info, including new avatar URL
        const updatedProfile = await UserAPI().getProfileByUserName();
        setUserInfo({
          ...updatedProfile,
          dob: formatDate(updatedProfile.dob),
          createdDate: formatDate(updatedProfile.createdDate),
        });

        // Reset image preview
        setImagePreview(null);
      } else {
        toast.error("Failed to update profile", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    } finally {
      setIsUpdating(false); // Reset the loading state
    }
  };
  // get wallet by user name
  const [dataWallet, setDataWallet] = useState({});
  useEffect(() => {
    if (userInfo && userInfo.userName) {
      const getWalletByUserName = async () => {
        try {
          const response = await UserAPI().getWalletByUserName();
          setDataWallet(response);
        } catch (error) {
          console.error(error);
        }
      };
      getWalletByUserName();
    }
  }, [userInfo]);
  console.log(dataWallet);
  // end get wallet by user name
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
      setImagePreview(URL.createObjectURL(file)); // Tạo preview
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        avatar: file, // Lưu file mới
      }));
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

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };
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
                  name="userName"
                  placeholder="Name"
                  value={userInfo.userName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label>Phone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone"
                  value={userInfo.phoneNumber}
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
                  name="dob"
                  placeholder="Birth Date"
                  value={userInfo.dob || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Create Date</label>
                <input
                  readOnly
                  type="date"
                  placeholder="Create Date"
                  value={userInfo.createdDate || ""}
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
              <Button variant="outlined" onClick={updateProfile}>
                Save
              </Button>
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
                <Button variant="contained" onClick={updateProfile}>
                  Save
                </Button>
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
              <button
                className={cx("button-security-email")}
                onClick={updateProfile}
              >
                Change Email
              </button>
            </div>
            <div className={cx("spacing-border-top")}></div>
            <div className={cx("security-password")}>
              <form onSubmit={updatePassword}>
                <label>Current Password:</label>
                <input
                  type="password"
                  name="OldPassword" // Loại bỏ dấu cách
                  placeholder="Enter current password"
                  required
                />
                <label>New Password:</label>
                <input
                  type="password"
                  name="NewPassword" // Loại bỏ dấu cách
                  placeholder="Enter new password"
                  required
                />
                <label>Confirm New Password:</label>
                <input
                  type="password"
                  name="ConfirmPassword" // Loại bỏ dấu cách
                  placeholder="Re-enter new password"
                  required
                />
                <button
                  className={cx("button-security-password")}
                  type="submit"
                >
                  Change Password
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
                <img
                  src={imagePreview || userInfo.avatar || ananymous}
                  alt="avatar"
                />
              </div>

              <div className={cx("name-profile")}>
                <b>
                  <span>{userInfo.userName} </span>
                </b>
              </div>
              <div className={cx("balance")}>
                <span>Balance: </span>
                <b> &nbsp; ${dataWallet.balance}</b>
                <div className={cx("payout-button")}>
                  <button type="button">Payout</button>
                </div>
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
