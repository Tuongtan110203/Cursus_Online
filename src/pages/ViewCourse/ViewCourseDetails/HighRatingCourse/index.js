import { React, useState } from "react";
import classNames from "classnames/bind";
import styles from "./HighRatingCourse.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import course10 from "~/images/course10.jpg";
import course11 from "~/images/course11.jpg";
import course12 from "~/images/course12.jpg";
import course13 from "~/images/course13.jpg";
import course14 from "~/images/course14.jpg";
import course15 from "~/images/course15.jpg";
import tuong from "~/images/tuong.jpg";
import avatar from "~/images/avatar.png";
import anonymous from "~/images/anonymous.png";
import lessonv1 from "~/images/lessonv1.png";
import student from "~/images/student.png";
import durationtime from "~/images/durationtime.png";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "~/components/Layout/Header/tippyStyles.module.scss";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function HighRatingCourse() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      image: course10,
      title: "Build Automatic Money Making Machine on Shopee",
      lesson: 12,
      VideoTime: 120,
      Level: "Beginner",
      Chapter: 3,
      Category: "Programming",
      oldPrice: 99,
      newPrice: 49,
      instructor: {
        name: "Nguyen Tan Tuong",
        image: tuong,
      },
    },
    {
      id: 2,
      image: course11,
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      lesson: 13,
      VideoTime: 130,
      Level: "Intermediate",
      Category: "Designer",
      oldPrice: 99,
      newPrice: 49,
      Chapter: 4,
      instructor: {
        name: "Joe Smith",
        image: avatar,
      },
    },
    {
      id: 3,
      image: course12,
      title: "Become a Certified Web Developer: HTML, CSS and JavaScript",
      lesson: 12,
      VideoTime: 180,
      Level: "Expert",
      Chapter: 7,
      Category: "Sale",
      oldPrice: 99,
      newPrice: 49,
      instructor: {
        name: "Joe Smith 1",
        image: anonymous,
      },
    },
    {
      id: 4,
      image: course13,
      title: "A Certified Web Developer: HTML, CSS and JavaScript",
      lesson: 22,
      VideoTime: 380,
      Level: "Expert",
      Category: "Marketing",
      oldPrice: 99,
      newPrice: 49,
      Chapter: 1,
      instructor: {
        name: "Joe Smith 2",
        image: anonymous,
      },
    },
    {
      id: 5,
      image: course14,
      title: "A Certified Web Developer: HTML, CSS and JavaScript",
      lesson: 32,
      VideoTime: 80,
      Level: "Beginner",
      Category: "English",
      oldPrice: 99,
      newPrice: 49,
      Chapter: 13,
      instructor: {
        name: "Joe Smith 3",
        image: anonymous,
      },
    },
    {
      id: 6,
      image: course15,
      title: "A Certified Web Developer: HTML, CSS and JavaScript",
      lesson: 2,
      VideoTime: 380,
      Level: "Beginner",
      Category: "Parenting",
      oldPrice: 99,
      newPrice: 49,
      Chapter: 2,
      instructor: {
        name: "Joe Smith 4",
        image: anonymous,
      },
    },
  ]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={cx("wrapper-relate-course")}>
      <Slider {...settings}>
        {courses.map((course) => (
          <div key={course.id} className={cx("col-4")}>
            <div className={cx("image-course")}>
              <a href="/course-details" className={cx("image-header-course")}>
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
              <a href="programming" className={cx("category")}>
                {course.Category}
              </a>
              <a href="/course-details">
                <div className={cx("content-image")}>
                  <h5>{course.title}</h5>
                </div>
              </a>
              <ul className={cx("list-info-course")}>
                <li>
                  <img src={lessonv1} alt="lesson" />
                  {course.lesson} Lessons
                </li>
                <li>
                  <img src={durationtime} alt="time" />
                  {course.VideoTime} Minutes
                </li>
                <li>
                  <img src={student} alt="student" />
                  {course.Level}
                </li>
              </ul>
              <div className={cx("border-bottom")}></div>
              <a href="view-instructor">
                <div className={cx("image-avatar")}>
                  <div className={cx("course-author")}>
                    <img src={course.instructor.image} alt="tuong" />
                    <p>{course.instructor.name}</p>
                  </div>
                  <div className={cx("course-price")}>
                    <p className={cx("old-price")}>${course.oldPrice}</p>
                    <p className={cx("new-price")}>${course.newPrice}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        right: "-12px",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        left: "-40px",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
}

export default HighRatingCourse;
