import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./SearchPage.module.scss";
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
import Pagination from "@mui/material/Pagination"; //pagingnation
import Stack from "@mui/material/Stack"; //pagingnation
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

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "slick-carousel/slick/slick.css"; //carousel
import "slick-carousel/slick/slick-theme.css"; //carousel
import Slider from "react-slick"; //carousel
const cx = classNames.bind(styles);

const courseData = [
  {
    title: "AI For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course10,
  },
  {
    title: "AI For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course11,
  },
  {
    title: "AI For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course12,
  },
  {
    title: "AI For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course13,
  },
  {
    title: "AI For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course14,
  },
  {
    title: "AI For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course15,
  },
  {
    title: "AI For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course11,
  },
  {
    title: "AI2 For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course12,
  },
  {
    title: "AI2 For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course13,
  },
  {
    title: "AI2 For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course14,
  },
  {
    title: "AI2 For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course15,
  },
  {
    title: "AI2 For Developers With GitHub Copilot, Cursor AI & ChatGPT",
    description:
      "Leverage AI to boost your productivity as a developer: Use GitHub Copilot, Cursor AI and ChatGPT for efficient coding",
    rating: 4.5,
    duration: "113 hours",
    price: 100,
    originalPrice: 250,
    instructor: "Nguyen Tan Tuong",
    image: course11,
  },
];

function SearchPage() {
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

  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const location = useLocation();
  const [priceValue, setPriceValue] = useState(500);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query");
  };

  useEffect(() => {
    const query = getQueryParams();
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const displayedCourses = courseData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                    <h5>
                      43 results for{" "}
                      <i>
                        <b>"{searchQuery}"</b>
                      </i>
                    </h5>
                  </b>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className={cx("col-3")}>
              <div className={cx("search-enroll-course")}>
                <input type="text" className={cx("input-search")} />
              </div>
              <div className={cx("icon-search")}>
                <button type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
            <div className={cx("col-3")}>
              <Form>
                <Form.Group controlId="dropdown-filter">
                  <Form.Select
                    value={dropdownValue}
                    onChange={handleDropdownChange}
                    aria-label="Lọc theo"
                  >
                    <option value={10}>Choice 1</option>
                    <option value={20}>Choice 2</option>
                    <option value={30}>Choice 3</option>
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
                  {[1, 2, 3, 4, 5].map((star) => (
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
                          checked={dropdownValue === star.toString()}
                          onChange={() => setDropdownValue(star.toString())}
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
                      <input type="checkbox" value={duration.value} />
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
                      <input type="checkbox" value={year.value} />
                      <span>{year.label}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className={cx("topic")}>
                <h5 className={cx("title-topic")}>Topics</h5>
                {[
                  { label: "C#", value: "C#" },
                  { label: "Java", value: "Java" },
                  { label: "Python", value: "Python" },
                  { label: ".Net", value: ".Net" },
                  { label: "AWS", value: "AWS" },
                  { label: "Java Swing", value: "Java Swing" },
                ].map((topic) => (
                  <div key={topic.value} className={cx("topic-option")}>
                    <label>
                      <input type="radio" name="topic" value={topic.value} />
                      <span>{topic.label}</span>
                    </label>
                  </div>
                ))}
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
                      <input type="radio" name="level" value={level.value} />
                      <span>{level.label}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className={cx("instructor")}>
                <h5 className={cx("title-instructor")}>Instructor</h5>
                {[
                  { label: "Nguyen Van A", value: "nguyen van a" },
                  { label: "Nguyen Van B", value: "nguyen van b" },
                  { label: "Nguyen Van C", value: "nguyen van c" },
                  { label: "Nguyen Van D", value: "nguyen van d" },
                ].map((instructor) => (
                  <div
                    key={instructor.value}
                    className={cx("instructor-option")}
                  >
                    <label>
                      <input
                        type="radio"
                        name="instructor"
                        value={instructor.value}
                      />
                      <span>{instructor.label}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className={cx("price")}>
                <h5 className={cx("title-price")}>Price</h5>
                <div className={cx("price-slider")}>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)}
                    className={cx("slider")}
                  />
                  <div className={cx("price-display")}>
                    <span>Price: ${priceValue}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("col-9")}>
              {displayedCourses.map((course, index) => (
                <div key={index} className={cx("row", "content-course")}>
                  <div
                    className={cx("col-4", "image-search")}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <a href="/course-details">
                      <img src={course.image} alt={`course-${index}`} />
                    </a>
                    {hoveredIndex === index && (
                      <a href="/add-to-cart">
                        <div className={cx("add-to-cart")}>
                          <button>Add To Cart</button>
                        </div>
                      </a>
                    )}
                  </div>
                  <div className={cx("col-7", "content-image")}>
                    <b>
                      <h5 style={{ fontWeight: 600 }}>{course.title}</h5>
                    </b>
                    <p>{course.description}</p>
                    <span style={{ color: "orange" }}>
                      {course.rating} &nbsp;
                      {[...Array(Math.floor(course.rating))].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          style={{ color: "orange" }}
                        />
                      ))}
                      {course.rating % 1 !== 0 && (
                        <FontAwesomeIcon
                          icon={faStarHalfAlt}
                          style={{ color: "orange" }}
                        />
                      )}
                    </span>
                    <p>
                      <b>Instructor</b>: <i>{course.instructor}</i>
                    </p>
                    <p>
                      <b>Duration</b>: <i>{course.duration}</i>
                    </p>
                  </div>
                  <div className={cx("col-1")}>
                    <b>
                      <h5 style={{ fontWeight: 700 }}>{course.price}$</h5>
                    </b>
                    <h5>
                      <del>{course.originalPrice}$</del>
                    </h5>
                  </div>
                </div>
              ))}
              <div>
                <Stack spacing={2}>
                  <Pagination
                    className={cx("pagination")}
                    count={Math.ceil(courseData.length / itemsPerPage)}
                    color="primary"
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </Stack>
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

export default SearchPage;
