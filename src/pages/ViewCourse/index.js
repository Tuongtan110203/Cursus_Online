import React, { useEffect, useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "@mui/material/Pagination"; //pagingnation
import Stack from "@mui/material/Stack"; //pagingnation
import course1 from "~/images/course1.jpg"; //import image
import course2 from "~/images/course2.jpg"; //import image
import tuong from "~/images/tuong.jpg";
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
    image: course1,
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
    image: course1,
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
    image: course1,
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
    image: course1,
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
    image: course1,
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
    image: course1,
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
    image: course1,
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
    image: course1,
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
    image: course1,
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
    image: course1,
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
    image: course1,
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
    image: course1,
  },
];

function ViewCourse() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
            <div className={cx("col-9", "breadcrumb-search")}>
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
              </Breadcrumb>
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
            <h3>Hot and Fresh Courses</h3>
          </b>
          <Slider {...settings}>
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
        right: "-14px",
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
        left: "-20px",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
}

export default ViewCourse;
