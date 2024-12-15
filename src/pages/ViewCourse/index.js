import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ViewCourse.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import { useLocation, Link } from "react-router-dom";
import { Form, Breadcrumb } from "react-bootstrap";
import StarIcon from "@mui/icons-material/Star"; // Import Star từ MUI
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faStarHalfAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import lessonv1 from "~/images/lessonv1.png";
import student from "~/images/student.png";
import durationtime from "~/images/durationtime.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "slick-carousel/slick/slick.css"; //carousel
import "slick-carousel/slick/slick-theme.css"; //carousel
import Slider from "react-slick"; //carousel
import Cookies from "js-cookie";
import axios from "axios";
import BASE_API_URL from "~/apiConfig";
import CourseApi from "~/API/CourseApi";
import CategoryAPI from "~/API/CategoryAPI";
import InstructorAPI from "~/API/InstructorAPI";
import Pagination from "@mui/material/Pagination";
import ChapterAPI from "~/API/ChapterAPI";
import BookMarkAPI from "~/API/BookMarkAPI";
import { useBookmarks } from "~/pages/BookMark/BookmarkContext";
import { useCart } from "~/Context/CartContext/CartContext";

import CartAPI from "~/API/CartAPI";
const cx = classNames.bind(styles);

function ViewCourse() {
  const inputRef = useRef(null);
  const [apiCourses, setApiCourses] = useState([]);
  const [hotCourse, setHotCourse] = useState([]);
  const [chapterLesson, setChapterLesson] = useState([]);
  const { bookmarkItems, fetchBookmarks } = useBookmarks();
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    Query: "",
    page: 1,
    pageSize: 20,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  //focus
  const handleFocus = () => {
    inputRef.current.focus();
  };
  useEffect(() => {
    handleFocus();
  }, []);
  //end focus

  //enter
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };
  //end enter
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLatest, setIsLatest] = useState("");
  const [ratingUp, setRatingUp] = useState("");
  const [topics, setTopics] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  //pagination
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const coursesPerPage = 7; // max course
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = apiCourses.slice(startIndex, endIndex);

  const { cartData, setCartData, fetchCart, isLoading } = useCart();

  //end pagination
  //start sroll
  const smoothScrollToTop = () => {
    const scrollDuration = 100;
    const scrollStep = -window.scrollY / (scrollDuration / 15);

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };
  //end scroll
  const handleRangePrice = async (e) => {
    const fromPrice = 0;
    const newPriceValue = e.target.value;
    setPriceValue(newPriceValue);
    try {
      const courses = await CourseApi().GetCourseByRangePrice(
        fromPrice,
        newPriceValue
      );
      setApiCourses(courses);
    } catch (error) {
      setError(error);
    }
  };

  const axiosCourses = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/Courses-active?page=1&pageSize=20`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      const items = data?.items || [];
      setApiCourses(items);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("API Error:", error);
    }
  };

  const handleClearChoice = async (e) => {
    setSelectedDuration("");
    setSelectedYear("");
    setSelectedTopic("");
    setSelectedInstructor("");
    setRatingUp("");
    setDropdownValue("");
    setSelectedLevel("");
    setPriceValue(0);
    await axiosCourses();
  };

  useEffect(() => {
    axiosCourses();
  }, []);

  const handleTopicChange = async (event) => {
    const selectedCategoryName = event.target.value;
    setSelectedTopic(selectedCategoryName);
    try {
      const courses = await CategoryAPI().fetchCourseByCategoryName(
        selectedCategoryName
      );
      setApiCourses(courses);
    } catch (error) {
      setError(error);
    }
  };
  const handleInstructorChange = async (event) => {
    const selectedInstructorName = event.target.value;
    setSelectedInstructor(selectedInstructorName);
    try {
      const courses = await InstructorAPI().getCoursesByInstructor(
        selectedInstructorName
      );
      setApiCourses(courses);
    } catch (error) {
      setError(error);
    }
  };

  const handleLevelChange = async (event) => {
    const selectedValueLevel = event.target.value;
    setSelectedLevel(selectedValueLevel);
    let level;
    switch (selectedValueLevel) {
      case "beginner":
        level = "Begin";
        break;
      case "intermediate":
        level = "Intermediate";
        break;
      case "expert":
        level = "Expert";
        break;
      case "all":
        level = null;
        break;
      default:
        console.log("Invalid value for level");
        return;
    }
    axiosLevel(level);
  };
  const handleDurationChange = async (event) => {
    const selectedValueDuration = event.target.value;
    setSelectedDuration(selectedValueDuration);
    let from, to;

    switch (selectedValueDuration) {
      case "0-2":
        from = 0;
        to = 2;
        break;
      case "2-4":
        from = 2;
        to = 4;
        break;
      case "4-8":
        from = 4;
        to = 8;
        break;
      case "8-16":
        from = 8;
        to = 16;
        break;
      case "16-32":
        from = 16;
        to = 32;
        break;
      case "32+":
        from = 32;
        to = null;
        break;
      default:
        console.log("Invalid value for duration");
        return;
    }
    await axiosDurationUp(from, to);
  };
  const handleYearChange = async (event) => {
    const selectedValueYear = event.target.value;
    setSelectedYear(selectedValueYear);
    let from, to;

    switch (selectedValueYear) {
      case "2018-2019":
        from = 2018;
        to = 2019;
        break;
      case "2019-2020":
        from = 2019;
        to = 2020;
        break;
      case "2020-2021":
        from = 20210;
        to = 2021;
        break;
      case "2021-2022":
        from = 2021;
        to = 2022;
        break;
      case "2022-2023":
        from = 2022;
        to = 2023;
        break;
      case "2024+":
        from = 2024;
        to = null;
        break;
      default:
        console.log("Invalid value for duration");
        return;
    }
    await axiosYearUp(from, to);
  };

  const handleDropdownChange = async (event) => {
    const selectedValue = event.target.value;
    setDropdownValue(selectedValue);
    switch (selectedValue) {
      case "50":
        await axiosTopEnroll();
        break;
      case "10":
        await axiosTopLatestOldest(true);
        break;
      case "20":
        await axiosTopLatestOldest(false);
        break;
      case "30":
        await axiosDiscount();
        break;
      case "40":
        await axiosRating();
        break;
      default:
        console.log("Invalid option selected");
    }
  };
  //search
  const handleSearchChange = (e) => {
    setSearchParams({
      ...searchParams,
      Query: e.target.value,
    });
  };

  const handleSearchSubmit = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/Courses-active`,
        {
          params: searchParams,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      const items = data?.items || [];
      setApiCourses(items);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("API Error:", error);
    }
  };
  //end search
  //level
  const axiosLevel = async (level) => {
    try {
      const courses = await CourseApi().getCourseByLevel(level);
      setApiCourses(courses);
    } catch (e) {
      setError(e);
    }
  };
  //end level
  const topHotCourse = 6;
  useEffect(() => {
    const axiosHotCourse = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get(
          `${BASE_API_URL}/Dashboard/top5-enrolled/${topHotCourse}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setHotCourse(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
        console.error("API Error:", error);
      }
    };
    axiosHotCourse();
  }, []);
  //end hot fresh coi course
  //fiter top  entroll
  const topEnrollCourse = 10;
  const axiosTopEnroll = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Dashboard/top5-enrolled/${topEnrollCourse}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setApiCourses(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("API Error:", error);
    }
  };
  //end
  //filter latest oldest
  const topLatestOldestCourse = 10;
  const axiosTopLatestOldest = async (isLatest) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Dashboard/top-latest-oldest-course/${topLatestOldestCourse}?isLatest=${isLatest}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setApiCourses(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };
  //end latest oldest
  // discount
  const discountCourse = 10;
  const axiosDiscount = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Dashboard/top-discount-course/${discountCourse}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setApiCourses(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("API Error:", error);
    }
  };
  //end discount
  //rating
  const ratingCourse = 10;
  const axiosRating = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Dashboard/top-rating/${ratingCourse}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setApiCourses(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("API Error:", error);
    }
  };
  //end rating
  //start rating up
  const axiosRatingUp = async (star) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/get-rating-up/${star}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setApiCourses(response.data);
    } catch (error) {
      setError(
        error.response.data.message || "An error occurred. Please try again."
      );
    }
  };
  //end rating up
  //duration
  const axiosDurationUp = async (from, to) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_API_URL}/Course/get-duration-up`,
        {
          params: { from, to },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setApiCourses(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại."
      );
    }
  };
  //end duration
  //year
  const axiosYearUp = async (from, to) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(`${BASE_API_URL}/Course/get-year-up`, {
        params: { from, to },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setApiCourses(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại."
      );
    }
  };
  //end year
  //topic
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await CategoryAPI().getAllCategories();
        setTopics(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  // end topic
  //instructor
  useEffect(() => {
    const fetchAllInstructor = async () => {
      try {
        const instructors = await InstructorAPI().getInstructors();
        setInstructors(instructors);
      } catch (error) {
        setError(
          error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại."
        );
      }
    };
    fetchAllInstructor();
  }, []);
  //end instructor

  //chapter lessson
  useEffect(() => {
    const getAllChapterLessons = async () => {
      try {
        const promises = apiCourses.map((course) =>
          ChapterAPI().GetChapterLessonByCourseId(course.courseId)
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
  //end chapter lesson

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

  // cart
  const fetchAddToCart = async (courseId) => {
    try {
      await CartAPI().addToCart(courseId);
      console.log("Course added to cart successfully.");
      fetchCart();
    } catch (e) {
      console.error("Error adding to cart:", e);
    }
  };
  // end cart
  return (
    <div className={cx("wrapper-search")}>
      <header>
        <Header />
      </header>
      <div className={cx("content-search")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-6", "breadcrumb-search")}>
              <Breadcrumb>
                <Breadcrumb.Item as={Link} to="/" className="text-muted">
                  <b>
                    <h5>Home</h5>
                  </b>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                  <b>
                    <h5>View Course</h5>
                  </b>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                  <b>
                    <h5>{apiCourses.length} results </h5>
                  </b>
                </Breadcrumb.Item>
              </Breadcrumb>
              <div className={cx("clear-selected")} onClick={handleClearChoice}>
                <button type="button"> Clear Choice </button>
              </div>
            </div>
            <div className={cx("col-3")}>
              <div className={cx("search-enroll-course")}>
                <input
                  type="text"
                  className={cx("input-search")}
                  placeholder="Search courses..."
                  value={searchParams.Query || ""}
                  onChange={handleSearchChange}
                  onKeyDown={handleEnter}
                  ref={inputRef}
                />
                <div className={cx("icon-search")}>
                  <button type="submit" onClick={handleSearchSubmit}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </div>
            <div className={cx("col-3", "dropdown")}>
              <Form>
                <Form.Group controlId="dropdown-filter">
                  <Form.Select
                    value={dropdownValue}
                    onChange={handleDropdownChange}
                    aria-label="Filter by"
                  >
                    <option value={""} disabled>
                      Choose
                    </option>
                    <option value={10}>Latest courses</option>
                    <option value={20}>Oldest courses</option>
                    <option value={30}>Top courses discount</option>
                    <option value={40}>Top courses high rating</option>
                    <option value={50}>Top courses high enrolled</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>

        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-3")}>
              <div className={cx("star")}>
                <h5 className={cx("title-rating")}>Ratings</h5>
                <div className={cx("rating-filter")}>
                  {[1, 2, 3, 4].map((star) => (
                    <div key={star} className={cx("rating-option")}>
                      <label
                        htmlFor={`rating-${star}`}
                        className={cx("rating-label")}
                      >
                        <input
                          type="radio"
                          name="rating"
                          id={`rating-${star}`}
                          value={star}
                          checked={ratingUp === star.toString()}
                          onChange={() => {
                            setRatingUp(star.toString());
                            axiosRatingUp(star);
                          }}
                        />
                        <span className={cx("stars")}>
                          {[...Array(star)].map((_, i) => (
                            <StarIcon key={i} style={{ color: "gold" }} />
                          ))}
                        </span>
                        <span className={cx("label-text")}>
                          {star} stars up
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={cx("video-duration")}>
                <h5 className={cx("title-duration")}>Video Duration</h5>
                {[
                  { label: "0 - 2 hours", value: "0-2" },
                  { label: "2 - 4 hours", value: "2-4" },
                  { label: "4 - 8 hours", value: "4-8" },
                  { label: "8 - 16 hours", value: "8-16" },
                  { label: "16 - 32 hours", value: "16-32" },
                  { label: "32+ hours", value: "32+" },
                ].map((duration) => (
                  <div key={duration.value} className={cx("duration-option")}>
                    <label>
                      <input
                        type="radio"
                        name="duration"
                        value={duration.value}
                        checked={selectedDuration === duration.value}
                        onChange={handleDurationChange}
                      />
                      <span>{duration.label}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className={cx("video-year")}>
                <h5 className={cx("title-year")}>Years</h5>
                {[
                  { label: "2018 - 2019", value: "2018-2019" },
                  { label: "2019 - 2020", value: "2019-2020" },
                  { label: "2020 - 2021", value: "2020-2021" },
                  { label: "2021 - 2022", value: "2021-2022" },
                  { label: "2022 - 2023", value: "2022-2023" },
                  { label: "2024+", value: "2024+" },
                ].map((year) => (
                  <div key={year.value} className={cx("year-option")}>
                    <label>
                      <input
                        type="radio"
                        name="year"
                        value={year.value}
                        checked={selectedYear === year.value}
                        onChange={handleYearChange}
                      />
                      <span>{year.label}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className={cx("topic")}>
                <h5 className={cx("title-topic")}>Topics</h5>
                {topics.length > 0 ? (
                  topics.map((topic) => (
                    <div key={topic.categoryId} className={cx("topic-option")}>
                      <label>
                        <input
                          type="radio"
                          name="topic"
                          value={topic.categoryName}
                          onChange={handleTopicChange}
                        />
                        <span>{topic.categoryName}</span>
                      </label>
                    </div>
                  ))
                ) : (
                  <p>Loading topics...</p>
                )}
              </div>

              <div className={cx("level")}>
                <h5 className={cx("title-level")}>Level</h5>
                {[
                  { label: "Beginner", value: "beginner" },
                  { label: "Intermediate", value: "intermediate" },
                  { label: "Expert", value: "expert" },
                  { label: "All Levels", value: "all" },
                ].map((level) => (
                  <div key={level.value} className={cx("level-option")}>
                    <label>
                      <input
                        type="radio"
                        name="level"
                        value={level.value}
                        checked={selectedLevel === level.value}
                        onChange={handleLevelChange}
                      />
                      <span>{level.label}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className={cx("instructor")}>
                <h5 className={cx("title-instructor")}>Instructor</h5>
                {instructors && instructors.length > 0 ? (
                  instructors.map((instructor) => (
                    <div
                      key={instructor.userName}
                      className={cx("instructor-option")}
                    >
                      <label>
                        <input
                          type="radio"
                          name="instructor"
                          value={instructor.userName}
                          checked={selectedInstructor === instructor.userName}
                          onChange={handleInstructorChange}
                        />
                        <span>{instructor.userName}</span>
                      </label>
                    </div>
                  ))
                ) : (
                  <p>Loading instructor</p>
                )}
              </div>

              <div className={cx("price")}>
                <h5 className={cx("title-price")}>Price</h5>
                <div className={cx("price-slider")}>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={priceValue}
                    onChange={handleRangePrice}
                    className={cx("slider")}
                  />
                  <div className={cx("price-display")}>
                    <span>Price: ${priceValue}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("col-9")}>
              {Array.isArray(currentCourses) &&
                currentCourses.map((course, index) => {
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
                    <div
                      key={course.courseId}
                      className={cx("row", "content-course")}
                    >
                      <div
                        className={cx("col-4", "image-search")}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <a href={`/course-details/${course.courseId}`}>
                          <img
                            src={course.image}
                            alt={`course-${course.courseId}`}
                          />
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

                        {hoveredIndex === index && (
                          <div className={cx("add-to-cart")}>
                            <button
                              onClick={() => fetchAddToCart(course.courseId)}
                            >
                              Add To Cart
                            </button>
                          </div>
                        )}
                      </div>
                      <div className={cx("col-7", "content-image")}>
                        <b>
                          <h5 style={{ fontWeight: 600 }}>
                            {course.courseTitle}
                          </h5>
                        </b>
                        <p>{course.shortDescription}</p>
                        <span style={{ color: "orange" }}>
                          {course.averageStarRating &&
                          course.averageStarRating > 0
                            ? [
                                ...Array(
                                  Math.floor(
                                    Number(course.averageStarRating) || 0
                                  )
                                ),
                              ].map((_, i) => (
                                <FontAwesomeIcon
                                  key={`full-${i}`}
                                  icon={faStar}
                                  style={{ color: "orange" }}
                                />
                              ))
                            : null}
                          {course.averageStarRating % 1 !== 0 && (
                            <FontAwesomeIcon
                              icon={faStarHalfAlt}
                              style={{ color: "orange" }}
                            />
                          )}

                          {[
                            ...Array(5 - Math.ceil(course.averageStarRating)),
                          ].map((_, i) => (
                            <FontAwesomeIcon
                              key={`empty-${i}`}
                              icon={faStar}
                              style={{ color: "#ccc" }}
                            />
                          ))}

                          <span style={{ marginLeft: "5px", color: "#333" }}>
                            (
                            {course.totalStarRating > 0
                              ? course.totalStarRating
                              : 0}
                            )
                          </span>
                        </span>

                        <p>
                          <b>Category</b>:{" "}
                          <i
                            className={cx("text-info-course")}
                            style={{ color: "#ff3158" }}
                          >
                            {course.category.categoryName}
                          </i>
                        </p>
                        <p>
                          <b>Instructor</b>:{" "}
                          <i
                            className={cx("text-info-course")}
                            style={{ color: "#ff3158" }}
                          >
                            {course.userName}
                          </i>
                        </p>
                        <p>
                          <b>Level</b>:{" "}
                          <i
                            className={cx("text-info-course")}
                            style={{ color: "#ff3158" }}
                          >
                            {course.level}
                          </i>
                        </p>

                        <div>
                          <b>Duration: </b>
                          <i
                            className={cx("text-info-course")}
                            style={{ color: "#ff3158" }}
                          >
                            {duration} Minutes
                          </i>
                        </div>
                      </div>

                      <div className={cx("col-1", "discount-price")}>
                        <b>
                          <h5 style={{ fontWeight: 700 }}>{discountPrice}$</h5>
                        </b>
                        <h5>
                          <del>{course.price}$</del>
                        </h5>
                      </div>
                    </div>
                  );
                })}
              <div className={cx("pagination")}>
                <Pagination
                  count={Math.ceil(apiCourses.length / coursesPerPage)}
                  page={currentPage}
                  onClick={smoothScrollToTop}
                  onChange={(event, page) => setCurrentPage(page)}
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("hot-fresh-course")}>
        <div className={cx("container")}>
          <b>
            <h3 className={cx("title")}>Hot and Fresh Courses</h3>
          </b>
          <Slider {...settings}>
            {hotCourse.map((course) => {
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
          </Slider>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
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

export default ViewCourse;
