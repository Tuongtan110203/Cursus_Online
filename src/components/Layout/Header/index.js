import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Cursus from "~/images/Cursus.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faShoppingCart,
  faSearch,
  faHeart,
  faAngleDown,
  faMoneyBillTransfer,
  faX,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./tippyStyles.module.scss";
import { Link } from "react-router-dom";
//import category
import tinhocvanphong from "~/images/tinhocvanphong.svg";
import thietke from "~/images/thietke.svg";
import kinhdoanhkhoinghiep from "~/images/kinhdoanhkhoinghiep.svg";
import phattriencanhan from "~/images/phattriencanhan.svg";
import sale from "~/images/sale.svg";
import it from "~/images/it.svg";
import suckhoegioitinh from "~/images/suckhoegioitinh.svg";
import phongcachsong from "~/images/phongcachsong.svg";
import nuoidaycon from "~/images/nuoidaycon.svg";
import honnhangiadinh from "~/images/honnhangiadinh.svg";
import ngoaingu from "~/images/ngoaingu.svg";
import marketing from "~/images/marketing.svg";
import axios from "axios";
import Cookies from "js-cookie";
import BASE_API_URL from "~/apiConfig";
import BookMarkAPI from "~/API/BookMarkAPI";
import { useBookmarks } from "~/pages/BookMark/BookmarkContext";
import { useCart } from "~/Context/CartContext/CartContext";
import { useUser } from "~/Context/UserContext/UserContext"; // use context
import CartAPI from "~/API/CartAPI";
import UserAPI from "~/API/UserAPI";
import { toast } from "react-toastify"; // Import thư viện thông báo nếu cần
import "react-toastify/dist/ReactToastify.css"; // Import CSS nếu dùng react-toastify
import anonymous from "~/images/anonymous.png";

