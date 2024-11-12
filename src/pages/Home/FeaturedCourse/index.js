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
import course10 from "~/images/course10.jpg";
import course11 from "~/images/course11.jpg";
import course12 from "~/images/course12.jpg";
import course13 from "~/images/course13.jpg";
import course14 from "~/images/course14.jpg";
import course15 from "~/images/course15.jpg";

//import fontawesome from "~/
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import tuong
import tuong from "~/images/tuong.jpg";
import avatar from "~/images/avatar.png";
import anonymous from "~/images/anonymous.png";

import { useState } from "react";

const cx = classNames.bind(styles);

function FeaturedCourse() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      image: course10,
      title: "Build Automatic Money Making Machine on Shopee",
      instructor: {
        name: "Nguyen Tan Tuong",
        image: tuong,
      },
    },
    {
      id: 2,
      image: course11,
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      instructor: {
        name: "Joe Smith",
        image: avatar,
      },
    },
    {
      id: 3,
      image: course12,
      title: "Become a Certified Web Developer: HTML, CSS and JavaScript",
      instructor: {
        name: "Joe Smith 1",
        image: anonymous,
      },
    },
    {
      id: 4,
      image: course13,
      title: "A Certified Web Developer: HTML, CSS and JavaScript",
      instructor: {
        name: "Joe Smith 2",
        image: anonymous,
      },
    },
    {
      id: 5,
      image: course14,
      title: "A Certified Web Developer: HTML, CSS and JavaScript",
      instructor: {
        name: "Joe Smith 3",
        image: anonymous,
      },
    },
    {
      id: 6,
      image: course15,
      title: "A Certified Web Developer: HTML, CSS and JavaScript",
      instructor: {
        name: "Joe Smith 4",
        image: anonymous,
      },
    },
  ]);

  return (
    <div className={cx("background-featured-courses")}>
      <div className={cx("container")}>
        <div className={cx("col-inner text-center mt-3", "text")}>
          <h2 className={cx("mt-3")}>Featured Courses</h2>
        </div>
        <div className={cx("row")}>
          {courses.map((course) => (
            <div key={course.id} className={cx("col-4")}>
              <div className={cx("image-course")}>
                <a href="/course-details">
                  <img src={course.image} alt="course1" />
                </a>
                <Link to="yeu-thich">
                  <Tippy content="Yêu thích" arrow={true} theme="custom">
                    <div className={cx("heart-icon")}>
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                  </Tippy>
                </Link>
                <Tippy content="Lượt đánh giá" arrow={true} theme="custom">
                  <div className={cx("rating-icon")}>
                    <FontAwesomeIcon icon={faStar} />
                    4.5 (120)
                  </div>
                </Tippy>
                <a href="/course-details">
                  <div className={cx("content-image")}>
                    <h5>{course.title}</h5>
                  </div>
                </a>
                <a href="view-instructor">
                  <div className={cx("image-avatar")}>
                    <img src={course.instructor.image} alt="tuong" />
                    <span className={cx("info-instructor-span")}>
                      {course.instructor.name}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedCourse;
