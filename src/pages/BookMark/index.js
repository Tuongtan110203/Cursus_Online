import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./BookMark.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import HightRatingCourse from "~/pages/ViewCourse/ViewCourseDetails/HighRatingCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faCircleXmark,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BookMarkAPI from "~/API/BookMarkAPI";
import { useBookmarks } from "~/pages/BookMark/BookmarkContext";
import Pagination from "@mui/material/Pagination";
import CartAPI from "~/API/CartAPI";
import { useCart } from "~/Context/CartContext/CartContext";

const cx = classNames.bind(styles);

function BookMark() {
  const { cartData, setCartData, fetchCart, isLoading } = useCart();
  const { bookmarkItems, fetchBookmarks } = useBookmarks();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getBookMarkForUser = async () => {
      try {
        const data = await BookMarkAPI().GetBookMarkByUserName();
        fetchBookmarks(data);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };
    getBookMarkForUser();
  }, []);

  const deleteBookMark = async (id) => {
    try {
      await BookMarkAPI().DeleteBookMark(id);
      fetchBookmarks();
    } catch (e) {
      console.error("Failed to delete bookmark:", e);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookmarks = bookmarkItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  //cart
  const fetchAddToCart = async (courseId) => {
    try {
      await CartAPI().addToCart(courseId);
      console.log("Course added to cart successfully.");
      fetchCart();
    } catch (e) {
      console.error("Error adding to cart:", e);
    }
  };

  //end cart
  return (
    <div className={cx("view-cart-container")}>
      <Header />
      <div className={cx("container")}>
        <Breadcrumbs aria-label="breadcrumb" className={cx("mt-3", "mb-2")}>
          <Link underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Typography sx={{ color: "text.primary" }}>Book Mark</Typography>
        </Breadcrumbs>
        <div className={cx("cart-content", "row")}>
          <div className={cx("col-12", "left-column")}>
            <table className={cx("cart-table", "table", "table-striped")}>
              <thead>
                <tr>
                  <th className="col-1">Image</th>
                  <th className="col-2">Course Name</th>
                  <th className="col-1">Instructor</th>
                  <th className="col-1">Price</th>
                  <th className="col-1">Action</th>
                  <th className="col-2">AddToCart</th>
                </tr>
              </thead>
              <tbody>
                {currentBookmarks.map((item) => {
                  const discountPrice =
                    item.course.price && item.course.discount
                      ? item.course.price -
                        item.course.price * (item.course.discount / 100)
                      : item.course.price;

                  return (
                    <tr key={item.bookmarkDetailId}>
                      <td className="col-1">
                        <img
                          src={item.course.image}
                          alt={item.course.courseTitle}
                          className={cx("table-image")}
                        />
                      </td>
                      <td className="col-6">{item.course.courseTitle}</td>
                      <td className="col-2">{item.course.username}</td>
                      <td className="col-2">
                        ${discountPrice.toLocaleString()}
                      </td>
                      <td className="col-1">
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className={cx("icon")}
                          onClick={() => deleteBookMark(item.bookmarkDetailId)}
                        />
                      </td>
                      <td className="col-2">
                        <FontAwesomeIcon
                          className={cx("icon")}
                          icon={faShoppingCart}
                          onClick={() => fetchAddToCart(item.course.courseId)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={cx("pagination")}>
              <Pagination
                count={Math.ceil(bookmarkItems.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </div>

            <div className={cx("continue-shopping-button")}>
              <b>
                <a href="/">
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                  Continue shopping
                </a>
              </b>
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

export default BookMark;
