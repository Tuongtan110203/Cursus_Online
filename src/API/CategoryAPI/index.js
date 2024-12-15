import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";

const CategoryAPI = () => {
  // API: Lấy danh sách tất cả danh mục
  const getAllCategories = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(`${BASE_API_URL}/Category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  // API: Lấy khóa học theo categoryName
  const fetchCourseByCategoryName = async (categoryName) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/get-course-by-category-name?CategoryName=${encodeURIComponent(
          categoryName
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data; // Trả về danh sách khóa học
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw (
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return {
    getAllCategories,
    fetchCourseByCategoryName,
  };
};

export default CategoryAPI;
