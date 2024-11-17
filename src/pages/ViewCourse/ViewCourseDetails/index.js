import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ViewCourseDetails.module.scss";
//import image
import course10 from "~/images/course10.jpg";
import course11 from "~/images/course11.jpg";
import course12 from "~/images/course12.jpg";
import course13 from "~/images/course13.jpg";
import tuong from "~/images/tuong.jpg";
import avatar from "~/images/avatar.png";
import anonymous from "~/images/anonymous.png";
import lessonv1 from "~/images/lessonv1.png";
import student from "~/images/student.png";
import durationtime from "~/images/durationtime.png";
// import Header và Footer
import RelateCourse from "~/pages/ViewCourse/ViewCourseDetails/RelateCourse";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
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

const cx = classNames.bind(styles);

function ViewCourseDetails() {
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
        name: "Tan Tuong",
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
  ]);
  const [comments, setComments] = useState([
    {
      userName: "John Doe",
      date: "2024-11-14T12:00:00Z",
      rating: 5,
      text: "This course was amazing! The instructor explained everything clearly.",
      replies: [],
    },
    {
      userName: "Jane Smith",
      date: "2024-11-12T10:30:00Z",
      rating: 4,
      text: "Good course but I think the examples could be more detailed.",
      replies: [
        {
          userName: "Instructor",
          date: "2024-11-13T11:00:00Z",
          text: "Thank you for the feedback, Jane! I'll add more examples in the future.",
        },
      ],
    },
  ]);

  const [openSections, setOpenSections] = useState({
    section1: false,
    section2: false,
    section3: false,
  });
  const [value, setValue] = useState(4.5);
  const ratingCounts = [10, 5, 2, 1, 3];

  const [showMoreInstructor, setShowMoreInstructor] = useState(false);
  const [replyTexts, setReplyTexts] = useState({});
  const [rating, setRating] = useState(0);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const questions = [
    { question: "9 - 3 = ?", answer: "6" },
    { question: "5 + 2 = ?", answer: "7" },
    { question: "10 / 2 = ?", answer: "5" },
    { question: "4 * 2 = ?", answer: "8" },
  ];

  const handleReplyChange = (e, index) => {
    setReplyTexts({
      ...replyTexts,
      [index]: e.target.value,
    });
  };
  const handleReply = (index) => {
    const replyText = replyTexts[index]?.trim();
    if (!replyText) return;

    const updatedComments = [...comments];
    updatedComments[index].replies.push({
      userName: "You",
      date: new Date().toISOString(),
      text: replyText,
    });

    setComments(updatedComments);
    setReplyTexts({
      ...replyTexts,
      [index]: "",
    });
  };

  useEffect(() => {
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    setQuestion(randomQuestion);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer) {
      setErrorMessage("Please enter an answer.");
    } else if (answer === question.answer) {
      setErrorMessage("");
      alert("Submitted successfully!");
    } else {
      setErrorMessage("Incorrect answer, please try again.");
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
  return (
    <div>
      <Header />
      <div className={cx("wrapper-course-details")}>
        <div className={cx("course-details-header")}>
          <div className={cx("container")}>
            <div className={cx("row")}>
              <div className={cx("col-8")}>
                <div className={cx("course-detail-title")}>
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/">
                      Home
                    </Link>
                    <Link underline="hover" color="inherit" to="/view-course">
                      Courses
                    </Link>
                    <Typography color="white">
                      Build an automatic money making machine on Shopee 2020
                    </Typography>
                  </Breadcrumbs>
                  <h4>
                    Build an automatic money making machine on Shopee 2020
                  </h4>
                  <p>
                    Instructions for setting up a perfect live stream. Secrets
                    to closing deals quickly and effectively to increase sales
                    revenue by 5-10 times without spending any advertising costs
                  </p>
                  <span style={{ color: "orange" }}>
                    4.5 &nbsp;
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "orange" }}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "orange" }}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "orange" }}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "orange" }}
                    />
                    <FontAwesomeIcon
                      icon={faStarHalfAlt}
                      style={{ color: "orange" }}
                    />
                  </span>
                  &nbsp;
                  <span style={{ color: "black" }}>(3999 ratings)</span>&nbsp;
                  <span>(39999)</span>
                  <div className={cx("row", "mt-2")}>
                    <div className={cx("col-6")}>
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: "white" }}
                      />
                      <span> Instructor</span>
                      <p>Nguyen Tan Tuong</p>
                    </div>
                    <div className={cx("col-6")}>
                      <FontAwesomeIcon
                        icon={faList}
                        style={{ color: "white" }}
                      />
                      <span> Category</span>
                      <p>Parenting</p>
                    </div>
                  </div>
                  <div className={cx("create-date")}>
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      style={{ color: "white" }}
                    />
                    &nbsp;
                    <span>Create Date 2024/10/17</span>
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
                    <iframe
                      width="100%"
                      height="400"
                      src="https://www.youtube.com/embed/gKGITHG8dYs"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className={cx("details-course-chapter")}>
                  <div className={cx("intro-course")}>
                    <h5>Course Introduction</h5>
                    <p>
                      Bán hàng online ngày càng phổ biến hiện nay, nhưng càng có
                      nhiều người bán thì thị trường cạnh tranh lại càng cao.
                    </p>
                    <p>
                      Một cách thức tiếp cận khách hàng tốt nhất của việc bán
                      hàng onlie là livestream trên các trang mạng xã hội, đặc
                      biệt là facebook. Nhưng không phải ai cũng biết cách vận
                      dụng livestream một cách hiệu quả.
                    </p>
                    <p>
                      Để học bán hàng online hiệu quả từ việc livestream chúng
                      ta phải có được những kiến thức cần thiết, khoa học để
                      tiếp cận cũng như thu hút khách hàng vào sản phẩm kinh
                      doanh của mình.
                    </p>
                    <p>
                      Khóa học thực chiến tại nhà
                      <b>“Sát thủ bán hàng Livestream”</b>
                      do thầy Phạm Thành Long giảng dạy sẽ giúp bạn có được
                      những kiến thức, kỹ năng cần thiết và bí quyết hiệu quả
                      nhất để bạn có doanh thu vượt bậc từ việc livestream của
                      mình.
                    </p>
                    <p>Khóa học gồm những nội dung gì?</p>
                    <b>
                      <i>
                        <p>
                          Phần 1: Tổng hợp các yếu tố tiếp cận khách hàng khi
                          livestream
                        </p>
                      </i>
                    </b>
                    <p>
                      Những yếu tố khi livestream bạn phải lưu ý đẻ có thể tiếp
                      cận được tới khách hàng của mình: cách để tạo nên bức ảnh
                      đẹp, các bước chuẩn bị để livestream hiệu quả nhất…
                    </p>
                    <b>
                      <i>
                        <p>
                          Phần 2: Những điều cần lưu ý để livestream hấp dẫn
                        </p>
                      </i>
                    </b>
                    <p>
                      Chia sẻ cho bạn: 7 mục tiêu marketing trước khi livestream
                      để bạn có thể bán được hàng tốt nhất có thể, mẹo để có thể
                      thu hút được lượt xem, lượt share trên Facebook, chiến
                      lược và bí kíp sử dụng clip khi làm việc với người có ảnh
                      hưởng…
                    </p>
                    <b>
                      <i>
                        <p>Phần 3: Những mẹo cần thiết khi livestream</p>
                      </i>
                    </b>
                    <p>
                      Bí quyết để bạn luôn tự tin và thoải mái khi tiến hàng
                      livestream bán hàng, cùng với đó là những chia sẻ về các
                      kênh mạng xã hội mà bạn không nên bỏ lỡ khi livestream bán
                      hàng.
                    </p>
                    <b>
                      <i>
                        <p>
                          Phần 4: Để biến livestream thành một siêu phẩm tăng
                          doanh thu của bạn
                        </p>
                      </i>
                    </b>
                    <p>
                      Những yếu tố kỹ thuật để bạn có thể livestream hiệu quả
                      nhất, cách để lên kịch bản bán hàng, nội dung ý tưởng
                      trúng tâm lý khách hàng khi livestream, mẹo để “bắt trend”
                      hiệu quả hỗ trợ tích cực công việc livestream bán hàng, bí
                      quyết để có được Module nội dung thu hút, hoàn chỉnh…
                    </p>
                    <p>
                      Có quá nhiều kiến thức dành cho bạn học chiến lược kinh
                      doanh gói gọn trong một khóa học! Nhanh chóng tham gia
                      ngay khóa học <b>“Sát thủ bán hàng Livestream”</b> của
                      thầy{" "}
                      <span style={{ color: "orange" }}>Phạm Thành Long</span>{" "}
                      để trở thành Sát thủ bán hàng Livestream với các tuyệt
                      chiêu biến livestream thành một Siêu phẩm để tăng doanh
                      thu hoàn hảo nhất!
                    </p>
                  </div>
                </div>
                <div className={cx("details-content-couse")}>
                  <h5>Content Course</h5>
                  <div
                    className={cx("content-course")}
                    onClick={() => toggleSection("section1")}
                  >
                    <FontAwesomeIcon
                      icon={openSections.section1 ? faAngleUp : faAngleDown}
                    />
                    <i>
                      <b>
                        <span> Phần 1: Tổng quan (2 bài giảng)</span>
                      </b>
                    </i>
                  </div>
                  {openSections.section1 && (
                    <div className={cx("lesson-list")}>
                      <div className="child-lesson">
                        <div>
                          <FontAwesomeIcon icon={faCirclePlay} />
                          <span>Bài giảng 1: Giới thiệu về kinh doanh</span>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faCirclePlay} />
                          <span>Bài giảng 2: Chiến lược tiếp thị hiệu quả</span>
                        </div>
                      </div>
                      <div className="time-lesson">
                        <div className={cx("child-time")}>
                          <FontAwesomeIcon icon={faClock} />
                          <span>06:09</span>
                        </div>
                        <div className={cx("child-time")}>
                          <FontAwesomeIcon icon={faClock} />
                          <span>06:09</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className={cx("content-course")}
                    onClick={() => toggleSection("section2")}
                  >
                    <FontAwesomeIcon
                      icon={openSections.section2 ? faAngleUp : faAngleDown}
                    />
                    <i>
                      <b>
                        <span> Phần 2: Tổng quan (2 bài giảng)</span>
                      </b>
                    </i>
                  </div>
                  {openSections.section2 && (
                    <div className={cx("lesson-list")}>
                      <div className="child-lesson">
                        <div>
                          <FontAwesomeIcon icon={faCirclePlay} />
                          <span>Bài giảng 1: Giới thiệu về kinh doanh</span>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faCirclePlay} />
                          <span>Bài giảng 2: Chiến lược tiếp thị hiệu quả</span>
                        </div>
                      </div>
                      <div className="time-lesson">
                        <div className={cx("child-time")}>
                          <FontAwesomeIcon icon={faClock} />
                          <span>07:09</span>
                        </div>
                        <div className={cx("child-time")}>
                          <FontAwesomeIcon icon={faClock} />
                          <span>07:09</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={cx("info-instructor")}>
                  <h5>Infomation Instructor</h5>
                  <div className={cx("row")}>
                    <div className={cx("col-3")}>
                      <div className={cx("image-avatar")}>
                        <img
                          src={tuong}
                          alt="avatar"
                          className={cx("avatar")}
                        />
                      </div>
                    </div>
                    <div className={cx("col-9")}>
                      <div className={cx("content-instructor")}>
                        <b>
                          <span>Nguyen Tan Tuong</span>
                        </b>
                        <p>
                          Khởi đầu từ 2 bàn tay trắng và gầy gò, năm 1988, ba
                          bán hàng tạp hóa ở chợ, còn mẹ tui xoay sở tự học cắt
                          may ở nhà, khi tiệm may có chút uy tín, mẹ mở thêm lớp
                          dạy cắt may. Một đứa bé gái 8 tuổi là tui năm ấy, quan
                          sát mẹ làm suốt rồi cũng chấp chới chân đạp máy may
                          được 1 chiếc áo 3 lỗ cho đứa em.
                        </p>
                        <p>
                          Được vài năm thì mẹ chuyển sang kinh doanh dịch vụ
                          ‘cho thuê bàn ghế, bát đĩa, phông bạt..’ phục vụ các
                          đám hiếu/hỉ/sự kiện. Sau 5-6 năm ăn nên làm ra nhờ
                          nghề này, mẹ lại ‘nâng cấp’ mô hình lên 1 tầm mới,
                          chuyển sang bán các mặt hàng đồ gia dụng cao cấp.
                        </p>
                        <p
                          className={showMoreInstructor ? "" : cx("blur-text")}
                        >
                          Dù làm công việc gì, mẹ luôn tìm tòi học hỏi để tạo sự
                          khác biệt cho riêng mình.
                        </p>
                        {showMoreInstructor && (
                          <>
                            <p>
                              Mẹ khởi nghiệp lại từ đầu ở lứa tuổi xấp xỉ 60.
                              Sẵn niềm đam mê ẩm thực sạch từ lâu, mẹ là người
                              rất tinh tế và khắt khe trong việc lựa chọn những
                              thứ tươi, ngon, tự nhiên, và có nguồn gốc, xuất xứ
                              rõ ràng. Từ những năm 90s, mẹ đã ‘nói không’ với
                              gà công nghiệp, mãi sau này tui thỉnh thoảng lén
                              mẹ ăn KFC, mới biết mùi vị của chúng :D. Mẹ cũng
                              rất nhiều lần không hài lòng khi chúng tôi sa vào
                              những quán vỉa hè. Chúng tui mờ mắt bởi mùi thơm,
                              chỉ có mẹ nhìn ra những chất phụ gia, thực phẩm
                              bẩn…Đến tận bây giờ, mẹ vẫn là nhà tài trợ thực
                              phẩm sạch cho chị em chúng tui mỗi tháng.
                            </p>
                            <p>
                              Nhận thấy yến sào là mặt hàng thực sự hữu ích cho
                              những người sức khỏe yếu, cần được bồi bổ tăng
                              sinh lực, đề kháng, mẹ lặn lội vô Sài Gòn (Cần
                              Giờ), xuống Tiền Giang (Gò Công) để tìm kiếm cơ
                              hội hợp tác với các nhà nuôi yến nhằm đảm bảo được
                              ‘nguồn gốc’ hàng hóa rõ ràng và đáng tin cậy.
                            </p>
                            <p>
                              Những thứ mẹ bán, là những thứ mẹ đã tìm hiểu rất
                              kỹ, rất có chiều sâu; là những thứ mà cả gia đình
                              tui đều được thưởng thức thường xuyên. Phương châm
                              kinh doanh của mẹ 30 năm nay luôn là “Ăn thật, làm
                              thật”. Nếu có dịp ghé thăm cửa hàng yến sào Hảo
                              Thư (38A Quang Trung, Tp Hải Dương), dù bạn có mua
                              hàng hay không thì luôn được tiếp đón niềm nở. Mẹ
                              cầm tinh con chuột, trong nhà luôn chứa đầy thực
                              phẩm, hoa quả theo mùa, bánh kẹo các loại. Chắc
                              chắn, mẹ sẽ gọt hoa quả nhiệt tình mời khách, rót
                              nước pha trà…biết đâu chừng, mẹ còn mời cả yến
                              chưng cũng nên. Có vị khách đến cửa hàng, gặp mẹ
                              thân tình hỏi mua yến sào và xúc động kể lại câu
                              chuyện về bát yến chưng mà mẹ đã mời cô ấy 1 năm
                              trước, cô ấy thực sự xúc động vì đó là lần đầu
                              tiên được biết thế nào là yến sào.
                            </p>
                            <div className={cx("view-more")}>
                              <a href="view-instructor">View More</a>
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
                    <h5>Rating (0)</h5>
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
                        />
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
                          <h2 className={cx("title")}>4.5/5.0</h2>
                          <Rating name="read-only" value={value} readOnly />
                          <p className={cx("total-rating")}>
                            Total 3 Student Ratings
                          </p>
                        </div>
                      </div>
                      <div className={cx("col-8")}>
                        <div className={cx("rating-box-right")}>
                          <ul className={cx("progress")}>
                            {ratingCounts.map((count, index) => {
                              const percentage = (count / 20) * 100;
                              return (
                                <li key={index}>
                                  <span>
                                    <b>{5 - index} stars</b>
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
                    {comments.map((comment, index) => (
                      <li key={index} className={cx("comment-item")}>
                        <div className={cx("comment-header")}>
                          <h4 className={cx("user-name")}>
                            {comment.userName}
                          </h4>
                          <span className={cx("comment-date")}>
                            {new Date(comment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className={cx("comment-body")}>
                          <Rating
                            name="read-only"
                            value={comment.rating}
                            readOnly
                            className={cx("comment-rating")}
                          />
                          <p className={cx("comment-text")}>{comment.text}</p>
                        </div>

                        {/* Display replies */}
                        {comment.replies.map((reply, replyIndex) => (
                          <div key={replyIndex} className={cx("comment-reply")}>
                            <div className={cx("comment-header")}>
                              <h4
                                className={cx(
                                  "user-name",
                                  reply.userName === "Instructor"
                                    ? "instructor"
                                    : ""
                                )}
                              >
                                {reply.userName}
                              </h4>
                              <span className={cx("comment-date")}>
                                {new Date(reply.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className={cx("comment-body")}>
                              <p className={cx("comment-text")}>{reply.text}</p>
                            </div>
                          </div>
                        ))}

                        {/* Reply input */}
                        <div className={cx("reply-input")}>
                          <input
                            type="text"
                            value={replyTexts[index] || ""}
                            placeholder="Write a reply..."
                            onChange={(e) => handleReplyChange(e, index)}
                            className={cx("reply-input-field")}
                          />
                          <button
                            onClick={() => handleReply(index)}
                            className={cx("reply-button")}
                          >
                            Reply
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* end student feed */}
              </div>
              <div className={cx("col-4", "sidebar")}>
                <div className={cx("add-course-details")}>
                  <div className={cx("discount")}>
                    <span>
                      <b>Old price:</b>{" "}
                      <strike className={cx("color-price")}>
                        1.299.000 VND
                      </strike>
                    </span>
                  </div>
                  <div className={cx("price")}>
                    <b>New Price:</b>
                    <span className={cx("color-price")}> 699.999 VND</span>
                  </div>
                  <div className={cx("button-add")}>
                    <button type="button">Add To Cart</button>
                  </div>
                  <div className={cx("time-add")}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>
                      Thời lượng: <b>06 giờ 21 phút</b>
                    </span>
                  </div>
                  <div className={cx("sylabus-add")}>
                    <FontAwesomeIcon icon={faCirclePlay} />
                    <span>
                      Giáo trình: <b>06 giờ 21 phút bài giảng</b>
                    </span>
                  </div>
                  <div className={cx("chapter-add")}>
                    <img src={chapter} alt="chapter" />
                    <span>
                      Chapter: <b>7 Chapter</b>
                    </span>
                  </div>
                  <div className={cx("lesson-add")}>
                    <img src={lesson} alt="lesson" />
                    <span>
                      Lesson: <b>7 Lesson</b>
                    </span>
                  </div>
                  <div className={cx("quizz-add")}>
                    <img src={quiz} alt="quizz" />
                    <span>
                      Quizz: <b>17 Quizz</b>
                    </span>
                  </div>

                  <div className={cx("time-add")}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    <span>Sở hữu khóa học trọn đời</span>
                  </div>
                  <div className={cx("benefits")}>
                    <FontAwesomeIcon icon={faCertificate} />
                    <span>Nhận chứng chỉ hoàn thành khóa học</span>
                  </div>
                  <div className={cx("benefits")}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    <span>Hỗ trợ trực tiếp từ giảng viên</span>
                  </div>
                  {/* DiscountCourse */}
                  <div className={cx("discount-course")}>
                    <div className={cx("discount-title")}>
                      <h3>Top discount courses</h3>
                    </div>
                    {courses.map((course) => (
                      <div key={course.id} className={cx("col-12")}>
                        <div className={cx("image-course")}>
                          <a
                            href="/course-details"
                            className={cx("image-header-course")}
                          >
                            <img src={course.image} alt="course1" />
                          </a>
                          <Link to="yeu-thich">
                            <Tippy
                              content="Yêu thích"
                              arrow={true}
                              theme="custom"
                            >
                              <div className={cx("heart-icon")}>
                                <FontAwesomeIcon icon={faHeart} />
                              </div>
                            </Tippy>
                          </Link>
                          <Tippy
                            content="Lượt đánh giá"
                            arrow={true}
                            theme="custom"
                          >
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
                                <img
                                  src={course.instructor.image}
                                  alt="tuong"
                                />
                                <p>{course.instructor.name}</p>
                              </div>
                              <div className={cx("course-price")}>
                                <p className={cx("old-price")}>
                                  ${course.oldPrice}
                                </p>
                                <p className={cx("new-price")}>
                                  ${course.newPrice}
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* End discountCourse */}
                </div>
              </div>
              <div className={cx("wrapper-relate-course")}>
                <RelateCourse />
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
