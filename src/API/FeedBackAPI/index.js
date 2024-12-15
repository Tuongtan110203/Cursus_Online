import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";

const FeedBackAPI = () => {
  const fetchAddFeedBack = async (feedbackData, file) => {
    try {
      const token = Cookies.get("authToken");
      const formData = new FormData();

      // Thêm dữ liệu vào FormData
      if (feedbackData.Star !== null) {
        formData.append("Star", feedbackData.Star); // Nếu có giá trị, thêm vào
      }
      formData.append("Content", feedbackData.Content);
      formData.append("CourseId", feedbackData.CourseId);
      formData.append("ParentFeedbackId", feedbackData.ParentFeedbackId);

      // Nếu có file đính kèm, thêm vào FormData
      if (file) {
        formData.append("attachmentFile", file);
      }

      const response = await axios.post(
        `${BASE_API_URL}/Feedback/Add-Feedback`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Xác định loại nội dung là multipart/form-data
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  //get feedback by course id
  const fetchFeedbackByCourseId = async (courseId, page, pageSize) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Feedback/get-feedback-by-courseId/${courseId}?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching feedback by course id:", error);
      throw error;
    }
  };
  // get feedback and reply feed back by course id
  const fetchFeedbackAndReplyByCourseId = async (courseId, page, pageSize) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Feedback/get-reply-feedBack-by-courseId/${courseId}?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching feedback by course id:", error);
      throw error;
    }
  };
  return {
    fetchAddFeedBack,
    fetchFeedbackByCourseId,
    fetchFeedbackAndReplyByCourseId,
  };
};

export default FeedBackAPI;
