import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import classNames from "classnames/bind";
import styles from "./featuredInstructors.module.scss";
import tuong from "~/images/tuong.jpg";
import giangvienuytin from "~/images/giangvienuytin.png";

const cx = classNames.bind(styles);

const FeaturedInstructors = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={cx("reason-learn")}>
      <div className={cx("container")}>
        <div className={cx("col-inner text-center", "text")}>
          <h2 className={cx("mt-3", "title-reason")}>
            Reason Learning At Cursus Online
          </h2>
        </div>
        <div className={cx("row")}>
          <div className={cx("col-4", "background-reason")}>
            <img src={giangvienuytin} alt="Reputable Lecturer 1" />
            <h3>Reputable Lecturer</h3>
            <p>Quality lectures</p>
          </div>
          <div className={cx("col-4", "background-reason")}>
            <img src={giangvienuytin} alt="Reputable Lecturer 2" />
            <h3>Interactive Learning</h3>
            <p>Engaging methods</p>
          </div>
          <div className={cx("col-4", "background-reason")}>
            <img src={giangvienuytin} alt="Reputable Lecturer 3" />
            <h3>Flexible Schedule</h3>
            <p>Learn at your pace</p>
          </div>
        </div>
        <div className={cx("col-inner text-center", "text")}>
          <h2 className={cx("title-featured-instructor")}>
            Featured Instructors
          </h2>
        </div>
        <Slider {...settings}>
          <a href="/view-instructor">
            <div className={cx("background-featured-instructor")}>
              <img
                src={tuong}
                alt="Banner 1"
                className={cx("image-featured-instructor")}
              />
              <h5 className={cx("text-center")}>Instructor Name 1</h5>
              <p className={cx("text-center")}>Description 1</p>
            </div>
          </a>
          <a href="/view-instructor">
            <div className={cx("background-featured-instructor")}>
              <img
                src={tuong}
                alt="Banner 2"
                className={cx("image-featured-instructor")}
              />
              <h5>Instructor Name 2</h5>
              <p>Description 2</p>
            </div>
          </a>
          <a href="/view-instructor">
            <div className={cx("background-featured-instructor")}>
              <img
                src={tuong}
                alt="Banner 3"
                className={cx("image-featured-instructor")}
              />
              <h5>Instructor Name 3</h5>
              <p>Description 3</p>
            </div>
          </a>
          <a href="/view-instructor">
            <div className={cx("background-featured-instructor")}>
              <img
                src={tuong}
                alt="Banner 4"
                className={cx("image-featured-instructor")}
              />
              <h5>Instructor Name 4</h5>
              <p>Description 4</p>
            </div>
          </a>
        </Slider>
      </div>
    </div>
  );
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

export default FeaturedInstructors;
