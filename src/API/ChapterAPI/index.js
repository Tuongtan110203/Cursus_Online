import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";

const ChapterAPI = () => {
  const GetChapterLessonByCourseId = async (courseId) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Chapter/get-chapter-by-courseId/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data || [];
    } catch (error) {
      console.error("Error getting chapter lesson by course ID:", error);
      return null;
    }
  };
  //get total chapter lesson quizz
  const getTotalChapterLessonQuiz = async (courseId) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Dashboard/total-chapter-lesson-quizz`,

        {
          params: { courseId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      console.error("Error getting total chapter lesson quiz:", e);
      return null;
    }
  };
  //get chaptertitle and description
  const getChapterTitleAndDescription = async (courseId) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Chapter/get-chapter-title-description-by-courseId/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data || [];
    } catch (e) {
      console.error("Error getting chapter title and description:", e);
      return null;
    }
  };
  //get chapters by course id and level
  return {
    GetChapterLessonByCourseId,
    getTotalChapterLessonQuiz,
    getChapterTitleAndDescription,
  };
};

export default ChapterAPI;