const cx = classNames.bind(styles);

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLogoSearchVisible, setIsLogoSearchVisible] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const searchInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const { bookmarkItems, fetchBookmarks } = useBookmarks();
  const { userInfo, setUserInfo } = useUser();
  const [profileUser, setProfileUser] = useState({});
  //cart
  const { cartData, setCartData, fetchCart, isLoading } = useCart();
  useEffect(() => {
    if (!cartData?.cartItems || cartData.cartItems.length === 0) {
      console.log("Cart is empty");
    }
  }, [cartData.cartItems]);
  // end cart
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  //notiffication
  const handleViewProfileClick = () => {
    const token = Cookies.get("authToken");
    if (!token) {
      toast.info("No profile for guest. Please login to access your profile.");
      return;
    }

    // Nếu đã đăng nhập, chuyển hướng đến trang hồ sơ
    navigate("/profile");
  };
  //end notification
  //book mark
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
  //end bookmark
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  //logout
  const LogoutAccount = async () => {
    try {
      const response = await axios.post(`${BASE_API_URL}/Authen/logout`, null, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        Cookies.remove("authToken");

        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Failed to logout. Please try again."
      );
    }
  };

  //end logout
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // get profile user

  const getProfileUser = async () => {
    try {
      const response = await UserAPI().getProfileByUserName();
      setUserInfo(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProfileUser();
  }, []);
  //get profile user
  useEffect(() => {
    if (isLogoSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isLogoSearchVisible]);

  const handleSearchClick = () => {
    setIsLogoSearchVisible(!isLogoSearchVisible);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 100) {
      setIsHidden(false);
      setIsFixed(true);
    } else {
      setIsHidden(false);
      setIsFixed(false);
    }
  };
  const handleCloseCart = () => {
    setIsCartVisible(false);
  };
  const handleUserIconClick = () => {
    setIsUserMenuVisible(!isUserMenuVisible);
  };

  const handleCartIconClick = () => {
    setIsCartVisible(!isCartVisible);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //call api category
  useEffect(() => {
    const axiosCategories = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get(`${BASE_API_URL}/Category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setCategories(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
        console.error("API Error:", error);
      }
    };
    axiosCategories();
  }, []);

  const categoryImages = {
    "Office Information": tinhocvanphong,
    Design: thietke,
    "Business-Startup": kinhdoanhkhoinghiep,
    Personal: phattriencanhan,
    Sale: sale,
    IT: it,
    "Sexual Health": suckhoegioitinh,
    Lifestyle: phongcachsong,
    Parenting: nuoidaycon,
    "Marriage-Family": honnhangiadinh,
    English: ngoaingu,
    Marketing: marketing,
  };
  const handleCategoryClick = (Query) => {
    axios
      .get(
        `${BASE_API_URL}/Course/Courses-active?Query=${encodeURIComponent(
          Query
        )}&page=1&pageSize=20`
      )
      .then((response) => {
        navigate(`/search?query=${encodeURIComponent(Query)}`);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  //end callapi category

  //delete cart
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
    <>
      <div className={cx("overlay", { active: isCartVisible })}></div>

      <header
        className={cx("header-container", { fixed: isFixed, hidden: isHidden })}
      >
        <div className={cx("logo")}>
          <Link to="/">
            <img src={Cursus} alt="Happy Academy Logo" />
          </Link>
        </div>
        <nav className={cx("nav-links")}>
          <div className={cx("course-dropdown")}>
            <div>
              <button className={cx("dropdown-button")}>
                <FontAwesomeIcon icon={faList} className={cx("icon")} />
                Course Categories
                <FontAwesomeIcon
                  className={cx("icon", "icon-angle-down")}
                  icon={faAngleDown}
                />
              </button>
            </div>
            <ul className={cx("dropdown-content")}>
              {categories?.map((category) => (
                <li key={category.categoryId}>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(category.categoryName);
                    }}
                    className={cx("category-button")}
                  >
                    <img
                      src={
                        categoryImages[category.categoryName] || tinhocvanphong
                      }
                      alt={category.categoryName}
                    />
                    {category.categoryName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Tippy content="Trang chủ" arrow={true} theme="custom">
            <a href="/" className={cx("link")}>
              Home
            </a>
          </Tippy>
          <Tippy content="Xem các khóa học" arrow={true} theme="custom">
            <a href="/view-course" className={cx("link")}>
              View Courses
            </a>
          </Tippy>
          <Tippy content="Các khóa học đã đăng ký" arrow={true} theme="custom">
            <a href="/enroll-course" className={cx("link")}>
              Enrolled Courses
            </a>
          </Tippy>
          <Tippy content="Giới thiệu" arrow={true} theme="custom">
            <a href="/about" className={cx("link")}>
              About
            </a>
          </Tippy>
        </nav>
        <div className={cx("user-info")}>
          <button className={cx("search-button")} onClick={handleSearchClick}>
            <FontAwesomeIcon icon={faSearch} className={cx("icon")} />
          </button>
          <div className={cx("cart-container")}>
            <Tippy content="Giỏ hàng" arrow={true} theme="custom">
              <button
                className={cx("cart-button")}
                onClick={handleCartIconClick}
              >
                <FontAwesomeIcon icon={faShoppingCart} className={cx("icon")} />
                {cartData.cartItems.length > 0 && (
                  <span className={cx("item-count")}>
                    {cartData.cartItems.length}
                  </span>
                )}
              </button>
            </Tippy>
          </div>
          <div className={cx("book-mark-container")}>
            <a href="/book-mark">
              <Tippy content="Yêu thích" arrow={true} theme="custom">
                <button className={cx("book-mark-button")}>
                  <FontAwesomeIcon icon={faHeart} className={cx("icon")} />
                  {bookmarkItems?.length > 0 && (
                    <span className={cx("item-count")}>
                      {bookmarkItems.length}
                    </span>
                  )}
                </button>
              </Tippy>
            </a>
          </div>
          <a href="/transaction">
            <Tippy content="Lịch sử Giao dịch" arrow={true} theme="custom">
              <button className={cx("transaction-button")}>
                <FontAwesomeIcon
                  icon={faMoneyBillTransfer}
                  className={cx("icon")}
                />
              </button>
            </Tippy>
          </a>
          <div className={cx("profile-container")}>
            <Tippy content="Hồ sơ" arrow={true} theme="custom">
              <button
                className={cx("profile-button")}
                onClick={handleUserIconClick}
              >
                {userInfo?.avatar ? (
                  <img
                    src={userInfo.avatar}
                    className={cx("avatar-profile")}
                    alt="profile"
                  />
                ) : (
                  <img
                    src={anonymous}
                    className={cx("avatar-profile")}
                    alt="profile"
                  />
                )}
              </button>
            </Tippy>

            {isUserMenuVisible && (
              <ul className={cx("user-dropdown")}>
                <li>
                  <button
                    className={cx("view-profile")}
                    onClick={handleViewProfileClick}
                  >
                    View Profile
                  </button>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/" onClick={LogoutAccount}>
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
        {isLogoSearchVisible && (
          <div className={cx("search-container")}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              ref={searchInputRef}
              className={cx("search-input")}
            />
            <button
              className={cx("search-content-button")}
              onClick={handleSearch}
            >
              <FontAwesomeIcon icon={faSearch} className={cx("icon")} />
            </button>
          </div>
        )}
      </header>

      <div className={cx("cart-panel", { visible: isCartVisible })}>
        <div className={cx("cart-header")}>
          <FontAwesomeIcon
            icon={faX}
            className={cx("close-icon")}
            onClick={handleCloseCart}
          />
        </div>
        <h4 className={cx("title-cart")}>Giỏ Hàng</h4>

        <div className={cx("container")}>
          {cartData.cartItems.map((item) => (
            <div className={cx("shopping-cart-content")} key={item.courseId}>
              <div className={cx("row")}>
                <div className={cx("col-4")}>
                  <img
                    src={item.image}
                    className={cx("image-shopping-cart")}
                    alt="/"
                  />
                </div>
                <div className={cx("col-7")}>
                  <div className={cx("shopping-content-body")}>
                    <p>{item.courseTitle}</p>
                    <del>
                      <span> {item.price.toLocaleString()} USD</span>
                    </del>
                    <b>
                      <span style={{ fontWeight: 900 }}>
                        {" "}
                        {item.newPrice.toLocaleString()} USD
                      </span>
                    </b>
                  </div>
                </div>
                <div className={cx("col-1")}>
                  <div className={cx("remove-add-cart")}>
                    <FontAwesomeIcon
                      className={cx("fa-remove")}
                      icon={faCircleXmark}
                      onClick={() => removeCartItems(item.courseId)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className={cx("total-amount")}>
            <h5>SubToTal Price: {cartData.subTotal} USD</h5>
          </div>
          <div className={cx("total-amount")}>
            <h5>ToTal Discount: {cartData.totalDiscount} USD</h5>
          </div>
          <div className={cx("total-amount")}>
            <h5>ToTal Price: {cartData.totalPrice} USD</h5>
          </div>
          <div>
            <a href="/view-cart">
              <button
                className={cx("btn btn-primary", "mb-2", "mt-2", "w-100")}
              >
                View Cart
              </button>
            </a>
          </div>
          <div>
            <a href="/check-out">
              <button className={cx("btn btn-warning", "w-100")}>
                Checkout
              </button>
            </a>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
