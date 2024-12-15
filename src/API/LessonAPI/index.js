import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";

const LessonAPI = async () => {
  const GetLessonByCourseID = async (courseId) => {
    const token = Cookies.get("authToken");
    const response = await axios.get(
      `${BASE_API_URL}/Lesson/get-lesson-by-courseId/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };
  return {
    GetLessonByCourseID,
  };
};

export default LessonAPI;
