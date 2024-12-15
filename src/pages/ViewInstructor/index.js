import { useState, React, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./viewInstructor.module.scss";
import { Breadcrumbs, Link, Typography } from "@mui/material"; // Import từ MUI
//import Header Footer
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";

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
import UserAPI from "~/API/UserAPI";
import { useParams } from "react-router-dom";
import InstructorAPI from "~/API/InstructorAPI";
import ChapterAPI from "~/API/ChapterAPI";
import BookMarkAPI from "~/API/BookMarkAPI";
import CartAPI from "~/API/CartAPI";
import { useBookmarks } from "~/pages/BookMark/BookmarkContext";

const cx = classNames.bind(styles);

function ViewInstructor() {
  const [courses, setCourses] = useState([]);
  const [chapterLesson, setChapterLesson] = useState([]);
  const [totalStudentAndReview, setTotalStudentAndReview] = useState({});
  const { instructorName } = useParams();
  const { bookmarkItems, fetchBookmarks } = useBookmarks();
  const [instructorData, setInstructorData] = useState(null);

  useEffect(() => {
    const getCoursesByInstructor = async (instructorName) => {
      try {
        const response = await InstructorAPI().getCoursesByInstructor(
          instructorName
        );
        setCourses(response);
      } catch (error) {
        console.error(error);
      }
    };
    getCoursesByInstructor(instructorName);
  }, [instructorName]);

  //chapter lessson
  useEffect(() => {
    const getAllChapterLessons = async () => {
      try {
        const promises = courses.map((course) =>
          ChapterAPI().GetChapterLessonByCourseId(course.courseId)
        );

        const results = await Promise.all(promises);

        const mergedResults = results.flat();

        setChapterLesson(mergedResults);
      } catch (error) {
        console.error("Error fetching chapters and lessons:", error);
      }
    };

    if (courses.length > 0) {
      getAllChapterLessons();
    }
  }, [courses]);

  const getCourseChapterAndLessonCount = (courseId) => {
    const courseChapters = chapterLesson.filter(
      (chapter) => chapter.courseId === courseId
    );

    if (courseChapters.length === 0) {
      return { chapterCount: 0, lessonCount: 0 };
    }

    const chapterCount = courseChapters.length;

    const lessonCount = courseChapters.reduce(
      (totalLessons, chapter) => totalLessons + chapter.lessons.length,
      0
    );
    const duration = courseChapters.reduce(
      (totalDuration, chapter) => totalDuration + (chapter.duration || 0),
      0
    );
    return { chapterCount, lessonCount, duration };
  };
  //end chapter lesson
  //total student and review of instructor
  useEffect(() => {
    const fetchTotalStudentAndReview = async (instructorName) => {
      const totalStudentAndReview = await UserAPI().getTotalStudentAndReview(
        instructorName
      );
      setTotalStudentAndReview(totalStudentAndReview);
    };
    fetchTotalStudentAndReview(instructorName);
  }, [instructorName]);
  //end total student and review of instructor
  useEffect(() => {
    const fetchInstructorData = async () => {
      const data = await UserAPI().getUserByUserName(instructorName);
      setInstructorData(data);
    };

    if (instructorName) {
      fetchInstructorData();
    }
  }, [instructorName]);

  if (!instructorData) {
    return <div>Loading...</div>;
  }

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
  //book mark
  const handleAddBookmark = async (courseId) => {
    try {
      const existingBookmark = bookmarkItems.find(
        (item) => item.course.courseId === courseId
      );

      if (existingBookmark) {
        await BookMarkAPI().DeleteBookMark(existingBookmark.bookmarkDetailId);
        console.log("Bookmark removed successfully.");
      } else {
        await BookMarkAPI().AddBookMark(courseId);
        console.log("Bookmark added successfully.");
      }

      fetchBookmarks();
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
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
                  <img src={instructorData.avatar} alt="instructor" />
                </div>
              </div>
              <div className={cx("col-8")}>
                <div className={cx("content")}>
                  <h4>{instructorData.userName}</h4>
                  <span>
                    <b>Major:</b> {instructorData.userInfo.occupation}
                  </span>
                  <p>{instructorData.userInfo.jobDescription}</p>
                  <ul className={cx("details-info")}>
                    <li>
                      <span>Experience:</span>{" "}
                      {instructorData.userInfo.experience}
                    </li>
                    <li>
                      <span>Email:</span> {instructorData.email}
                    </li>
                    <li>
                      <span>Gender:</span> {instructorData.userInfo.gender}
                    </li>
                    <li>
                      <span>Phone:</span> {instructorData.phoneNumber}
                    </li>
                    <li>
                      <span>Address:</span> {instructorData.address}
                    </li>
                    <li>
                      <span>ToTal Student:</span>{" "}
                      {totalStudentAndReview.totalStudent}{" "}
                      <FontAwesomeIcon
                        icon={faUserCheck}
                        style={{ color: "yellowgreen" }}
                      />
                    </li>
                    <li>
                      <span>Review:</span> {totalStudentAndReview.totalReview} /
                      5.0
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: "yellowgreen" }}
                      />
                    </li>
                  </ul>
                  <ul className={cx("social-info")}>
                    <li>
                      <a
                        href={instructorData.userInfo.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faFacebookSquare} />
                      </a>{" "}
                    </li>
                    <li>
                      <a
                        href={instructorData.userInfo.instagram}
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
                  {instructorData.userInfo.personalInfo}
                </p>
              </div>
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col-12")}>
              <div className={cx("experience-activity")}>
                <h4 className={cx("title")}>Experience & Activities</h4>
                <p className={cx("content")}>
                  {instructorData.userInfo.describeExperience}
                </p>
              </div>
            </div>
          </div>{" "}
          <div className={cx("my-course")}>
            <h4>My Course({totalCourse})</h4>
          </div>
          <Slider {...settings}>
            {courses.map((course) => {
              const discountPrice =
                course.price && course.discount
                  ? course.price - course.price * (course.discount / 100)
                  : course.price;
              const { chapterCount, lessonCount, duration } =
                getCourseChapterAndLessonCount(course.courseId);

              const isBookmarked = bookmarkItems.some(
                (item) => item.course.courseId === course.courseId
              );

              return (
                <div key={course.courseId} className={cx("col-4")}>
                  <div className={cx("image-course")}>
                    <a
                      href={`/course-details/${course.courseId}`}
                      className={cx("image-header-course")}
                    >
                      <img src={course.image} alt="course1" />
                    </a>
                    <Tippy
                      content="Add to favorites"
                      arrow={true}
                      theme="custom"
                    >
                      <div
                        className={cx("heart-icon", {
                          bookmarked: isBookmarked,
                        })}
                        onClick={() => {
                          handleAddBookmark(course.courseId);
                        }}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </div>
                    </Tippy>
                    <Tippy content="Lượt đánh giá" arrow={true} theme="custom">
                      <div className={cx("rating-icon")}>
                        <FontAwesomeIcon icon={faStar} />
                        {course.averageStarRating}({course.totalStarRating}){" "}
                      </div>
                    </Tippy>
                    <a href="programming" className={cx("category")}>
                      {course.category.categoryName}
                    </a>
                    <a href={`/course-details/${course.courseId}`}>
                      <div className={cx("content-image")}>
                        <h5>{course.courseTitle}</h5>
                      </div>
                    </a>
                    <ul className={cx("list-info-course")}>
                      <li>
                        <img src={lessonv1} alt="lesson" />
                        {lessonCount} Lesson
                      </li>
                      <li>
                        <img src={durationtime} alt="time" />
                        {duration} Minutes
                      </li>
                      <li>
                        <img src={student} alt="student" />
                        {chapterCount} Chapters
                      </li>
                    </ul>
                    <div className={cx("border-bottom")}></div>
                    <a href={`/view-instructor/${course.userName}`}>
                      <div className={cx("image-avatar")}>
                        <div className={cx("course-author")}>
                          <img src={course.avatar} alt="tuong" />
                          <p>{course.userName}</p>
                        </div>
                        <div className={cx("course-price")}>
                          {course.discount ? (
                            <p className={cx("old-price")}>${course.price}</p>
                          ) : null}
                          <p className={cx("new-price")}>
                            ${discountPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
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
