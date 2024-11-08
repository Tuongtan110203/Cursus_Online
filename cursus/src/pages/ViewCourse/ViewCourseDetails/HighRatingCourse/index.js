import React from "react";
import classNames from "classnames/bind";
import styles from "./HighRatingCourse.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import course1 from "~/images/course1.jpg";
import course2 from "~/images/course2.jpg";
import course3 from "~/images/course3.jpg";
import course4 from "~/images/course4.jpg";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "~/components/Layout/Header/tippyStyles.module.scss";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tuong from "~/images/tuong.jpg";

const cx = classNames.bind(styles);

function HighRatingCourse() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={cx("wrapper-relate-course")}>
      <Slider {...settings}>
        <div className={cx("image-course")}>
          <Link to="/course-details">
            <img src={course4} alt="course4" />
          </Link>
          <Link to="yeu-thich">
            <Tippy content="Yêu thích" arrow={true} theme="custom">
              <div className={cx("heart-icon")}>
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </Tippy>
          </Link>
          <Link to="/course-details">
            <div className={cx("content-image")}>
              <h5>build automatic money making machine on shopee</h5>
            </div>
          </Link>
          <Link to="/view-instructor">
            <div className={cx("image-avatar")}>
              <img src={tuong} alt="tuong" />
              <span className={cx("info-instructor-span")}>
                Nguyễn Tấn Tường
              </span>
              <span className={cx("text-price")}>700,000 VND</span>
            </div>
          </Link>
          <Link to="/add-to-cart">
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
        <div className={cx("image-course")}>
          <Link to="/course-details">
            <img src={course3} alt="course3" />
          </Link>
          <Link to="yeu-thich">
            <Tippy content="Yêu thích" arrow={true} theme="custom">
              <div className={cx("heart-icon")}>
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </Tippy>
          </Link>
          <Link to="/course-details">
            <div className={cx("content-image")}>
              <h5>build automatic money making machine on shopee</h5>
            </div>
          </Link>
          <Link to="/view-instructor">
            <div className={cx("image-avatar")}>
              <img src={tuong} alt="tuong" />
              <span className={cx("info-instructor-span")}>
                Nguyễn Tấn Tường
              </span>
              <span className={cx("text-price")}>700,000 VND</span>
            </div>
          </Link>
          <Link to="/add-to-cart">
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
        <div className={cx("image-course")}>
          <Link to="/course-details">
            <img src={course2} alt="course2" />
          </Link>
          <Link to="yeu-thich">
            <Tippy content="Yêu thích" arrow={true} theme="custom">
              <div className={cx("heart-icon")}>
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </Tippy>
          </Link>
          <Link to="/course-details">
            <div className={cx("content-image")}>
              <h5>build automatic money making machine on shopee</h5>
            </div>
          </Link>
          <Link to="/view-instructor">
            <div className={cx("image-avatar")}>
              <img src={tuong} alt="tuong" />
              <span className={cx("info-instructor-span")}>
                Nguyễn Tấn Tường
              </span>
              <span className={cx("text-price")}>700,000 VND</span>
            </div>
          </Link>
          <Link to="/add-to-cart">
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
        <div className={cx("image-course")}>
          <Link to="/course-details">
            <img src={course1} alt="course1" />
          </Link>
          <Link to="yeu-thich">
            <Tippy content="Yêu thích" arrow={true} theme="custom">
              <div className={cx("heart-icon")}>
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </Tippy>
          </Link>
          <Link to="/course-details">
            <div className={cx("content-image")}>
              <h5>build automatic money making machine on shopee</h5>
            </div>
          </Link>
          <Link to="/view-instructor">
            <div className={cx("image-avatar")}>
              <img src={tuong} alt="tuong" />
              <span className={cx("info-instructor-span")}>
                Nguyễn Tấn Tường
              </span>
              <span className={cx("text-price")}>700,000 VND</span>
            </div>
          </Link>
          <Link to="/add-to-cart">
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
      </Slider>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, right: "-12px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left: "-27px" }}
      onClick={onClick}
    />
  );
}

export default HighRatingCourse;
