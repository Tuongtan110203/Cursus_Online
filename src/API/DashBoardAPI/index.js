import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";

const DashBoardApi = () => {
  const getToTalInstructorStudentCourseEnroll = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Dashboard/total-instructor-student-enroll-course`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  // get featured courses
  const getFeaturedCourses = async (top, page = 1, pageSize = 20) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Dashboard/top-featured/${top}?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.items;
    } catch (error) {
      console.error("Error fetching featured courses:", error);
      throw error;
    }
  };

  return { getToTalInstructorStudentCourseEnroll, getFeaturedCourses };
};

export default DashBoardApi;
