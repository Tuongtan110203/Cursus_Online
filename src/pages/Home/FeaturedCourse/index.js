import classNames from "classnames/bind";
import styles from "./featuredCourse.module.scss";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "~/components/Layout/Header/tippyStyles.module.scss";
import lessonv1 from "~/images/lessonv1.png";
import student from "~/images/student.png";
import durationtime from "~/images/durationtime.png";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChapterAPI from "~/API/ChapterAPI";
import DashBoardApi from "~/API/DashBoardAPI";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function FeaturedCourse() {
  const [apiCourses, setApiCourses] = useState([]);
  const [chapterLesson, setChapterLesson] = useState([]);
  const topFeaturedCourse = 9;

  // Fetch featured courses
  useEffect(() => {
    const getFeaturedCourses = async () => {
      try {
        const response = await DashBoardApi().getFeaturedCourses(
          topFeaturedCourse
        );
        setApiCourses(response);
      } catch (error) {
        console.error("Error fetching featured courses:", error);
      }
    };
    getFeaturedCourses();
  }, []);

  useEffect(() => {
    const getAllChapterLessons = async () => {
      try {
        const promises = apiCourses.map((course) =>
          ChapterAPI().GetChapterLessonByCourseId(course?.courseId)
        );

        const results = await Promise.all(promises);

        const mergedResults = results.flat();

        setChapterLesson(mergedResults);
      } catch (error) {
        console.error("Error fetching chapters and lessons:", error);
      }
    };

    if (apiCourses.length > 0) {
      getAllChapterLessons();
    }
  }, [apiCourses]);

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

  return (
    <div className={cx("background-featured-courses")}>
      <div className={cx("container")}>
        <div className={cx("col-inner text-center mt-3", "text")}>
          <h2 className={cx("mt-3")}>Featured Courses</h2>
        </div>
        <div className={cx("row")}>
          {apiCourses.map((course) => {
            const discountPrice =
              course.price - course.price * (course.discount / 100);

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
                      {course.averageStarRating}({course.totalStarRating})
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
                      {duration != null ? duration.toFixed(0) : "0"} Minutes
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
                        <p className={cx("new-price")}>
                          ${discountPrice.toFixed(2)}{" "}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FeaturedCourse;
