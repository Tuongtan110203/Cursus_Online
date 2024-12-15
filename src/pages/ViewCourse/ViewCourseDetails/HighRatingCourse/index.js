import { React, useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./HighRatingCourse.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import lessonv1 from "~/images/lessonv1.png";
import student from "~/images/student.png";
import durationtime from "~/images/durationtime.png";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "~/components/Layout/Header/tippyStyles.module.scss";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CourseApi from "~/API/CourseApi";
import ChapterAPI from "~/API/ChapterAPI";
import BookMarkAPI from "~/API/BookMarkAPI";
import CartAPI from "~/API/CartAPI";
import { useBookmarks } from "~/pages/BookMark/BookmarkContext";

const cx = classNames.bind(styles);

function HighRatingCourse() {
  const [courses, setCourses] = useState([]);
  const topHighRating = 5;
  const [chapterLesson, setChapterLesson] = useState([]);
  const { bookmarkItems, fetchBookmarks } = useBookmarks();
  const [cartItems, setCartItems] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  // you also also like
  useEffect(() => {
    const getHighRatingCourse = async () => {
      try {
        const response = await CourseApi().getCourseHighRating(topHighRating);
        setCourses(response);
      } catch (error) {
        console.error("Error fetching top high-rated courses:", error);
      }
    };
    getHighRatingCourse();
  }, []);
  //end you also

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

  //add bookmark
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
  //end add bookmark
  //add to cart
  const handleAddToCart = async () => {
    try {
      const addToCart = await CartAPI().getCart();
      setCartItems(addToCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className={cx("wrapper-relate-course")}>
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
                <Tippy content="Add to favorites" arrow={true} theme="custom">
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
                    {course.averageStarRating}({course.totalStarRating})
                  </div>
                </Tippy>
                <a href="programming" className={cx("category")}>
                  {course.category.categoryName}
                </a>
                <a href="/course-details">
                  <div className={cx("content-image")}>
                    <h5>{course.courseTitle}</h5>
                  </div>
                </a>
                <ul className={cx("list-info-course")}>
                  <li>
                    <img src={lessonv1} alt="lesson" />
                    {lessonCount} Lessons
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
                <Link to={`/view-instructor/${course.userName}`}>
                  <div className={cx("image-avatar")}>
                    <div className={cx("course-author")}>
                      <img src={course.avatar} alt="tuong" />
                      <p>{course.userName}</p>
                    </div>
                    <div className={cx("course-price")}>
                      <p className={cx("old-price")}>${course.price}</p>
                      <p className={cx("new-price")}>${discountPrice}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
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
