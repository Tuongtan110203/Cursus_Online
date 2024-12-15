import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./OrderReceive.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";

import { useLocation } from "react-router-dom";
import fail from "~/images/fail.png";
import success from "~/images/success.png";
import UserAPI from "~/API/UserAPI";
import OrderAPI from "~/API/OrderAPI";
const cx = classNames.bind(style);

function OrderReceive() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Lấy query string từ URL

  const status = queryParams.get("status"); // success hoặc fail
  const paymentId = queryParams.get("paymentId"); // Lấy paymentId nếu cần
  const userName = queryParams.get("userName");
  const [userProfile, setUserProfile] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Giả định rằng `orderInfo.status` là trạng thái phản hồi

  useEffect(() => {
    // Kiểm tra trạng thái từ query string
    setIsSuccess(status === "success");
  }, [status]);
  // get user by user Name
  const getUserByUserName = async () => {
    try {
      const response = await UserAPI().getUserByUserName(userName);
      setUserProfile(response);
    } catch (error) {
      console.error("L��i khi lấy thông tin người dùng: ", error);
    }
  };
  useEffect(() => {
    getUserByUserName();
  }, [userName]);

  // get order by orderCode
  const [orderInfo, setOrderInfo] = useState({});
  const getOrderByOrderCode = async () => {
    try {
      const response = await OrderAPI().fetchOrderByOrderCode(paymentId);
      setOrderInfo(response);
    } catch (error) {
      console.error("L��i khi lấy thông tin đơn hàng: ", error);
    }
  };
  useEffect(() => {
    getOrderByOrderCode();
  }, [paymentId]);
  console.log(userProfile);
  console.log(orderInfo);
  return (
    <section className={cx("header-order-receive")}>
      <section>
        <header>
          <Header />
        </header>
      </section>
      <section className={cx("content-order-receive")}>
        <div className={cx("container", "wrapper-payment")}>
          <div className={cx("row")}>
            <div className={cx("payment")}>
              <div className={cx("col-12")}>
                <div className={cx("payment-info")}>
                  <h4>Payment Info</h4>
                </div>
              </div>
              <div className={cx("col-12")}>
                <div className={cx("image-fail-success")}>
                  {isSuccess ? (
                    <>
                      <img src={success} alt="success" />
                      <h4>Payment Success</h4>
                    </>
                  ) : (
                    <>
                      <img src={fail} alt="fail" />
                      <h4>Payment Fail</h4>
                    </>
                  )}
                </div>
              </div>
              <div className={cx("col-12")}>
                <table>
                  <tbody>
                    <tr>
                      <th>Customer: </th>
                      <td>{userProfile.fullName}</td>
                    </tr>
                    <tr>
                      <th>Email: </th>
                      <td>{userProfile.email}</td>
                    </tr>
                    <tr>
                      <th>PhoneNumber: </th>
                      <td>{userProfile.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>OrderCode: </th>
                      <td>{paymentId}</td>
                    </tr>
                    <tr>
                      <th>Total: </th>
                      <td>
                        {orderInfo.orderPrice}{" "}
                        <span style={{ color: "#e74646" }}>USD</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={cx("payment-details")}>
                <div className={cx("col-12", "details")}>
                  <div className={cx("line")}></div>
                  <span>Details</span>
                  <div className={cx("line")}></div>
                </div>
                <div className={cx("col-12")}>
                  <table>
                    <tbody>
                      <tr>
                        <th>Notes: </th>
                        <td>{"No additional notes"}</td>
                      </tr>
                      <tr>
                        <th>Payment Method: </th>
                        <td>PayPal</td>
                      </tr>
                      <tr>
                        <th>Order Date: </th>
                        <td>{orderInfo.orderDate}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={cx("thanks-you")}>
                <h4>Thank you! See you again. 🥰😍😘</h4>
              </div>
              <div className={cx("return-home")}>
                <div className={cx("row")}>
                  <div className={cx("col-12")}>
                    <a href="/">Return Home</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={cx("footer-order-receive")}>
        <footer>
          <Footer />
        </footer>
      </section>
    </section>
  );
}

export default OrderReceive;
