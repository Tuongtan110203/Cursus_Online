//import styles and classname
import classNames from "classnames/bind";
import styles from "./featuredCourse.module.scss";
//import Link
import { Link } from "react-router-dom";
//import tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "~/components/Layout/Header/tippyStyles.module.scss";
//import course
import course1 from "~/images/course1.jpg";
import course2 from "~/images/course2.jpg";
import course3 from "~/images/course3.jpg";
import course4 from "~/images/course4.jpg";
import course5 from "~/images/course5.jpg";
import course6 from "~/images/course6.jpg";
import course7 from "~/images/course7.jpg";
import course8 from "~/images/course8.jpg";
import course9 from "~/images/course9.jpg";
//import fontawesome from "~/
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import tuong
import tuong from "~/images/tuong.jpg";

const cx = classNames.bind(styles);

function FeaturedCourse() {
  return (
    <div className={cx("background-featured-courses")}>
      <div className="container">
        <div className={cx("col-inner text-center mt-3", "text")}>
          <h2 className={cx("mt-3")}>Featured Courses</h2>
        </div>
        <div className={cx("row")}>
          <div className={cx("col-4")}>
            <div className={cx("image-course")}>
              <a href="/course-details">
                <img src={course1} alt="course1" />
              </a>
              <Link to="yeu-thich">
                <Tippy content="Yêu thích" arrow={true} theme="custom">
                  <div className={cx("heart-icon")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tippy>
              </Link>
              <a href="/course-details">
                <div className={cx("content-image")}>
                  <h5>build automatic money making machine on shopee</h5>
                </div>
              </a>
              <a href="view-instructor">
                <div className={cx("image-avatar")}>
                  <img src={tuong} alt="tuong" />
                  <span className={cx("info-instructor-span")}>
                    Nguyễn Tấn Tường
                  </span>
                  <span className={cx("text-price")}>700,000 VND</span>
                </div>
              </a>
              <Link to="add-to-cart">
                <div className={cx("button-cart")}>
                  <button
                    type="button"
                    className={cx("btn btn-primary", "button-cart")}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("image-course")}>
              <a href="/course-details">
                <img src={course2} alt="course2" />
              </a>
              <Link to="yeu-thich">
                <Tippy content="Yêu thích" arrow={true} theme="custom">
                  <div className={cx("heart-icon")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tippy>
              </Link>
              <a href="/course-details">
                <div className={cx("content-image")}>
                  <h5>build automatic money making machine on shopee</h5>
                </div>
              </a>
              <a href="/view-instructor">
                <div className={cx("image-avatar")}>
                  <img src={tuong} alt="tuong" />
                  <span className={cx("info-instructor-span")}>
                    Nguyễn Tấn Tường
                  </span>
                  <span className={cx("text-price")}>700,000 VND</span>
                </div>
              </a>
              <Link to="add-to-cart">
                <div className={cx("button-cart")}>
                  <button
                    type="button"
                    className={cx("btn btn-primary", "button-cart")}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("image-course")}>
              <a href="/course-details">
                <img src={course3} alt="course3" />
              </a>
              <Link to="yeu-thich">
                <Tippy content="Yêu thích" arrow={true} theme="custom">
                  <div className={cx("heart-icon")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tippy>
              </Link>
              <a href="/course-details">
                <div className={cx("content-image")}>
                  <h5>build automatic money making machine on shopee</h5>
                </div>
              </a>
              <a href="/view-instructor">
                <div className={cx("image-avatar")}>
                  <img src={tuong} alt="tuong" />
                  <span className={cx("info-instructor-span")}>
                    Nguyễn Tấn Tường
                  </span>
                  <span className={cx("text-price")}>700,000 VND</span>
                </div>
              </a>
              <Link to="add-to-cart">
                <div className={cx("button-cart")}>
                  <button
                    type="button"
                    className={cx("btn btn-primary", "button-cart")}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("image-course")}>
              <Link to="course-details">
                <img src={course4} alt="course4" />
              </Link>
              <Link to="yeu-thich">
                <Tippy content="Yêu thích" arrow={true} theme="custom">
                  <div className={cx("heart-icon")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tippy>
              </Link>
              <Link to="course-details">
                <div className={cx("content-image")}>
                  <h5>build automatic money making machine on shopee</h5>
                </div>
              </Link>
              <Link to="view-instructor">
                <div className={cx("image-avatar")}>
                  <img src={tuong} alt="tuong" />
                  <span className={cx("info-instructor-span")}>
                    Nguyễn Tấn Tường
                  </span>
                  <span className={cx("text-price")}>700,000 VND</span>
                </div>
              </Link>
              <Link to="add-to-cart">
                <div className={cx("button-cart")}>
                  <button
                    type="button"
                    className={cx("btn btn-primary", "button-cart")}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("image-course")}>
              <a href="/course-details">
                <img src={course5} alt="course5" />
              </a>
              <Link to="yeu-thich">
                <Tippy content="Yêu thích" arrow={true} theme="custom">
                  <div className={cx("heart-icon")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tippy>
              </Link>
              <a href="/course-details">
                <div className={cx("content-image")}>
                  <h5>build automatic money making machine on shopee</h5>
                </div>
              </a>
              <a href="/view-instructor">
                <div className={cx("image-avatar")}>
                  <img src={tuong} alt="tuong" />
                  <span className={cx("info-instructor-span")}>
                    Nguyễn Tấn Tường
                  </span>
                  <span className={cx("text-price")}>700,000 VND</span>
                </div>
              </a>
              <Link to="add-to-cart">
                <div className={cx("button-cart")}>
                  <button
                    type="button"
                    className={cx("btn btn-primary", "button-cart")}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("image-course")}>
              <a href="/course-details">
                <img src={course6} alt="course6" />
              </a>
              <Link to="yeu-thich">
                <Tippy content="Yêu thích" arrow={true} theme="custom">
                  <div className={cx("heart-icon")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tippy>
              </Link>
              <a href="/course-details">
                <div className={cx("content-image")}>
                  <h5>build automatic money making machine on shopee</h5>
                </div>
              </a>
              <a href="/view-instructor">
                <div className={cx("image-avatar")}>
                  <img src={tuong} alt="tuong" />
                  <span className={cx("info-instructor-span")}>
                    Nguyễn Tấn Tường
                  </span>
                  <span className={cx("text-price")}>700,000 VND</span>
                </div>
              </a>
              <Link to="add-to-cart">
                <div className={cx("button-cart")}>
                  <button
                    type="button"
                    className={cx("btn btn-primary", "button-cart")}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("image-course")}>
              <a href="/course-details">
                <img src={course7} alt="course7" />
              </a>
              <Link to="yeu-thich">
                <Tippy content="Yêu thích" arrow={true} theme="custom">
                  <div className={cx("heart-icon")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tippy>
              </Link>
              <a href="/course-details">
                <div className={cx("content-image")}>
                  <h5>build automatic money making machine on shopee</h5>
                </div>
              </a>
              <a href="/view-instructor">
                <div className={cx("image-avatar")}>
                  <img src={tuong} alt="tuong" />
                  <span className={cx("info-instructor-span")}>
                    Nguyễn Tấn Tường
                  </span>
                  <span className={cx("text-price")}>700,000 VND</span>
                </div>
              </a>
              <Link to="add-to-cart">
                <div className={cx("button-cart")}>
                  <button
                    type="button"
                    className={cx("btn btn-primary", "button-cart")}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("image-course")}>
              <a href="/course-details">
                <img src={course8} alt="course8" />
              </a>
              <Link to="yeu-thich">
                <Tippy content="Yêu thích" arrow={true} theme="custom">
                  <div className={cx("heart-icon")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tippy>
              </Link>
              <a href="/course-details">
                <div className={cx("content-image")}>
                  <h5>build automatic money making machine on shopee</h5>
                </div>
              </a>
              <a href="/view-instructor">
                <div className={cx("image-avatar")}>
                  <img src={tuong} alt="tuong" />
                  <span className={cx("info-instructor-span")}>
                    Nguyễn Tấn Tường
                  </span>
                  <span className={cx("text-price")}>700,000 VND</span>
                </div>
              </a>
              <Link to="add-to-cart">
                <div className={cx("button-cart")}>
                  <button
                    type="button"
                    className={cx("btn btn-primary", "button-cart")}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("image-course")}>
              <a href="/course-details">
                <img src={course9} alt="course9" />
              </a>
              <Link to="yeu-thich">
                <Tippy content="Yêu thích" arrow={true} theme="custom">
                  <div className={cx("heart-icon")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tippy>
              </Link>
              <a href="/course-details">
                <div className={cx("content-image")}>
                  <h5>build automatic money making machine on shopee</h5>
                </div>
              </a>
              <a href="/view-instructor">
                <div className={cx("image-avatar")}>
                  <img src={tuong} alt="tuong" />
                  <span className={cx("info-instructor-span")}>
                    Nguyễn Tấn Tường
                  </span>
                  <span className={cx("text-price")}>700,000 VND</span>
                </div>
              </a>
              <Link to="add-to-cart">
                <div className={cx("button-cart")}>
                  <button
                    type="button"
                    className={cx("btn btn-primary", "button-cart")}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCourse;
