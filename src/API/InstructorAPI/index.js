import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";

const InstructorAPI = () => {
  const getInstructors = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/User/get-all-instructor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //get course by instructor
  const getCoursesByInstructor = async (userName) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/get-course-by-instructor`,
        {
          params: { instructor: userName },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { getInstructors, getCoursesByInstructor };
};

export default InstructorAPI;
