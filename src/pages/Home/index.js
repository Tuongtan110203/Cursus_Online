import React from "react";
//import className và scss
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
// import header footer default
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import FeaturedInstructors from "~/pages/Home/FeaturedInstructors";
import CategoryCourse from "~/pages/Home/CategoryCourse";
import FeaturedCourse from "~/pages/Home/FeaturedCourse";
//import carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
//import image animation snow
import banner1 from "~/images/banner1.jpg";
import banner2 from "~/images/banner2.jpg";
//import tippy
import "tippy.js/dist/tippy.css";
import "~/components/Layout/Header/tippyStyles.module.scss";

const cx = classNames.bind(styles);

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <div className={cx("wrapper-home")}>
      <Header />
      <Slider {...settings}>
        <div>
          <img src={banner1} alt="Banner 1" className={cx("banner-image")} />
        </div>
        <div>
          <img src={banner2} alt="Banner 2" className={cx("banner-image")} />
        </div>
      </Slider>
      <CategoryCourse />
      <FeaturedCourse />
      <FeaturedInstructors />
      <Footer />
    </div>
  );
}

export default Home;
