import React from "react";
import classNames from "classnames/bind";
import styles from "./About.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import {
  FaCheckCircle,
  FaChalkboardTeacher,
  FaBook,
  FaCertificate,
} from "react-icons/fa"; // Import icons

const cx = classNames.bind(styles);

function About() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className={cx("wrapper-about")}>
        <section className={cx("intro-section")}>
          <h2>About Us</h2>
          <p>
            Welcome to our premier online learning platform! We connect learners
            worldwide with top-notch, industry-focused courses across various
            domains. Whether you’re looking to upskill, change careers, or
            simply gain knowledge, our platform offers a wide selection of
            courses that cater to all.
          </p>
        </section>

        <section className={cx("section-why-choose-us")}>
          <h3>Why Choose Us?</h3>
          <ul>
            <li>
              <FaCheckCircle className={cx("icon")} />{" "}
              <strong>Expert Instructors:</strong> Learn from top experts with
              real-world experience.
            </li>
            <li>
              <FaCertificate className={cx("icon")} />{" "}
              <strong>Quality & Accessibility:</strong> Affordable education at
              your fingertips.
            </li>
            <li>
              <FaBook className={cx("icon")} />{" "}
              <strong>Flexible Learning:</strong> Learn at your own pace,
              anywhere, anytime.
            </li>
            <li>
              <FaChalkboardTeacher className={cx("icon")} />{" "}
              <strong>Community Support:</strong> Connect with peers and
              instructors.
            </li>
          </ul>
        </section>

        <section className={cx("section-our-courses")}>
          <h3>Our Courses</h3>
          <p>
            We offer a wide variety of courses in technology, business, design,
            and personal development, each designed to equip you with practical
            skills. Explore our{" "}
            <a href="/courses" className={cx("link")}>
              course catalog
            </a>{" "}
            to find a program that aligns with your goals.
          </p>
        </section>

        <section className={cx("section-meet-our-instructors")}>
          <h3>Meet Our Instructors</h3>
          <p>
            Our instructors are passionate and highly experienced, committed to
            delivering quality education.
            <a href="/instructors" className={cx("link")}>
              {" "}
              Meet our instructors
            </a>{" "}
            and see their achievements.
          </p>
        </section>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default About;
