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

const cx = classNames.bind(styles);

function CategoryCourse() {
  return (
    <div className={cx("wrapper-category")}>
      <div className={cx("trust-company")}>
        <p className={cx("text-achievement")}>
          Trusted by the world's best <span>Companies Achievements</span>
        </p>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-3")}>
              <LazyLoad height={100} offset={100}>
                <div className={cx("achieve")}>
                  <div className={cx("image")}>
                    <img src={achieve1} alt="achieve1" />
                  </div>
                  <div className={cx("info")}>
                    <h2>100k+</h2>
                    <p>Our Happy Students </p>
                  </div>
                </div>
              </LazyLoad>
            </div>
            <div className={cx("col-3")}>
              <LazyLoad height={100} offset={100}>
                <div className={cx("achieve")}>
                  <div className={cx("image")}>
                    <img src={achieve2} alt="achieve1" />
                  </div>
                  <div className={cx("info")}>
                    <h2>50k+</h2>
                    <p>Enrolled Learners</p>
                  </div>
                </div>
              </LazyLoad>
            </div>
            <div className={cx("col-3")}>
              <LazyLoad height={100} offset={100}>
                <div className={cx("achieve")}>
                  <div className={cx("image")}>
                    <img src={achieve3} alt="achieve1" />
                  </div>
                  <div className={cx("info")}>
                    <h2>80+</h2>
                    <p>Expert Instructor</p>
                  </div>
                </div>
              </LazyLoad>
            </div>
            <div className={cx("col-3")}>
              <LazyLoad height={100} offset={100}>
                <div className={cx("achieve")}>
                  <div className={cx("image")}>
                    <img src={achieve4} alt="achieve1" />
                  </div>
                  <div className={cx("info")}>
                    <h2>99.99</h2>
                    <p>Satisfiction Rate</p>
                  </div>
                </div>
              </LazyLoad>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("col-inner text-center mt-5", "text")}>
        <h2>What do you want to learn?</h2>
      </div>
      <div className="container">
        <div className="row">
          <a href="/" className={cx("col-md-2", "mt-full")}>
            <LazyLoad height={300} offset={100}>
              <div className="card">
                <img
                  src={tinhocvanphong}
                  alt="Tin hoc van phong"
                  className={cx("card-img-top")}
                />
                <div className={cx("card-body")}>
                  <p className={cx("card-title text-center")}>
                    Office Informatics
                  </p>
                </div>
              </div>
            </LazyLoad>
          </a>

          <a href="/" className={cx("col-md-2", "mt-full")}>
            <div className="card">
              <img
                src={thietke}
                alt="Thiet ke"
                className={cx("card-img-top")}
              />
              <div className={cx("card-body")}>
                <p className={cx("card-title text-center")}>Design</p>
              </div>
            </div>
          </a>
          <a href="/" className={cx("col-md-2", "mt-full")}>
            <div className="card">
              <img
                src={kinhdoanhkhoinghiep}
                alt="Kinh doanh khoi nghiep"
                className={cx("card-img-top")}
              />
              <div className={cx("card-body")}>
                <p className={cx("card-title text-center")}>
                  Bussiness-startup
                </p>
              </div>
            </div>
          </a>
          <a href="/" className={cx("col-md-2", "mt-full")}>
            <div className="card">
              <img
                src={phattriencanhan}
                alt="Phat trien ca nhan"
                className={cx("card-img-top")}
              />
              <div className={cx("card-body")}>
                <p className={cx("card-title text-center")}>Personal</p>
              </div>
            </div>
          </a>
          <a href="/" className={cx("col-md-2", "mt-full")}>
            <div className="card">
              <img src={sale} alt="Sale" className={cx("card-img-top")} />
              <div className={cx("card-body")}>
                <p className={cx("card-title text-center")}>Sale</p>
              </div>
            </div>
          </a>
          <a href="/" className={cx("col-md-2", "mt-full")}>
            <div className="card">
              <img
                src={it}
                alt="Cong nghe thong tin"
                className={cx("card-img-top")}
              />
              <div className={cx("card-body")}>
                <p className={cx("card-title text-center")}>IT</p>
              </div>
            </div>
          </a>
          <a href="/" className={cx("col-md-2", "mt-full")}>
            <div className="card">
              <img
                src={suckhoegioitinh}
                alt="Suc khoe gioi tinh"
                className={cx("card-img-top")}
              />
              <div className={cx("card-body")}>
                <p className={cx("card-title text-center")}>Sexual health</p>
              </div>
            </div>
          </a>
          <a href="/" className={cx("col-md-2", "mt-full")}>
            <div className="card">
              <img
                src={phongcachsong}
                alt="Phong cach song"
                className={cx("card-img-top")}
              />
              <div className={cx("card-body")}>
                <p className={cx("card-title text-center")}>Lifestyle</p>
              </div>
            </div>
          </a>
          <a href="/" className={cx("col-md-2", "mt-full")}>
            <div className="card">
              <img
                src={nuoidaycon}
                alt="Nuoi day con"
                className={cx("card-img-top")}
              />
              <div className={cx("card-body")}>
                <p className={cx("card-title text-center")}>Parenting</p>
              </div>
            </div>
          </a>
          <a href="/" className={cx("col-md-2", "mt-full")}>
            <div className="card">
              <img
                src={honnhangiadinh}
                alt="Hon nhan gia dinh"
                className={cx("card-img-top")}
              />
              <div className={cx("card-body")}>
                <p className={cx("card-title text-center")}>Marriage-family</p>
              </div>
            </div>
          </a>
          <a href="/" className={cx("col-md-2", "mt-full")}>
            <div className="card">
              <img
                src={ngoaingu}
                alt="English"
                className={cx("card-img-top")}
              />
              <div className={cx("card-body")}>
                <p className={cx("card-title text-center")}>English</p>
              </div>
            </div>
          </a>
          <a href="/" className={cx("col-md-2", "mt-full")}>
            <div className="card">
              <img
                src={marketing}
                alt="Marketing"
                className={cx("card-img-top")}
              />
              <div className={cx("card-body")}>
                <p className={cx("card-title text-center")}>Marketing</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CategoryCourse;
