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
const cx = classNames.bind(styles);

function CategoryCourse() {
  return (
    <div className={cx("wrapper-category")}>
      <div className={cx("col-inner text-center mt-3", "text")}>
        <h2>What do you want to learn?</h2>
      </div>
      <div className="container">
        <div className="row">
          <a href="/" className={cx("col-md-2", "mt-full")}>
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
