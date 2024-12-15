import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";

const BookMarkAPI = () => {
  // all get book mark
  const GetBookMarkByUserName = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(`${BASE_API_URL}/BookmarkDetail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.items;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  //delete book mark
  const DeleteBookMark = async (id) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.delete(
        `${BASE_API_URL}/BookmarkDetail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  //add bookmark
  const AddBookMark = async (courseId) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `${BASE_API_URL}/BookmarkDetail`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding bookmark:", error);
      throw error; // Rethrow the error to allow calling functions to handle it
    }
  };
  return { GetBookMarkByUserName, DeleteBookMark, AddBookMark };
};

export default BookMarkAPI;
