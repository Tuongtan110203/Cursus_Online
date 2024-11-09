import React from "react";
import classNames from "classnames/bind";
import styles from "./viewInstructor.module.scss";
import { Breadcrumbs, Link, Typography } from "@mui/material"; // Import từ MUI
//import Header Footer
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import tuong from "~/images/tuong.jpg";
import course2 from "~/images/course2.jpg";
import course4 from "~/images/course4.jpg";
//import fontawesome from "~/
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "~/components/Layout/Header/tippyStyles.module.scss";
import "slick-carousel/slick/slick.css"; //carousel
import "slick-carousel/slick/slick-theme.css"; //carousel
import Slider from "react-slick"; //carousel

const cx = classNames.bind(styles);

function ViewInstructor() {
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
    <div>
      <Header />
      <div className={cx("container")}>
        <Breadcrumbs aria-label="breadcrumb" className={cx("mt-3")}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography sx={{ color: "text.primary" }}>
            View Instructor
          </Typography>
        </Breadcrumbs>
        <div className={cx("row")}>
          <div className={cx("col-4", "avatar")}>
            <img src={tuong} alt="tuong" />
          </div>
          <div className={cx("col-8", "content")}>
            <b>
              <i>
                <h5>Nguyen Tan Tuong</h5>
              </i>
            </b>
            <p>
              Khởi đầu từ 2 bàn tay trắng và gầy gò, năm 1988, ba bán hàng tạp
              hóa ở chợ, còn mẹ tui xoay sở tự học cắt may ở nhà, khi tiệm may
              có chút uy tín, mẹ mở thêm lớp dạy cắt may. Một đứa bé gái 8 tuổi
              là tui năm ấy, quan sát mẹ làm suốt rồi cũng chấp chới chân đạp
              máy may được 1 chiếc áo 3 lỗ cho đứa em. Được vài năm thì mẹ
              chuyển sang kinh doanh dịch vụ ‘cho thuê bàn ghế, bát đĩa, phông
              bạt..’ phục vụ các đám hiếu/hỉ/sự kiện. Sau 5-6 năm ăn nên làm ra
              nhờ nghề này, mẹ lại ‘nâng cấp’ mô hình lên 1 tầm mới, chuyển sang
              bán các mặt hàng đồ gia dụng cao cấp. Dù làm công việc gì, mẹ luôn
              tìm tòi học hỏi để tạo sự khác biệt cho riêng mình. Chẳng hạn như,
              mọi người bán những mặt hàng gia dụng giá rẻ, phổ thông, mẹ lặn
              lội tìm kiếm các mối hàng chất lượng cao, độc lạ, và tập trung vào
              khâu ‘tư vấn’, trò chuyện với khách hàng. Trụ với mảng đồ gia dụng
              được ~20 năm, mẹ, quyết định dừng lại chỉ vì cửa hàng quá chật
              chội, không có chỗ cho con cháu vui chơi mỗi dịp gia đình đoàn tụ.
              Ẩn sau mỗi lần thay đổi công việc kinh doanh ấy, xa gần đều là vì
              chúng tui.
            </p>
          </div>
        </div>
        <div className={cx("list-course")}>
          <b>
            <h4>List Course Of Nguyen Tan Tuong</h4>
          </b>
          <Slider {...settings}>
            <div className={cx("image-course")}>
              <Link to="/course-details">
                <img src={course4} alt="course4" />
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
                <img src={course2} alt="course3" />
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
                <img src={course2} alt="course1" />
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
      <Footer />
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        right: "-2px",
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

export default ViewInstructor;
