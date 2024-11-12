import { useState } from "react";
import classNames from "classnames/bind";
import style from "./OrderReceive.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import course1 from "~/images/course1.jpg";
import course2 from "~/images/course2.jpg";
import course3 from "~/images/course3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcPaypal } from "@fortawesome/free-brands-svg-icons";
import {
  faShoppingBag,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

function OrderReceive() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "100 Days of Code: The Complete Python Pro Bootcamp",
      instructor: "Instructor A",
      newPrice: 12,
      oldPrice: 30,
      image: course1,
    },
    {
      id: 2,
      name: "Python Mega Course: Learn Python in 60 Days, Build 20 Apps",
      instructor: "Instructor A",
      newPrice: 34,
      oldPrice: 50,
      image: course2,
    },
    {
      id: 3,
      name: "Become a Certified Web Developer: HTML, CSS and JavaScript",
      instructor: "Instructor A",
      newPrice: 45,
      oldPrice: 60,
      image: course3,
    },
  ]);

  const orderInfo = {
    orderId: "123456789",
    deliveryDate: "2024-12-01",
  };
  const totalPrice = courses.reduce((acc, course) => acc + course.newPrice, 0);

  const originatePrice = courses.reduce(
    (acc, course) => acc + course.oldPrice,
    0
  );
  const discount = courses.reduce(
    (acc, course) => acc + (course.oldPrice - course.newPrice),
    0
  );

  return (
    <section className={cx("header-order-receive")}>
      <section>
        <header>
          <Header />
        </header>
      </section>
      <section className={cx("content-order-receive")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-7", "checkout-summary")}>
              <h4>Your Order Details</h4>
              <div className={cx("container", "wrapper-order-details")}>
                <div className={cx("row")}>
                  {courses.map((course) => (
                    <div
                      className={cx("col-12")}
                      key={course.id}
                      style={{
                        display: "flex",
                        padding: "0",
                        marginBottom: "10px",
                      }}
                    >
                      <div className={cx("col-2")} style={{ padding: "0" }}>
                        <div className={cx("image-order-details")}>
                          <img src={course.image} alt={course.name} />
                        </div>
                      </div>
                      <div className={cx("col-8")} style={{ padding: "0" }}>
                        <div className={cx("content-order-details")}>
                          <p>{course.name}</p>
                        </div>
                      </div>
                      <div
                        className={cx("col-2")}
                        style={{ padding: "0", marginLeft: "20px" }}
                      >
                        <div className={cx("price-course")}>
                          <div className={cx("new-price")}>
                            <p>{course.newPrice} USD</p>
                          </div>
                          <div className={cx("old-price")}>
                            <del>
                              <p>{course.oldPrice} USD</p>
                            </del>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={cx("total-price")}>
                  <h4>Summary</h4>
                  <div className={cx("originate-price")}>
                    <h5>
                      Original Price: <b>{originatePrice} USD</b>
                    </h5>
                  </div>
                  <div className={cx("discount")}>
                    <h5>
                      Discounts: <b>- {discount} USD</b>
                    </h5>
                  </div>
                  <div className={cx("total-price-final")}>
                    <h5>
                      Total: <b>{totalPrice} USD</b>
                    </h5>
                  </div>
                </div>
                <div className={cx("method-payment")}>
                  <h5>
                    Payment Method: Paypal payment
                    <FontAwesomeIcon icon={faCcPaypal} />
                  </h5>
                </div>
              </div>
            </div>
            <div className={cx("col-5", "order-info")}>
              <div className={cx("container", "wrapper-order-info")}>
                <h4>
                  <FontAwesomeIcon
                    icon={faShoppingBag}
                    className={cx("order-icon")}
                  />{" "}
                  Order Confirmation
                </h4>
                <p>
                  <strong>Order ID:</strong> {orderInfo.orderId}
                </p>
                <p>
                  <strong>Estimated Delivery Date:</strong>{" "}
                  {orderInfo.deliveryDate}
                </p>
                <p>
                  <strong>Total:</strong> {totalPrice} USD
                </p>
                <p className={cx("thank-you-message")}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={cx("check-icon")}
                  />{" "}
                  Thank you for your purchase!
                </p>
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
