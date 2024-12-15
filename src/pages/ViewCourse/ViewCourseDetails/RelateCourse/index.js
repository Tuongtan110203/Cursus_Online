import { useState, React, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./relateCourse.module.scss";
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
import BookMarkAPI from "~/API/BookMarkAPI";
import { useBookmarks } from "~/pages/BookMark/BookmarkContext";
import CourseApi from "~/API/CourseApi";
import ChapterAPI from "~/API/ChapterAPI";
const cx = classNames.bind(styles);

function RelateCourse({ categoryName }) {
  const [courses, setCourses] = useState([]);
  const { bookmarkItems, fetchBookmarks } = useBookmarks();
  const [chapterLesson, setChapterLesson] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  //Get course by categoryName
  useEffect(() => {
    const getCoursesByCategoryName = async () => {
      try {
        if (categoryName != null) {
          const response = await CourseApi().GetCourseByCategoryName(
            categoryName
          );
          setCourses(response);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getCoursesByCategoryName();
  }, [categoryName]);
  // end get course by categoryName
  //Book mark
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
  // end boookmark
  // chapter leson
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
  return (
    <div className={cx("wrapper-relate-course")}>
      <h3 className={cx("title")}>Relate Course</h3>
      <Slider {...settings}>
        {courses.map((course) => {
          const isBookmarked = bookmarkItems.some(
            (item) => item.course.courseId === course.courseId
          );
          const { chapterCount, lessonCount, duration } =
            getCourseChapterAndLessonCount(course.courseId);

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
                    {course.averageStarRating} ({course.totalStarRating})
                  </div>
                </Tippy>
                <a
                  href={`/search?query=${course.category.categoryName}`}
                  className={cx("category")}
                >
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
                    {lessonCount} Lessons
                  </li>
                  <li>
                    <img src={durationtime} alt="time" />
                    {duration > 0 ? duration : 0} Minutes
                  </li>
                  <li>
                    <img src={student} alt="student" />
                    {course.level}
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
                      <p className={cx("new-price")}>${course.newPrice}</p>
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

export default RelateCourse;
