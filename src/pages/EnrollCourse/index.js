import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./EnrollCourse.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faClock,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap"; // Import Form from react-bootstrap
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "~/components/Layout/Header/tippyStyles.module.scss";
import course1 from "~/images/course1.jpg";
import Pagination from "@mui/material/Pagination";
import Rating from "@mui/material/Rating"; //raring
import StarIcon from "@mui/icons-material/Star"; //import star icon
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const cx = classNames.bind(styles);

function EnrollCourse() {
  const [dropdownValues, setDropdownValues] = useState({
    dropdown1: "",
    dropdown2: "",
    dropdown3: "",
    dropdown4: "",
  });
  const [valueStarDisplay, setValueStarDisplay] = useState(0);
  const [rating, setRating] = useState(false);
  const ratingRef = useRef(null);
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [comment, setComment] = useState("");
  const [courses, setCourses] = useState([
    {
      id: 1,
      image: course1,
      title: ".NET 8 Backend Bootcamp",
      instructor: "Nguyen Tan Tuong",
      progress: "70% completed",
    },
    {
      id: 2,
      image: course1,
      title: "React Development Bootcamp",
      instructor: "Jane Doe",
      progress: "45% completed",
    },
    {
      id: 3,
      image: course1,
      title: "React Development Bootcamp",
      instructor: "Jane Doe 1",
      progress: "35% completed",
    },
    {
      id: 4,
      image: course1,
      title: "React Development Bootcamp",
      instructor: "Jane Doe 1",
      progress: "55% completed",
    },
    {
      id: 5,
      image: course1,
      title: "React Development Bootcamp",
      instructor: "Jane Doe 1",
      progress: "11% completed",
    },
  ]);
  useEffect(() => {
    const savedComment = localStorage.getItem("comment");
    if (savedComment) {
      setComment(savedComment);
    }
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    localStorage.setItem("comment", event.target.value);
  };
  const handleDropdownChange = (dropdownKey) => (event) => {
    setDropdownValues({
      ...dropdownValues,
      [dropdownKey]: event.target.value,
    });
  };

  const handleRatingChange = () => {
    setRating(!rating);
    setShowThankYou(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ratingRef.current && !ratingRef.current.contains(event.target)) {
        setRating(false);
        setShowThankYou(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleReset = () => {
    setDropdownValues({
      dropdown1: "",
      dropdown2: "",
      dropdown3: "",
      dropdown4: "",
    });
  };
  //icon star
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const handleSend = () => {
    setValueStarDisplay(value);
    setShowThankYou(true);
  };
  const handleSaveAndExit = () => {
    setRating(false);
    setShowThankYou(false);
  };
  const handleDeleteRating = () => {
    setShowDeleteConfirm(true);
  };
  const confirmDeleteRating = () => {
    setValueStarDisplay(0);
    setValue(0);
    setShowThankYou(false);
    setShowDeleteConfirm(false);
    setRating(false);
    setComment("");
    localStorage.removeItem("comment");
  };

  const cancelDeleteRating = () => {
    setRating(true);
    setShowDeleteConfirm(false);
  };
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  //end icon star
  return (
    <section className={cx("wrapper-section")}>
      <header>
        <Header />
      </header>
      <section className={cx("section-intro-enroll-course")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-12")}>
              <h1>My Enrolled Courses</h1>
              <h5>
                111hr | 35min watched {""}
                <Tippy
                  content="Total time spent watching video lectures or 
                  attempting practice tests in the past year."
                >
                  <FontAwesomeIcon icon={faClock} />
                </Tippy>
              </h5>
            </div>
          </div>
        </div>
      </section>
      <section className={cx("section-filter-enroll-course")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-2")}>
              <label htmlFor="dropdown-filter1">Sort by</label>
              <Form>
                <Form.Group controlId="dropdown-filter1">
                  <Form.Select
                    value={dropdownValues.dropdown1}
                    onChange={handleDropdownChange("dropdown1")}
                    aria-label="Sort by"
                  >
                    <option value={10}>Sort by 1</option>
                    <option value={20}>Sort by 2</option>
                    <option value={30}>Sort by 3</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
            <div className={cx("col-2")}>
              <label htmlFor="dropdown-filter2">Filter</label>
              <Form>
                <Form.Group controlId="dropdown-filter2">
                  <Form.Select
                    value={dropdownValues.dropdown2}
                    onChange={handleDropdownChange("dropdown2")}
                    aria-label="Filter"
                  >
                    <option value={10}>Filter 1</option>
                    <option value={20}>Filter 2</option>
                    <option value={30}>Filter 3</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
            <div className={cx("col-2")}>
              <label htmlFor="dropdown-filter3">Status</label>
              <Form>
                <Form.Group controlId="dropdown-filter3">
                  <Form.Select
                    value={dropdownValues.dropdown3}
                    onChange={handleDropdownChange("dropdown3")}
                    aria-label="Status"
                  >
                    <option value={10}>In progress</option>
                    <option value={20}>Success</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
            <div className={cx("col-2")}>
              <label htmlFor="dropdown-filter4">Instructor</label>
              <Form>
                <Form.Group controlId="dropdown-filter4">
                  <Form.Select
                    value={dropdownValues.dropdown4}
                    onChange={handleDropdownChange("dropdown4")}
                    aria-label="Instructor"
                  >
                    <option value={10}>Nguyễn Văn A</option>
                    <option value={20}>Nguyễn Văn B</option>
                    <option value={30}>Nguyễn Văn C</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
            <div className={cx("col-1")}>
              <button
                type="button"
                className={cx("button-reset")}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
            <div className={cx("col-3")}>
              <div className={cx("search-enroll-course")}>
                <label>Search</label>
                <input type="text" className={cx("input-search")} />
              </div>
              <div className={cx("icon-search")}>
                <button type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={cx("section-list-enroll-course")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            {courses.map((course) => (
              <div key={course.id} className={cx("col-3")}>
                <div className={cx("enroll-course")}>
                  <img src={course.image} alt={course.title} />
                  <div className={cx("play-icon")}>
                    <FontAwesomeIcon icon={faCirclePlay} />
                  </div>
                  <span>{course.title}</span>
                  <p>{course.instructor}</p>
                  <div className={cx("progress-bar")}>
                    <div className={cx("progress")}></div>
                  </div>
                  <span className={cx("progress-text")}></span>
                </div>
                <div className={cx("rating")}>
                  <button onClick={handleRatingChange}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={0}
                      precision={0.5}
                      value={valueStarDisplay}
                      readOnly
                    />
                  </button>
                </div>
              </div>
            ))}
            {rating && (
              <>
                <div className={cx("blur-overlay")} />
                <div className={cx("content-rating")} ref={ratingRef}>
                  {showDeleteConfirm ? (
                    <div className={cx("delete-confirmation")}>
                      <h3 style={{ color: "#5022c3", fontWeight: "bold" }}>
                        Are you sure you want to delete your rating?
                      </h3>
                      <div className={cx("delete-confirm-buttons")}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={confirmDeleteRating}
                        >
                          Yes, Delete
                        </Button>
                        <Button variant="outlined" onClick={cancelDeleteRating}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {showThankYou ? (
                        <div>
                          <h3 style={{ color: "#5022c3", fontWeight: "bold" }}>
                            Thank You for Your Feedback!
                          </h3>
                          <p>Your rating and comments have been submitted.</p>
                          <Button
                            variant="contained"
                            onClick={handleSaveAndExit}
                          >
                            Save and Exit
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h3 style={{ color: "#5022c3", fontWeight: "bold" }}>
                            How would you rate this course?
                          </h3>
                          {value === 0 ? (
                            <h5
                              style={{ color: "#5022c3", fontWeight: "bold" }}
                            >
                              Select Rating
                            </h5>
                          ) : (
                            <Box
                              sx={{ ml: 2 }}
                              style={{
                                color: "#5022c3",
                                fontWeight: "bold",
                                marginRight: "25px",
                              }}
                            >
                              {labels[hover !== -1 ? hover : value]}
                            </Box>
                          )}
                          <div className={cx("rating-star")}>
                            <Box
                              sx={{
                                width: 200,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Rating
                                name="hover-feedback"
                                value={value}
                                precision={0.5}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                  setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                  setHover(newHover);
                                }}
                                emptyIcon={
                                  <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                  />
                                }
                                sx={{ fontSize: 60 }}
                              />
                            </Box>
                          </div>
                          <div className={cx("comment-rating")}>
                            <textarea
                              value={comment}
                              onChange={handleCommentChange}
                              placeholder="Tell us your own personal experience with this course. Was it a good match for you?"
                            />
                            <div className={cx("button-send-delete")}>
                              <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={handleSend}
                              >
                                Send
                              </Button>
                              <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteRating}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section className={cx("pagination-enroll-course")}>
        <Pagination count={10} color="primary" />
      </section>
      <footer>
        <Footer />
      </footer>
    </section>
  );
}

export default EnrollCourse;
