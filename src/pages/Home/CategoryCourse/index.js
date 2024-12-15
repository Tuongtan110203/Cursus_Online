//import styles and classname
import classNames from "classnames/bind";
import styles from "./category.module.scss";
//import image
import tinhocvanphong from "~/images/tinhocvanphong.svg";
import thietke from "~/images/thietke.svg";
import kinhdoanhkhoinghiep from "~/images/kinhdoanhkhoinghiep.svg";
import phattriencanhan from "~/images/phattriencanhan.svg";
import sale from "~/images/sale.svg";
import it from "~/images/it.svg";
import suckhoegioitinh from "~/images/suckhoegioitinh.svg";
import phongcachsong from "~/images/phongcachsong.svg";
import nuoidaycon from "~/images/nuoidaycon.svg";
import honnhangiadinh from "~/images/honnhangiadinh.svg";
import ngoaingu from "~/images/ngoaingu.svg";
import marketing from "~/images/marketing.svg";
import achieve1 from "~/images/achieve1.png";
import achieve2 from "~/images/achieve2.png";
import achieve3 from "~/images/achieve3.png";
import achieve4 from "~/images/achieve4.png";
import LazyLoad from "react-lazyload";
import DashBoardApi from "~/API/DashBoardAPI";
import CategoryAPI from "~/API/CategoryAPI";

import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

function CategoryCourse() {
  const [dashboardData, setDashboardData] = useState({});
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data =
          await DashBoardApi().getToTalInstructorStudentCourseEnroll();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchCategoryAll = async () => {
      try {
        const GetAllCategory = await CategoryAPI().getAllCategories();
        setCategories(GetAllCategory);
      } catch (error) {
        console.error("Failed to fetch category data:", error);
      }
    };
    fetchCategoryAll();
  }, []);

  const categoryImages = {
    "Office Information": tinhocvanphong,
    Design: thietke,
    "Business-Startup": kinhdoanhkhoinghiep,
    Personal: phattriencanhan,
    Sale: sale,
    IT: it,
    "Sexual Health": suckhoegioitinh,
    Lifestyle: phongcachsong,
    Parenting: nuoidaycon,
    "Marriage-Family": honnhangiadinh,
    English: ngoaingu,
    Marketing: marketing,
  };
  return (
    <div className={cx("wrapper-category")}>
      <div className={cx("trust-company")}>
        <p className={cx("text-achievement")}>
          Trusted by the world's best <span>Companies Achievements</span>
        </p>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-3")}>
              <div className={cx("achieve")}>
                <div className={cx("image")}>
                  <img src={achieve1} alt="achieve1" />
                </div>
                <div className={cx("info")}>
                  <h2>{dashboardData.totalStudents}+</h2>
                  <p>Our Happy Students </p>
                </div>
              </div>
            </div>
            <div className={cx("col-3")}>
              <div className={cx("achieve")}>
                <div className={cx("image")}>
                  <img src={achieve2} alt="achieve1" />
                </div>
                <div className={cx("info")}>
                  <h2>{dashboardData.totalEnrolls}+</h2>
                  <p>Enrolled Learners</p>
                </div>
              </div>
            </div>
            <div className={cx("col-3")}>
              <div className={cx("achieve")}>
                <div className={cx("image")}>
                  <img src={achieve3} alt="achieve1" />
                </div>
                <div className={cx("info")}>
                  <h2>{dashboardData.totalInstructors}+</h2>
                  <p>Expert Instructor</p>
                </div>
              </div>
            </div>
            <div className={cx("col-3")}>
              <div className={cx("achieve")}>
                <div className={cx("image")}>
                  <img src={achieve4} alt="achieve1" />
                </div>
                <div className={cx("info")}>
                  <h2>{dashboardData.toTalCourses}+</h2>
                  <p>ToTal Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("col-inner text-center mt-5", "text")}>
        <h2>What do you want to learn?</h2>
      </div>
      <div className="container">
        <div className="row">
          {categories.map((category) => (
            <a
              href={`/search?query=${encodeURIComponent(
                category.categoryName
              )}`}
              className={cx("col-md-2", "mt-full")}
              key={category.categoryId}
            >
              <div className="card">
                <img
                  src={categoryImages[category.categoryName] || tinhocvanphong}
                  alt={category.categoryName}
                  className={cx("card-img-top")}
                />
                <div className={cx("card-body")}>
                  <p className={cx("card-title text-center")}>
                    {category.categoryName}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryCourse;
