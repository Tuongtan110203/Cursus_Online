import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./OrderReceiveCheckOut.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";

import { useLocation } from "react-router-dom";
import fail from "~/images/fail.png";
import success from "~/images/success.png";

const cx = classNames.bind(style);

function OrderReceive() {
  const location = useLocation();

  const { paymentMethod, noticed, profileUser, orderInfo } =
    location.state || {};

  // Giả định rằng `orderInfo.status` là trạng thái phản hồi
  const isSuccess = orderInfo?.status === "Success";

  console.log("PaymentMethod", paymentMethod);
  console.log("orderInfo", orderInfo);
  console.log("User: ", profileUser);
  console.log("Notice", noticed);
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
                      <td>{profileUser.userName}</td>
                    </tr>
                    <tr>
                      <th>Email: </th>
                      <td>{profileUser.email}</td>
                    </tr>
                    <tr>
                      <th>PhoneNumber: </th>
                      <td>{profileUser.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>OrderCode: </th>
                      <td>{orderInfo.orderCode}</td>
                    </tr>
                    <tr>
                      <th>Total: </th>
                      <td>
                        {orderInfo.totalPrice}{" "}
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
                        <td>
                          {noticed.additionalNotes || "No additional notes"}
                        </td>
                      </tr>
                      <tr>
                        <th>Payment Method: </th>
                        <td>{paymentMethod}</td>
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
