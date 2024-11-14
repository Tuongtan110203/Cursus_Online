import classNames from "classnames/bind";
import styles from "./featuredInstructors.module.scss";
import dot from "~/images/dot.png";
import certificate from "~/images/certificate.png";
import chronometer from "~/images/chronometer.png";
import why from "~/images/why.png";
import students from "~/images/students.png";
import shape1 from "~/images/shape-1.png";
import teacher1 from "~/images/teacher-1.png";
import teacher2 from "~/images/teacher-2.png";
import teacher3 from "~/images/teacher-3.png";
import teacher4 from "~/images/teacher-4.png";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const cx = classNames.bind(styles);

function FeaturedInstructors() {
  const [instructors, setInstructors] = useState([
    { id: 1, image: teacher1, name: "Jenny Wilson", major: "UI Design" },
    { id: 2, image: teacher2, name: "Jenny Nguyen", major: "Programming" },
    { id: 3, image: teacher3, name: "Jenny Wall", major: "Marketing" },
    { id: 4, image: teacher4, name: "Jenny Pham", major: "Sales" },
  ]);

  const [showContact, setShowContact] = useState(null);

  const handleContactClick = (id) => {
    setShowContact(showContact === id ? null : id);
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
                  <span>80+</span>
                  <p>Expert Tutor</p>
                </div>
                <div className={cx("total-student")}>
                  <span></span>
                  <p>Students Enroll</p>
                  <h2 className={cx("student")}>15K+</h2>
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
                <select className={cx("select-category")}>
                  <option value="1">All</option>
                  <option value="2">Computer Science</option>
                  <option value="3">Business</option>
                  <option value="4">Healthcare</option>
                  <option value="5">Engineering</option>
                  <option value="6">Marketing</option>
                  <option value="7">Other</option>
                </select>
              </div>
            </div>
          </div>
          <Slider {...settings}>
            {instructors.map((ins) => (
              <div key={ins.id} className={cx("col-3")}>
                <div className={cx("information-instructor")}>
                  <div className={cx("image-instructor")}>
                    <a href="/view-instructor">
                      <img src={ins.image} alt="image-instructor" />
                    </a>
                    <h4>{ins.name}</h4>
                    <p>{ins.major}</p>
                  </div>
                  <div
                    className={cx("share", { active: showContact === ins.id })}
                    onClick={() => handleContactClick(ins.id)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                  {showContact === ins.id && (
                    <div className={cx("show-contact")}>
                      <ul>
                        <li>
                          <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon icon={faInstagram} />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon icon={faFacebookSquare} />
                          </a>
                        </li>
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
