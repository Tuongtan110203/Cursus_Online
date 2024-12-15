import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";

const TransactionAPI = () => {
  // get transaction by userName
  const getTransactionByUserName = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Transaction/user-transactions`,
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
    }
  };
  return { getTransactionByUserName };
};

export default TransactionAPI;
