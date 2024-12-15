import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import Cookies from "js-cookie";

const CartAPI = () => {
  // add to cart
  const addToCart = async (courseId) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `${BASE_API_URL}/Cart/Add-Cart`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            courseId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding course to cart:", error);
      throw error;
    }
  };
  //get cart
  const getCart = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(`${BASE_API_URL}/Cart/Get-Cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting cart:", error);
      throw error;
    }
  };
  //clear from cart
  const clearCart = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.delete(`${BASE_API_URL}/Cart/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error clearing cart" + error);
      throw error;
    }
  };
  //remove cart
  const removeFromCart = async (courseId) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.delete(
        `${BASE_API_URL}/Cart/remove/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error removing course from cart:", error);
      throw error;
    }
  };
  //checkout
  const checkout = async (referralCode) => {
    try {
      const token = Cookies.get("authToken");
      const requestBody = {
        referralCode: referralCode || "", // Đảm bảo `referralCode` là một chuỗi, hoặc rỗng nếu không được truyền
      };

      const response = await axios.post(
        `${BASE_API_URL}/Cart/checkout`,
        requestBody, // Request body chứa `referralCode`
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error checking out cart:", error);
      throw error;
    }
  };
  // paypal
  const checkOutWithPayPal = async (OrderId, ReferralCode) => {
    try {
      const token = Cookies.get("authToken");
      const requestBody = {
        OrderId: OrderId,
        ReferralCode: ReferralCode || "",
      };
      const response = await axios.post(
        `${BASE_API_URL}/PayPal/checkout-payment`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error during PayPal checkout:", error);
      throw error;
    }
  };

  return {
    addToCart,
    getCart,
    clearCart,
    removeFromCart,
    checkout,
    checkOutWithPayPal,
  };
};

export default CartAPI;
