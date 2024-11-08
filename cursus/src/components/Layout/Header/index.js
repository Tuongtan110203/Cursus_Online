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
  faUser,
  faMoneyBillTransfer,
  faX,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./tippyStyles.module.scss";
import { Link } from "react-router-dom";
//import course
import course1 from "~/images/course1.jpg";
import course2 from "~/images/course2.jpg";
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
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "First Course",
      price: 799999,
      quantity: 1,
      image: course1,
    },
    {
      id: 2,
      name: "Second Course",
      price: 599999,
      quantity: 1,
      image: course2,
    },
  ]);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (isLogoSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isLogoSearchVisible]);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSearchClick = () => {
    setIsLogoSearchVisible(!isLogoSearchVisible);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 400) {
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
                course categories
                <FontAwesomeIcon
                  className={cx("icon", "icon-angle-down")}
                  icon={faAngleDown}
                />
              </button>
            </div>
            <ul className={cx("dropdown-content")}>
              <li>
                <a href="/office-information">
                  <img src={tinhocvanphong} alt="tinhocvanphong" /> Office
                  Information
                </a>
              </li>
              <li>
                <a href="/design">
                  <img src={thietke} alt="thietke" />
                  Design
                </a>
              </li>
              <li>
                <a href="/business-startup">
                  <img src={kinhdoanhkhoinghiep} alt="kinhdoanhkhoinghiep" />
                  Business-Startup
                </a>
              </li>
              <li>
                <a href="/personal">
                  <img src={phattriencanhan} alt="phattriencanhan" />
                  Personal
                </a>
              </li>
              <li>
                <a href="/sale">
                  <img src={sale} alt="sale" />
                  Sale
                </a>
              </li>
              <li>
                <a href="/it">
                  <img src={it} alt="it" />
                  IT
                </a>
              </li>
              <li>
                <a href="/sexual-health">
                  <img src={suckhoegioitinh} alt="suckhoegioitinh" />
                  Sexual health
                </a>
              </li>
              <li>
                <a href="/lifestyle">
                  <img src={phongcachsong} alt="phongcachsong" />
                  Lifestyle
                </a>
              </li>
              <li>
                <a href="/parenting">
                  <img src={nuoidaycon} alt="nuoidaycon" />
                  Parenting
                </a>
              </li>
              <li>
                <a href="/marriage-family">
                  <img src={honnhangiadinh} alt="honnhangiadinh" />
                  Marriage-family
                </a>
              </li>
              <li>
                <a href="/english">
                  <img src={ngoaingu} alt="ngoaingu" />
                  English
                </a>
              </li>
              <li>
                <a href="/marketing">
                  <img src={marketing} alt="marketing" />
                  Marketing
                </a>
              </li>
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
                {cartItems.length > 0 && (
                  <span className={cx("item-count")}>{cartItems.length}</span>
                )}
              </button>
            </Tippy>
          </div>
          <div className={cx("book-mark-container")}>
            <a href="/book-mark">
              <Tippy content="Yêu thích" arrow={true} theme="custom">
                <button className={cx("book-mark-button")}>
                  <FontAwesomeIcon icon={faHeart} className={cx("icon")} />
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
                <FontAwesomeIcon icon={faUser} className={cx("icon")} />
              </button>
            </Tippy>

            {isUserMenuVisible && (
              <ul className={cx("user-dropdown")}>
                <li>
                  <a href="/profile">View Profile</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/logout">Logout</a>
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
          {cartItems.map((item) => (
            <div className={cx("shopping-cart-content")} key={item.id}>
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
                    <p>{item.name}</p>
                    <span>
                      {item.quantity} x {item.price.toLocaleString()} VND
                    </span>
                  </div>
                </div>
                <div className={cx("col-1")}>
                  <div className={cx("remove-add-cart")}>
                    <FontAwesomeIcon
                      className={cx("fa-remove")}
                      icon={faCircleXmark}
                      onClick={() => handleRemoveItem(item.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className={cx("total-amount")}>
            <h5>Tổng số tiền: {totalAmount.toLocaleString()} VND</h5>
          </div>
          <div>
            <a href="view-cart">
              <button
                className={cx("btn btn-primary", "mb-2", "mt-2", "w-100")}
              >
                View Cart
              </button>
            </a>
          </div>
          <div>
            <button className={cx("btn btn-warning", "w-100")}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
