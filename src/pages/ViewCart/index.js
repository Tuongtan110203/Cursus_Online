import React, { useState, useEffect } from "react";
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
import { useCart } from "~/Context/CartContext/CartContext";
import CartAPI from "~/API/CartAPI";

const cx = classNames.bind(styles);

function ViewCart() {
  const { cartData, setCartData, fetchCart, isLoading } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const removeCartItems = async (courseId) => {
    const updatedCartItems = cartData.cartItems.filter(
      (item) => item.courseId !== courseId
    );
    const updatedTotalItems = updatedCartItems.length;
    const updatedSubTotal = updatedCartItems.reduce(
      (total, item) => total + item.price,
      0
    );
    const updatedTotalDiscount = updatedCartItems.reduce(
      (total, item) => total + (item.discount / 100) * item.price,
      0
    );
    const updatedTotalPrice = updatedSubTotal - updatedTotalDiscount;

    setCartData({
      cartItems: updatedCartItems,
      totalItems: updatedTotalItems,
      subTotal: updatedSubTotal,
      totalDiscount: updatedTotalDiscount,
      totalPrice: updatedTotalPrice,
    });

    try {
      const response = await CartAPI().removeFromCart(courseId);
      if (response.message === "Item removed from cart successfully") {
        await fetchCart();
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

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
                  <th className="col-2">Old Price</th>
                  <th className="col-2">New Price</th>
                  <th className="col-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.cartItems && cartData.cartItems.length > 0 ? (
                  cartData.cartItems.map((item) => (
                    <tr key={item.courseId}>
                      <td className="col-1">
                        <img
                          src={item.image}
                          alt={item.courseTitle}
                          className={cx("table-image")}
                        />
                      </td>
                      <td className="col-7">{item.courseTitle}</td>
                      <td className="col-2">{item.instructorName}</td>
                      <td className="col-1">${item.price}</td>
                      <td className="col-1">${item.newPrice}</td>
                      <td className="col-1">
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          onClick={() => removeCartItems(item.courseId)}
                          className={cx("icon")}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">Your cart is empty.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className={cx("continue-shopping-button")}>
              <b>
                <a href="/view-course">
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
                <span>Total Course:</span>
                <span>{cartData.totalItems}</span>
              </div>
              <div className={cx("summary-item")}>
                <span>Subtotal:</span>
                <span>{cartData.subTotal} USD</span>
              </div>
              <div className={cx("summary-item")}>
                <span>ToTal Discount:</span>
                <span>- {cartData.totalDiscount} USD</span>
              </div>
              <div className={cx("summary-item")}>
                <span>Total:</span>
                <span>{cartData.totalPrice} USD</span>
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
            <h4 className={cx("title")}>You might also like</h4>
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
