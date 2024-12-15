import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";
const UserAPI = () => {
  const getAllInstructor = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/User/get-all-instructor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  // get user  by user name
  const getUserByUserName = async (userName) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/User/get-user-by-userName/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  //get totalStudent and review of instructor
  const getTotalStudentAndReview = async (instructorName) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/User/get-total-student-and-feedback-for-instructor`,
        {
          params: { instructorName },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  // get profile by user name
  const getProfileByUserName = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(`${BASE_API_URL}/User/GetUserProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  //update profile
  const updateProfile = async (data) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.put(
        `${BASE_API_URL}/User/Update-Profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Specify that this is form data
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message); // Rethrow or return error message
    }
  };
  //update password
  const updatePassword = async (data) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.put(
        `${BASE_API_URL}/User/updatePassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Specify that this is form data
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message); // Rethrow or return error message
    }
  };
  // get wallet by username

  const getWalletByUserName = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Wallet/getwalletbyusername`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  return {
    getAllInstructor,
    getUserByUserName,
    getTotalStudentAndReview,
    getProfileByUserName,
    updateProfile,
    updatePassword,
    getWalletByUserName,
  };
};

export default UserAPI;
