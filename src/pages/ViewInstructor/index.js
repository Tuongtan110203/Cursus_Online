import { useState, React } from "react";
import classNames from "classnames/bind";
import styles from "./viewInstructor.module.scss";
import { Breadcrumbs, Link, Typography } from "@mui/material"; // Import từ MUI
//import Header Footer
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import instructor from "~/images/instructor.jpg";
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
//import tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "~/components/Layout/Header/tippyStyles.module.scss";
import "slick-carousel/slick/slick.css"; //carousel
import "slick-carousel/slick/slick-theme.css"; //carousel
import Slider from "react-slick"; //carousel
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUserCheck,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ViewInstructor() {
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
  const totalCourse = courses.length;

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
    <section className={cx("section-view-instructor")}>
      <section className={cx("section-header")}>
        <header>
          <Header />
        </header>
      </section>
      <section className={cx("section-content")}>
        <div className={cx("container")}>
          <div className={cx("breadcrumb")}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                Home
              </Link>
              <Typography color="textPrimary">View Instructor</Typography>
            </Breadcrumbs>
          </div>
          <div className={cx("row")}>
            <div className={cx("wrapper")}>
              <div className={cx("col-4")}>
                <div className={cx("image")}>
                  <img src={instructor} alt="instructor" />
                </div>
              </div>
              <div className={cx("col-8")}>
                <div className={cx("content")}>
                  <h4>Alextina Miles</h4>
                  <span>Project Manager</span>
                  <p>
                    Digital Product Engineering Services leader helping Fortune
                    500 companies on their innovation agenda. In Matilda`s time
                    as President and CEO of company, the company experienced
                    explosive growth in size and revenu
                  </p>
                  <ul className={cx("details-info")}>
                    <li>
                      <span>Experience:</span> Developer
                    </li>
                    <li>
                      <span>Email:</span> tuongntse171150@fpt.edu.vn
                    </li>
                    <li>
                      <span>Phone:</span> 0865429351
                    </li>
                    <li>
                      <span>Address:</span> Ho Chi Minh City
                    </li>
                    <li>
                      <span>ToTal Student:</span> 323232{" "}
                      <FontAwesomeIcon icon={faUserCheck} />
                    </li>
                    <li>
                      <span>Review:</span> 4.9/5.0
                      <FontAwesomeIcon icon={faStar} />
                    </li>
                  </ul>
                  <ul className={cx("social-info")}>
                    <li>
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faFacebookSquare} />
                      </a>{" "}
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col-12")}>
              <div className={cx("personal-info")}>
                <h4 className={cx("title")}>Personal Info</h4>
                <p className={cx("content")}>
                  Since joining EduQuest in 2023, Matilda has helped turn the
                  company from a group of bright technology minds working with
                  startups into a global Digital Product Engineering Services
                  leader helping Fortune 500 companies on their innovation
                  agenda. In Matilda`s time as President and CEO of company, the
                  company has experienced explosive growth in size and revenue –
                  all while developing a culture that fosters engaged employees
                  around innovation.
                </p>
                <p>
                  Since joining EduQuest in 2023, Matilda has helped turn the
                  company from a group of bright technology minds working with
                  startups into a global Digital Product Engineering Services
                  leader helping Fortune 500 companies on their innovation
                  agenda. In Matilda`s time as President and CEO of company, the
                  company has experienced explosive growth in size and revenue –
                  all while developing a culture that fosters engaged employees
                  around innovation.
                </p>
              </div>
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col-12")}>
              <div className={cx("experience-activity")}>
                <h4 className={cx("title")}>Experience & Activities</h4>
                <p className={cx("content")}>
                  Since joining EduQuest in 2023, Matilda has helped turn the
                  company from a group of bright technology minds working with
                  startups into a global Digital Product Engineering Services
                  leader helping Fortune 500 companies on their innovation
                  agenda. In Matilda`s time as President and CEO of company, the
                  company has experienced explosive growth in size and revenue –
                  all while developing a culture that fosters engaged employees
                  around innovation.
                </p>
                <p>
                  Since joining EduQuest in 2023, Matilda has helped turn the
                  company from a group of bright technology minds working with
                  startups into a global Digital Product Engineering Services
                  leader helping Fortune 500 companies on their innovation
                  agenda. In Matilda`s time as President and CEO of company, the
                  company has experienced explosive growth in size and revenue –
                  all while developing a culture that fosters engaged employees
                  around innovation.
                </p>
              </div>
            </div>
          </div>{" "}
          <div className={cx("my-course")}>
            <h4>My Course({totalCourse})</h4>
          </div>
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course.id} className={cx("col-4")}>
                <div className={cx("image-course")}>
                  <a
                    href="/course-details"
                    className={cx("image-header-course")}
                  >
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
      </section>
      <section className={cx("section-footer")}>
        <footer>
          <Footer />
        </footer>
      </section>{" "}
    </section>
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        right: "5px",
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

export default ViewInstructor;
