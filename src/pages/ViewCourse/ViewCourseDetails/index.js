import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ViewCourseDetails.module.scss";
//import image
import student from "~/images/student.png";
import durationtime from "~/images/durationtime.png";
// import Header và Footer
import RelateCourse from "~/pages/ViewCourse/ViewCourseDetails/RelateCourse";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import lessonv1 from "~/images/lessonv1.png";
//import Link
import { Link } from "react-router-dom";
//import tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "~/components/Layout/Header/tippyStyles.module.scss";
import { Breadcrumbs, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@mui/material/Rating";
import {
  faAngleDown,
  faAngleUp,
  faCaretDown,
  faCaretUp,
  faCertificate,
  faChevronRight,
  faCirclePlay,
  faClock,
  faClockRotateLeft,
  faList,
  faQuestionCircle,
  faStar,
  faStarHalfAlt,
  faTriangleExclamation,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
//import avatar
import chapter from "~/images/chapter.png";
import lesson from "~/images/lesson.png";
import quiz from "~/images/quiz.png";
import { useParams } from "react-router-dom"; // import useParams
import CourseApi from "~/API/CourseApi";
import ChapterAPI from "~/API/ChapterAPI";
import { useCart } from "~/Context/CartContext/CartContext";
import CartAPI from "~/API/CartAPI";
import BookMarkAPI from "~/API/BookMarkAPI";
import { useBookmarks } from "~/pages/BookMark/BookmarkContext";
import UserAPI from "~/API/UserAPI";
import FeedBackAPI from "~/API/FeedBackAPI";
import Pagination from "@mui/material/Pagination"; // import pagination
const cx = classNames.bind(styles);

function ViewCourseDetails() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const [totalPages, setTotalPages] = useState(1); // pagination
  const pageSize = 5; // pagination

  const [openSections, setOpenSections] = useState({});
  const [showMoreInstructor, setShowMoreInstructor] = useState(false);
  const [replyTexts, setReplyTexts] = useState({});
  const [rating, setRating] = useState(0);
  const [answer, setAnswer] = useState("");
  const [attachment, setAttachment] = useState(null); // Lưu file đính kèm
  const [comment, setComment] = useState(""); // Lưu bình luận
  const [question, setQuestion] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { courseId } = useParams(); // lấy từ ủrl
  const [data, setData] = useState({}); // get course by id
  const { cartData, setCartData, fetchCart, isLoading } = useCart(); // cart context
  const [courseDiscount, setCourseDiscount] = useState([]); // get course discount by
  const topDiscount = 2;

  //  get feedback by course id
  const getFeedbackByCourseId = async () => {
    try {
      const response = await FeedBackAPI().fetchFeedbackAndReplyByCourseId(
        courseId,
        currentPage,
        pageSize
      );
      setComments(response.items);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getFeedbackByCourseId();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  //  end get feedback by course id

  //top course discount
  useEffect(() => {
    const getTopCourseDiscount = async () => {
      try {
        const response = await CourseApi().getCourseHighRating(topDiscount);
        setCourseDiscount(response);
      } catch (error) {
        console.error(error);
      }
    };
    getTopCourseDiscount();
  }, []);
  // end top course didscount
  const questions = [
    { question: "9 - 3 = ?", answer: "6" },
    { question: "5 + 2 = ?", answer: "7" },
    { question: "10 / 2 = ?", answer: "5" },
    { question: "4 * 2 = ?", answer: "8" },
  ];

  useEffect(() => {
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    setQuestion(randomQuestion);
  }, []);

  const [parentFeedbackId, setParentFeedBackId] = useState("");
  const handleSubmit = async () => {
    const feedbackData = {
      Star: parentFeedbackId ? null : rating,
      Content: comment,
      CourseId: courseId,
      ParentFeedbackId: parentFeedbackId,
    };

    if (!parentFeedbackId && (rating === 0 || comment.trim() === "")) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const feedbackAPI = FeedBackAPI();
      const response = await feedbackAPI.fetchAddFeedBack(
        feedbackData,
        attachment
      );
      console.log("Feedback added successfully:", response);

      setParentFeedBackId(""); // Reset parent ID
      setComment(""); // Reset comment
      setRating(0); // Reset rating nếu cần

      await getFeedbackStar();
      await getCourseById();
      await getFeedbackByCourseId();
    } catch (error) {
      console.error("Error adding feedback:", error);
      if (error.response) {
        console.error("API Response Error:", error.response.data);
      }
      setErrorMessage("There was an error submitting your feedback.");
    }
  };

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const toggleShowMoreInstructor = () => {
    setShowMoreInstructor((prevState) => !prevState);
  };
  const handleClick = (index) => {
    setRating(index);
  };

  // get course by id
  const getCourseById = async () => {
    try {
      const response = await CourseApi().getCourseById(courseId);
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCourseById();
  }, []);

  const renderStars = (CalculateRating) => {
    const fullStars = Math.floor(CalculateRating); // Số sao đầy đủ (màu vàng)
    const halfStar = CalculateRating % 1 !== 0; // Nếu có nửa sao (màu vàng)
    const totalStars = 5; // Tổng số sao luôn cố định là 5

    let stars = [];

    // Thêm các sao đầy đủ (màu vàng)
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`full-${i}`}
          icon={faStar}
          style={{ color: "orange" }}
        />
      );
    }

    // Thêm nửa sao (màu vàng) nếu có
    if (halfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={faStarHalfAlt}
          style={{ color: "orange" }}
        />
      );
    }

    // Thêm các sao trống (màu xám) để tổng cộng là 5 sao
    const emptyStars = totalStars - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStar}
          style={{ color: "gray" }}
        />
      );
    }

    return stars;
  };
  // get total chapter lesson quiz by courseId
  const [chapterLesson, setChapterLesson] = useState({}); // chapter lesson
  const [chapterLessonV2, setChapterLessonV2] = useState([]); // chapter lesson
  const [chapterTitleDescription, setChapterTitleDescription] = useState([]);

  const GetTotalChapterLessonQuizByCourseId = async () => {
    try {
      const response = await ChapterAPI().getTotalChapterLessonQuiz(courseId);
      setChapterLesson(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GetTotalChapterLessonQuizByCourseId();
  }, []);

  useEffect(() => {
    const getAllChapterLessons = async () => {
      try {
        const promises = courseDiscount.map((course) =>
          ChapterAPI().GetChapterLessonByCourseId(course?.courseId)
        );

        const results = await Promise.all(promises);

        const mergedResults = results.flat();

        setChapterLessonV2(mergedResults);
      } catch (error) {
        console.error("Error fetching chapters and lessons:", error);
      }
    };

    if (courseDiscount.length > 0) {
      getAllChapterLessons();
    }
  }, [courseDiscount]);

  const getCourseChapterAndLessonCount = (courseId) => {
    const courseChapters = chapterLessonV2.filter(
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
  // emd chapter
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
  //Book
  const { bookmarkItems, fetchBookmarks } = useBookmarks();
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
  // get user by user name
  const [dataUser, setDataUser] = useState({}); // Lưu dữ liệu từ getUserByUserName
  useEffect(() => {
    if (data && data.userName) {
      const getUserByUserName = async () => {
        try {
          const response = await UserAPI().getUserByUserName(data.userName);
          setDataUser(response);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      getUserByUserName();
    }
  }, [data]);
  // end get user by user name
  ///get chapter title and description
  useEffect(() => {
    const getChapterTitleAndDescription = async () => {
      try {
        const response = await ChapterAPI().getChapterTitleAndDescription(
          courseId
        );
        setChapterTitleDescription(response);
      } catch (error) {
        console.error("Error fetching chapter title and description:", error);
      }
    };
    getChapterTitleAndDescription();
  }, []);
  //end get chapter title and description
  // get feedback star by courseId
  const [feedbackStar, setFeedbackStar] = useState([]); // Khởi tạo feedbackStar là mảng rỗng

  const getFeedbackStar = async () => {
    try {
      const response = await CourseApi().fetchFeedbackStarByCourseId(courseId);

      // Kiểm tra xem phản hồi có phải là đối tượng không
      if (typeof response === "object" && response !== null) {
        // Chuyển đối tượng thành mảng các giá trị (count)
        const starCounts = Object.values(response);
        setFeedbackStar(starCounts);
      } else {
        console.error("Phản hồi không phải là đối tượng:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getFeedbackStar();
  }, [courseId]);
  //feedback
  const [showReplies, setShowReplies] = useState({}); // Track which comments' replies are visible
  const [showReplyInput, setShowReplyInput] = useState({});

  const toggleReplies = (feedbackId) => {
    setShowReplies((prev) => ({
      ...prev,
      [feedbackId]: !prev[feedbackId],
    }));

    if (parentFeedbackId === feedbackId) {
      setParentFeedBackId(""); // Nếu đang mở, đóng lại
    } else {
      setParentFeedBackId(feedbackId); // Gán feedbackId làm ParentFeedbackId
    }
  };
  const toggleReplyInput = (feedbackId) => {
    setShowReplyInput((prevState) => ({
      ...prevState,
      [feedbackId]: !prevState[feedbackId],
    }));

    // Gán ParentFeedbackId khi mở ô Reply, xóa khi đóng
    if (parentFeedbackId === feedbackId) {
      setParentFeedBackId(""); // Nếu đang mở, đóng lại
    } else {
      setParentFeedBackId(feedbackId); // Gán feedbackId làm ParentFeedbackId
    }
  };

  const renderReplies = (replies, parentId) => {
    return (
      <ul className={cx("replies-list")}>
        {replies.map((reply, replyIndex) => (
          <li key={`${parentId}-${replyIndex}`} className={cx("reply-item")}>
            {/* Reply Header */}
            <div className={cx("reply-header")}>
              <div className={cx("avatar-reply")}>
                <img src={reply.avatar} alt="avatar"></img>
                <h5 className={cx("user-name")}>{reply.userName}</h5>
              </div>
              <span className={cx("comment-date")}>
                {new Date(reply.createdDate).toLocaleDateString()}
              </span>
            </div>

            {/* Reply Content */}
            <div className={cx("reply-parent")}>
              <p className={cx("reply-text")}>{reply.content}</p>
              <button
                className={cx("reply-button")}
                onClick={() => toggleReplyInput(reply.feedbackId)}
              >
                {showReplyInput[reply.feedbackId] ? "Cancel Reply" : "Reply"}
              </button>
            </div>

            {/* Nested Replies */}
            {reply.replies && reply.replies.length > 0 && (
              <>
                <button
                  className={cx("toggle-replies")}
                  onClick={() => toggleReplies(reply.feedbackId)}
                >
                  {showReplies[reply.feedbackId]
                    ? `Hide Replies (${reply.replies.length})`
                    : `Show Replies (${reply.replies.length})`}
                </button>

                {showReplies[reply.feedbackId] &&
                  renderReplies(reply.replies, reply.feedbackId)}
              </>
            )}

            {showReplyInput[reply.feedbackId] && (
              <div className={cx("input-comment")}>
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)} // Lấy nội dung nhập
                />
                <button
                  type="button"
                  onClick={() => {
                    setParentFeedBackId(reply.feedbackId);
                    handleSubmit();
                  }}
                >
                  Send
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  //feedback
  return (
    <div>
      <Header />
      <div className={cx("wrapper-course-details")}>
        <div className={cx("course-details-header")}>
          <div className={cx("container")}>
            <div className={cx("row")}>
              <div className={cx("col-8")}>
                <div className={cx("course-detail-title")}>
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    style={{ marginBottom: "15px" }}
                  >
                    <Link underline="hover" color="inherit" to="/">
                      Home
                    </Link>
                    <Link underline="hover" color="inherit" to="/view-course">
                      Courses
                    </Link>
                    <Typography color="white">{data.courseTitle}</Typography>
                  </Breadcrumbs>
                  <h4>{data.courseTitle} </h4>
                  <p>{data.shortDescription}</p>
                  <span style={{ color: "orange" }}>
                    {" "}
                    {data.averageStarRating}{" "}
                  </span>
                  <span style={{ color: "orange" }}>
                    {renderStars(data.averageStarRating)}{" "}
                  </span>
                  &nbsp;
                  <span style={{ color: "#25d9ce" }}>
                    {data.totalStarRating} votes
                  </span>
                  &nbsp;|&nbsp;
                  <b>
                    <span>{data.totalEnrollment} enrollments</span>
                  </b>
                  <div className={cx("row", "mt-2")}>
                    <div className={cx("col-6")}>
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: "white" }}
                      />
                      <span> Instructor</span>
                      <p>{data.userName}</p>
                    </div>
                    <div className={cx("col-6")}>
                      <FontAwesomeIcon
                        icon={faList}
                        style={{ color: "white" }}
                      />
                      <span> Category</span>
                      <p>{data.category?.categoryName || "N/A"}</p>
                    </div>
                  </div>
                  <div className={cx("create-date")}>
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      style={{ color: "white" }}
                    />
                    &nbsp;
                    <span>{data.formattedCreatedDate}</span>
                  </div>
                </div>
              </div>
              <div className={cx("col-4")}></div>
            </div>
          </div>
        </div>
        <div className={cx("container")}>
          <div className="course-details-content">
            <div className={cx("row")}>
              <div className={cx("col-8")}>
                <div className={cx("course-details-video")}>
                  <div className={cx("intro-video")}>
                    <h5>Introduce Video</h5>
                  </div>
                  <div className={cx("video")}>
                    {data.videoDemo ? (
                      <video
                        width="100%"
                        height="400"
                        controls
                        title="Course Demo Video"
                      >
                        <source src={data.videoDemo} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ thẻ video.
                      </video>
                    ) : (
                      "No Video Demo"
                    )}
                  </div>
                </div>
                <div className={cx("details-course-chapter")}>
                  <div className={cx("intro-course")}>
                    <h5>Course Introduction</h5>
                    <p>{data.description}</p>
                    <b>
                      <i>
                        <p>What does the course include?</p>
                      </i>{" "}
                    </b>{" "}
                    {chapterTitleDescription &&
                    chapterTitleDescription.length > 0 ? (
                      chapterTitleDescription.map((chapter, index) => (
                        <div key={index}>
                          <b>
                            <i>
                              <p>{chapter.chapterTitle || "No Chapter"}</p>
                            </i>
                          </b>
                          <p>{chapter.description || "No Lesson"}</p>
                        </div>
                      ))
                    ) : (
                      <p>No chapters available</p>
                    )}
                  </div>
                </div>
                <div className={cx("details-content-couse")}>
                  <h5>Content Course</h5>
                  {chapterTitleDescription.map((chapter, index) => {
                    return (
                      <div
                        key={chapter.chapterId}
                        className={cx("content-course")}
                      >
                        <div
                          onClick={() => toggleSection(`section${index + 1}`)}
                        >
                          <FontAwesomeIcon
                            icon={
                              openSections[`section${index + 1}`]
                                ? faAngleUp
                                : faAngleDown
                            }
                          />
                          <i>
                            <b>
                              <span>
                                {" "}
                                Chapter {index + 1}: {chapter.chapterTitle} (
                                {chapter.lessons.length} Lessons)
                              </span>
                            </b>
                          </i>
                        </div>
                        {openSections[`section${index + 1}`] && (
                          <div className={cx("lesson-list")}>
                            <div className="child-lesson">
                              {chapter.lessons.map((lesson, lessonIndex) => (
                                <div key={lessonIndex} className={cx("lesson")}>
                                  <FontAwesomeIcon icon={faCirclePlay} />
                                  <span>{`Bài giảng ${lessonIndex + 1}: ${
                                    lesson.lessonTitle
                                  }`}</span>
                                </div>
                              ))}
                            </div>
                            <div className="time-lesson">
                              {chapter.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lessonIndex}
                                  className={cx("child-time")}
                                >
                                  <FontAwesomeIcon icon={faClock} />
                                  <span>{lesson.duration} Minutes </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className={cx("info-instructor")}>
                  <h5>Infomation Instructor</h5>
                  <div className={cx("row")}>
                    <div className={cx("col-3")}>
                      <div className={cx("image-avatar")}>
                        <img
                          src={dataUser.avatar}
                          alt="avatar"
                          className={cx("avatar")}
                        />
                      </div>
                    </div>
                    <div className={cx("col-9")}>
                      <div className={cx("content-instructor")}>
                        <b>
                          <span>{dataUser.userName}</span>
                        </b>
                        <p>
                          {dataUser?.userInfo?.personalInfo
                            ? dataUser.userInfo.personalInfo
                            : "No personal information available."}
                        </p>
                        <p>
                          {dataUser?.userInfo?.describeExperience
                            ? dataUser.userInfo.describeExperience
                            : "No personal information available."}
                        </p>
                        <p
                          className={showMoreInstructor ? "" : cx("blur-text")}
                        >
                          {dataUser?.userInfo?.experience
                            ? dataUser.userInfo.experience
                            : "No personal information available."}
                        </p>
                        {showMoreInstructor && (
                          <>
                            <p>
                              {dataUser?.userInfo?.jobDescription
                                ? dataUser.userInfo.jobDescription
                                : "No personal information available."}
                            </p>
                            <div className={cx("view-more")}>
                              <a href={`/view-instructor/${dataUser.userName}`}>
                                View More
                              </a>
                              <FontAwesomeIcon
                                className={cx("icon-view-more")}
                                icon={faChevronRight}
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div className={cx("show-more-less")}>
                        <a onClick={toggleShowMoreInstructor}>
                          {showMoreInstructor ? "Show Less" : "Show More"}
                        </a>
                        {showMoreInstructor && (
                          <FontAwesomeIcon icon={faCaretUp} />
                        )}
                        {!showMoreInstructor && (
                          <FontAwesomeIcon icon={faCaretDown} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={cx("wrapper-rating")}>
                  <b>
                    <h5>Rating</h5>
                  </b>
                  <div className={cx("body-rating")}>
                    <b>
                      <p>Your Review *</p>
                    </b>
                    <div>
                      {[...Array(5)].map((star, index) => {
                        const starIndex = index + 1;
                        return (
                          <span
                            key={index}
                            onClick={() => handleClick(starIndex)}
                          >
                            <FontAwesomeIcon
                              className={cx("star")}
                              icon={faStar}
                              color={
                                starIndex <= rating ? "#ffc107" : "#e4e5e9"
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </span>
                        );
                      })}
                    </div>
                    <div className={cx("comment-rating")}>
                      <b>
                        <p>Your Comment</p>
                      </b>
                      <div className={cx("input-comment")}>
                        <textarea
                          name="input"
                          placeholder="Enter your comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className={cx("comment-rating")}>
                      <b>
                        <p>Your Attachment File</p>
                      </b>
                      <div>
                        <input
                          style={{ marginBottom: "15px" }}
                          type="file"
                          onChange={(event) => {
                            const files = event.target.files;
                            if (files && files.length > 0) {
                              setAttachment(files[0]);
                            }
                          }}
                        ></input>
                      </div>
                    </div>
                    <div className="check-person">
                      <b>
                        <p>Please enter an answer in digits:</p>
                      </b>
                      <b>
                        <p>{question.question}</p>
                      </b>
                      <div className={cx("input-check-person")}>
                        <input
                          type="text"
                          name="input-check-person"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Please enter answer..."
                        />
                      </div>
                      {/* error */}
                      {errorMessage && (
                        <p style={{ color: "red", fontWeight: "bold" }}>
                          {errorMessage}
                        </p>
                      )}
                    </div>
                    <div className={cx("submit-rating")}>
                      <button
                        className={cx("btn btn-primary")}
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                <div className={cx("student-feedback")}>
                  <h2 className={cx("title-feedback")}>Student Feedback</h2>
                  <div className={cx("rating-box")}>
                    <div className={cx("row")}>
                      <div className={cx("col-4")}>
                        <div className={cx("rating-box-left")}>
                          <h2 className={cx("title")}>
                            {data.averageStarRating}/5.0
                          </h2>
                          <span style={{ color: "orange" }}>
                            {renderStars(data.averageStarRating)}{" "}
                          </span>{" "}
                          <p className={cx("total-rating")}>
                            Total {data.totalStarRating} Student Ratings
                          </p>
                        </div>
                      </div>
                      <div className={cx("col-8")}>
                        <div className={cx("rating-box-right")}>
                          <ul className={cx("progress")}>
                            {feedbackStar.map((count, index) => {
                              const percentage = (count / 20) * 100;
                              return (
                                <li key={index}>
                                  <span>
                                    <b>{index + 1} star</b>
                                  </span>
                                  <div className={cx("progress-bar")}>
                                    <div
                                      className={cx("filled")}
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className={cx("vote-count")}>
                                    <b> {count} votes</b>
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={cx("student-comment")}>
                  <h2 className={cx("title-comment")}>Comments</h2>
                  <ul className={cx("comment-list")}>
                    {comments.map((cmt, index) => (
                      <li key={index} className={cx("comment-item")}>
                        {/* Comment Header */}
                        <div className={cx("comment-header")}>
                          <div className={cx("avatar-comment")}>
                            <img src={cmt.avatar} alt="avatar"></img>
                            <h4 className={cx("user-name")}>{cmt.userName}</h4>
                          </div>{" "}
                          <span className={cx("comment-date")}>
                            {new Date(cmt.createdDate).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Comment Body */}
                        <div className={cx("comment-body")}>
                          <Rating
                            name="read-only"
                            value={cmt.star || 0}
                            readOnly
                            className={cx("comment-rating")}
                          />
                          {/* Button to toggle reply input */}
                          <button
                            className={cx("reply-button")}
                            onClick={() => toggleReplyInput(cmt.feedbackId)}
                          >
                            {showReplyInput[cmt.feedbackId]
                              ? "Cancel Reply"
                              : "Reply"}
                          </button>
                        </div>

                        {/* Comment Text */}
                        <div>
                          <p className={cx("comment-text")}>{cmt.content}</p>
                        </div>

                        {/* Replies List */}
                        {cmt.replies && cmt.replies.length > 0 && (
                          <div className={cx("replies-section")}>
                            <button
                              className={cx("toggle-replies")}
                              onClick={() => toggleReplies(cmt.feedbackId)}
                            >
                              {showReplies[cmt.feedbackId]
                                ? `Hide Replies (${cmt.replies.length})`
                                : `Show Replies (${cmt.replies.length})`}
                            </button>

                            {/* Render Nested Replies */}
                            {showReplies[cmt.feedbackId] &&
                              renderReplies(cmt.replies, cmt.feedbackId)}
                          </div>
                        )}

                        {/* Reply Input Field */}
                        {showReplyInput[cmt.feedbackId] && (
                          <div className={cx("input-comment")}>
                            <input
                              type="text"
                              placeholder="Write a reply..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)} // Lấy nội dung nhập
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setParentFeedBackId(cmt.feedbackId); // Gán lại ParentFeedbackId
                                handleSubmit(); // Gọi hàm submit
                              }}
                            >
                              Send
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* Pagination */}
                  <div className={cx("pagination")}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </div>
                </div>

                {/* end student feed */}
              </div>
              <div className={cx("col-4", "sidebar")}>
                <div className={cx("add-course-details")}>
                  <div className={cx("discount")}>
                    <span>
                      <b>Old price: </b>{" "}
                      <strike className={cx("color-price")}>
                        {data.price} USD
                      </strike>
                    </span>
                  </div>
                  <div className={cx("price")}>
                    <b>New Price: </b>
                    <span className={cx("color-price")}>
                      {data.newPrice} USD
                    </span>
                  </div>
                  <div className={cx("button-add")}>
                    <button
                      onClick={() => fetchAddToCart(data.courseId)}
                      type="button"
                    >
                      Add To Cart
                    </button>
                  </div>
                  <div className={cx("time-add")}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>
                      Duration: <b>{chapterLesson.totalDuration}</b>
                    </span>
                  </div>
                  <div className={cx("sylabus-add")}>
                    <FontAwesomeIcon icon={faCirclePlay} />
                    <span>
                      Sylabus: <b>{chapterLesson.totalDuration}</b>
                    </span>
                  </div>
                  <div className={cx("chapter-add")}>
                    <img src={chapter} alt="chapter" />
                    <span>
                      Chapter: <b>{chapterLesson.totalChapter} Chapter</b>
                    </span>
                  </div>
                  <div className={cx("lesson-add")}>
                    <img src={lesson} alt="lesson" />
                    <span>
                      Lesson: <b>{chapterLesson.totalLesson} Lesson</b>
                    </span>
                  </div>
                  <div className={cx("quizz-add")}>
                    <img src={quiz} alt="quizz" />
                    <span>
                      Quizz:{" "}
                      <b>
                        {chapterLesson.totalQuizz > 0
                          ? chapterLesson.totalQuizz
                          : 0}{" "}
                        Quiz
                      </b>
                    </span>
                  </div>

                  <div className={cx("time-add")}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    <b>
                      <span>Own a lifetime course</span>
                    </b>{" "}
                  </div>
                  <div className={cx("benefits")}>
                    <FontAwesomeIcon icon={faCertificate} />
                    <b>
                      <span>Receive a course completion certificate</span>
                    </b>{" "}
                  </div>
                  <div className={cx("benefits")}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    <b>
                      <span>Direct support from instructors</span>
                    </b>{" "}
                  </div>
                  {/* DiscountCourse */}
                  <div className={cx("discount-course")}>
                    <div className={cx("discount-title")}>
                      <h3>Top discount courses</h3>
                    </div>
                    {courseDiscount.map((course) => {
                      const isBookmarked = bookmarkItems.some(
                        (item) => item.course.courseId === course.courseId
                      );
                      const { chapterCount, lessonCount, duration } =
                        getCourseChapterAndLessonCount(course.courseId);

                      return (
                        <div key={course.courseId} className={cx("col-12")}>
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
                            <Tippy
                              content="Lượt đánh giá"
                              arrow={true}
                              theme="custom"
                            >
                              <div className={cx("rating-icon")}>
                                <FontAwesomeIcon icon={faStar} />
                                {course.averageStarRating}
                              </div>
                            </Tippy>
                            <a
                              href={`/search?query=${course.category.categoryName}`}
                              className={cx("category")}
                            >
                              {course.category?.categoryName || "N/A"}
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
                                  <p className={cx("old-price")}>
                                    ${course.price}
                                  </p>
                                  <p className={cx("new-price")}>
                                    ${course.newPrice}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* End discountCourse */}
                </div>
              </div>
              <div className={cx("wrapper-relate-course")}>
                <RelateCourse categoryName={data.category?.categoryName} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewCourseDetails;
