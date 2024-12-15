import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";

const OrderAPI = () => {
  const fetchOrderByOrderCode = async (orderCode) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Order/get-order-by-order-code/${orderCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return null;
  };
  return { fetchOrderByOrderCode };
};

export default OrderAPI;
