import React from "react";
import classNames from "classnames/bind";
import styles from "./About.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import {
  FaCheckCircle,
  FaBook,
  FaChalkboardTeacher,
  FaCertificate,
} from "react-icons/fa";

const cx = classNames.bind(styles);

function About() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className={cx("wrapper-about")}>
        <section className={cx("intro-section")}>
          <div className={cx("intro-text")}>
            <h2>Discover Our Story</h2>
            <p>
              We are an online course platform that bridges the gap between
              learners and industry experts worldwide. Our mission is to provide
              top-quality, accessible education in diverse fields so that
              everyone has the opportunity to grow.
            </p>
          </div>
        </section>

        <section className={cx("why-choose-us")}>
          <h3>Why Choose Us?</h3>
          <div className={cx("features")}>
            <div className={cx("feature")}>
              <FaCheckCircle className={cx("icon")} />
              <h4>Expert Mentors</h4>
              <p>
                Learn from the best in the field with real-world experience.
              </p>
            </div>
            <div className={cx("feature")}>
              <FaCertificate className={cx("icon")} />
              <h4>Accredited Programs</h4>
              <p>Gain valuable certifications to boost your career.</p>
            </div>
            <div className={cx("feature")}>
              <FaBook className={cx("icon")} />
              <h4>Flexible Learning</h4>
              <p>Enjoy the freedom to learn on your own schedule.</p>
            </div>
            <div className={cx("feature")}>
              <FaChalkboardTeacher className={cx("icon")} />
              <h4>Supportive Community</h4>
              <p>Connect with fellow learners and mentors for support.</p>
            </div>
          </div>
        </section>

        <section className={cx("our-courses")}>
          <h3>Explore Our Courses</h3>
          <p>
            From technology to business and personal development, our catalog
            offers a range of courses designed to give you practical skills.
            Discover a course that fits your goals and start your journey with
            us today.
          </p>
          <button className={cx("explore-button")}>Browse Courses</button>
        </section>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default About;
