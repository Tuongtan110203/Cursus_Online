import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";

const CourseApi = () => {
  const GetCourseByRangePrice = async (fromPrice, toPrice) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/get-course-by-range-price`,
        {
          params: { fromPrice: fromPrice, toPrice: toPrice },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {}
  };
  //get course search
  const GetCourseBySearch = async (query, page = 1, pageSize = 20) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/Courses-active`,
        {
          params: { query, page, pageSize },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching courses by search:", error);
      throw error;
    }
  };
  //get Course By categoryName
  const GetCourseByCategoryName = async (categoryName) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/get-course-by-category-name`,
        {
          params: { categoryName: categoryName },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching courses by category name:", error);
      throw error;
    }
  };
  //get course by level
  // get course by level
  const getCourseByLevel = async (level) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/get-course-by-level`,
        {
          params: { level: level },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching courses by level:", error);
      throw error;
    }
  };
  //get course high rating
  const getCourseHighRating = async (top) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Dashboard/top-rating/${top}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching courses by high rating:", error);
      throw error;
    }
  };
  //end get course high rating

  //get course by id
  const getCourseById = async (courseId) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/get-by-id-or-code`,
        {
          params: { id: courseId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching course by id:", error);
      throw error;
    }
  };

  //end get course by id

  // get feedback star by course id
  const fetchFeedbackStarByCourseId = async (courseId) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/feedback-stats/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching feedback star by course id:", error);
      throw error;
    }
  };

  return {
    GetCourseByRangePrice,
    GetCourseBySearch,
    GetCourseByCategoryName,
    getCourseByLevel,
    getCourseHighRating,
    getCourseById,
    fetchFeedbackStarByCourseId,
  };
};

export default CourseApi;
