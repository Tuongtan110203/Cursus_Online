import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./viewCart.module.scss";
// import Header và Footer
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import HightRatingCourse from "~/pages/ViewCourse/ViewCourseDetails/HighRatingCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
//import images
import checkout from "~/images/checkout.png";
const cx = classNames.bind(styles);

function ViewCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "First Course",
      instructor: "Instructor A",
      price: 799999,
      quantity: 1,
      image: require("~/images/course1.jpg"),
    },
    {
      id: 2,
      name: "Second Course",
      instructor: "Instructor B",
      price: 599999,
      quantity: 1,
      image: require("~/images/course2.jpg"),
    },
    {
      id: 3,
      name: "Third Course",
      instructor: "Instructor C",
      price: 599999,
      quantity: 1,
      image: require("~/images/course2.jpg"),
    },
    {
      id: 4,
      name: "Four Course",
      instructor: "Instructor D",
      price: 699999,
      quantity: 1,
      image: require("~/images/course1.jpg"),
    },
    {
      id: 5,
      name: "Five Course",
      instructor: "Instructor E",
      price: 799999,
      quantity: 1,
      image: require("~/images/course2.jpg"),
    },
    {
      id: 6,
      name: "Six Course",
      instructor: "Instructor F",
      price: 799999,
      quantity: 1,
      image: require("~/images/course2.jpg"),
    },
  ]);

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={cx("view-cart-container")}>
      <Header />
      <div className={cx("container")}>
        <Breadcrumbs aria-label="breadcrumb" className={cx("mt-3", "mb-2")}>
          <Link underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Typography sx={{ color: "text.primary" }}>View Cart</Typography>
        </Breadcrumbs>
        <div className={cx("cart-content", "row")}>
          <div className={cx("col-6", "left-column")}>
            <table className={cx("cart-table", "table", "table-striped")}>
              <thead>
                <tr>
                  <th className="col-1">Image</th>
                  <th className="col-4">Course Name</th>
                  <th className="col-3">Instructor</th>
                  <th className="col-2">Price</th>
                  <th className="col-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="col-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className={cx("table-image")}
                      />
                    </td>
                    <td className="col-4">{item.name}</td>
                    <td className="col-3">{item.instructor}</td>
                    <td className="col-3">{item.price.toLocaleString()} VND</td>
                    <td className="col-1">
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className={cx("icon")}
                        onClick={() => handleRemoveItem(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={cx("continue-shopping-button")}>
              <b>
                <a href="/">
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                  Continue shopping
                </a>
              </b>
            </div>
          </div>
          {/* Right Column */}
          <div className={cx("col-6", "right-column")}>
            <div className={cx("order-summary")}>
              <h5>
                <b>Order Summary</b>
              </h5>
              <div className={cx("summary-item")}>
                <span>Subtotal:</span>
                <span>{totalAmount.toLocaleString()} VND</span>
              </div>
              <div className={cx("summary-item")}>
                <span>Percent Discount:</span>
                <span>0%</span>
              </div>
              <div className={cx("summary-item")}>
                <span>Discount:</span>
                <span>- 0 VND</span>
              </div>
              <div className={cx("summary-item")}>
                <span>Total:</span>
                <span>{totalAmount.toLocaleString()} VND</span>
              </div>
              <div className={cx("discount-code")}>
                <input
                  type="text"
                  className={cx("discount-input")}
                  placeholder="Enter discount voucher"
                />
                <button className={cx("apply-discount-button")}>Apply</button>
              </div>
              <div className={cx("referral-code")}>
                <input
                  type="text"
                  className={cx("referral-input")}
                  placeholder="Enter referral code"
                />
                <button className={cx("apply-referral-button")}>Apply</button>
              </div>
              <div className={cx("checkout-button")}>
                <a href="/check-out">
                  Proceed to Checkout
                  <img src={checkout} alt="check-out" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("container")}>
        <div className={cx("also-like")}>
          <b>
            <h4>You might also like</h4>
          </b>
          <div className={cx("high-rating-course")}>
            <HightRatingCourse />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewCart;
