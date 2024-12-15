import classNames from "classnames/bind";
import styles from "./featuredInstructors.module.scss";
import dot from "~/images/dot.png";
import certificate from "~/images/certificate.png";
import chronometer from "~/images/chronometer.png";
import why from "~/images/why.png";
import students from "~/images/students.png";
import shape1 from "~/images/shape-1.png";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DashBoardApi from "~/API/DashBoardAPI";
import UserAPI from "~/API/UserAPI";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function FeaturedInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [dataTotal, setDataTotal] = useState({});
  const [showContact, setShowContact] = useState(null);
  const navigate = useNavigate();

  const handleContactClick = (id) => {
    setShowContact(showContact === id ? null : id);
  };
  const handleInstructorChange = (event) => {
    const selectedInstructor = event.target.value;
    if (selectedInstructor) {
      navigate(`/view-instructor/${selectedInstructor.toLowerCase()}`);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  //total instructor student course enroll
  useEffect(() => {
    const getToTalInstructorStudentCourseEnroll = async () => {
      try {
        const response =
          await DashBoardApi().getToTalInstructorStudentCourseEnroll();
        setDataTotal(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getToTalInstructorStudentCourseEnroll();
  }, []);
  //end total instructor student course enroll
  //Get all instructor
  useEffect(() => {
    const getAllInstructor = async () => {
      try {
        const response = await UserAPI().getAllInstructor();
        setInstructors(response);
      } catch (error) {
        console.error("Error fetching instructor:", error);
      }
    };
    getAllInstructor();
  }, []);
  //end instructor
  return (
    <section className={cx("section-why-and-instructor")}>
      <section className={cx("section-why")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-5")}>
              <div className={cx("why")}>
                <h2 className={cx("subtitle-why")}>
                  <img src={dot} alt="dot" /> Why choose us
                </h2>
                <h3 className={cx("title-why")}>
                  Learn from today Leading{" "}
                  <span style={{ color: "#FF3158" }}>Universities &</span>{" "}
                  Companies
                </h3>
                <p>In-depth courses - A solid foundation for success!</p>
                <div className={cx("why-content-first")}>
                  <div className={cx("image")}>
                    <img src={certificate} alt="certificate" />
                  </div>
                  <div className={cx("info")}>
                    <h4 className={cx("title")}>Highly Experienced</h4>
                    <p>
                      Architect client-centered total linkage for intuitive
                      benefits before real-time.
                    </p>
                  </div>
                </div>
                <div className={cx("why-content-second")}>
                  <div className={cx("image")}>
                    <img src={chronometer} alt="certificate" />
                  </div>
                  <div className={cx("info")}>
                    <h4 className={cx("title")}>Highly Experienced</h4>
                    <p>
                      Architect client-centered total linkage for intuitive
                      benefits before real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("col-7")}>
              <div className={cx("relative-wrapper")}>
                <div className={cx("background-why")}>
                  <img src={why} alt="background-why" />
                </div>
                <div className={cx("expert-tutor")}>
                  <span>{dataTotal.totalInstructors}+</span>
                  <p>Expert Tutor</p>
                </div>
                <div className={cx("total-student")}>
                  <span></span>
                  <p>Students Enroll</p>
                  <h2 className={cx("student")}>{dataTotal.totalEnrolls}+</h2>
                  <img src={students} alt="students" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={cx("section-instructor")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-6")}>
              <div className={cx("title-wrapper")}>
                <h2 className={cx("sub-title")}>
                  <img src={dot} alt="dot" /> Instructor's
                </h2>
                <h3 className={cx("title")}>
                  Our Expert <span>Instructors</span>
                </h3>
              </div>
            </div>
            <div className={cx("col-6")}>
              <div className={cx("instructor-category")}>
                <img src={shape1} alt="shape1" />

                <select
                  className={cx("select-category")}
                  onChange={handleInstructorChange}
                >
                  <option value="">Select Instructor</option>
                  {instructors.map((instructor) => (
                    <option
                      key={instructor.userName}
                      value={instructor.userName}
                    >
                      {instructor.userName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <Slider {...settings}>
            {instructors.map((ins) => (
              <div key={ins.userName} className={cx("col-3")}>
                <div className={cx("information-instructor")}>
                  <div className={cx("image-instructor")}>
                    <a href={`/view-instructor/${ins.userName.toLowerCase()}`}>
                      <img src={ins.avatar} alt="image-instructor" />
                    </a>
                    <a href={`/view-instructor/${ins.userName.toLowerCase()}`}>
                      <h4>{ins.userName}</h4>
                    </a>
                    <b>
                      <p style={{ color: "#FF3158", fontWeight: 700 }}>
                        {ins.userInfo.occupation}
                      </p>
                    </b>
                  </div>
                  <div
                    className={cx("share", {
                      active: showContact === ins.userName,
                    })}
                    onClick={() => handleContactClick(ins.userName)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                  {showContact === ins.userName && (
                    <div className={cx("show-contact")}>
                      <ul>
                        {ins.userInfo.facebook && (
                          <li>
                            <a
                              href={ins.userInfo.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FontAwesomeIcon icon={faFacebookSquare} />
                            </a>
                          </li>
                        )}

                        {ins.userInfo.instagram && (
                          <li>
                            <a
                              href={ins.userInfo.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FontAwesomeIcon icon={faInstagram} />
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </section>
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        right: "30px",
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

export default FeaturedInstructors;
