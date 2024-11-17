import { React, useState } from "react";
import classNames from "classnames/bind";
import style from "./HeaderInstructor.module.scss";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import Cursus from "~/images/Cursus.svg";
import { Link } from "react-router-dom";
import achieve1 from "~/images/achieve1.png";
import achieve2 from "~/images/achieve2.png";
import achieve3 from "~/images/achieve3.png";
import achieve4 from "~/images/achieve4.png";
const cx = classNames.bind(style);

function InstructorHeader() {
  const notifications = [
    "Sell Successfully course 1",
    "Sell Successfully course 2",
    "Sell Successfully course 3",
    "Sell Successfully course 4",
    "Sell Successfully course 5",
    "Sell Successfully course 6",
    "Sell Successfully course 7",
    "Sell Successfully course 8",
    "Sell Successfully course 9",
    "Sell Successfully course 10",
    "Sell Successfully course 11",
    "Sell Successfully course 12",
    "Sell Successfully course 13",
    "Sell Successfully course 14",
    "Sell Successfully course 15",
    "Sell Successfully course 16",
    "Sell Successfully course 17",
    "Sell Successfully course 18",
  ];

  const [activeMenu, setActiveMenu] = useState("");
  const [clickNotifications, setClickNotification] = useState(false);
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
  const handleClickNotifications = () => {
    setClickNotification(!clickNotifications);
  };
  console.log(clickNotifications);
  return (
    <header className={cx("instructor-header")}>
      <div className={cx("container-fluid")}>
        <div className={cx("row")}>
          <div className={cx("col-2")}>
            <div className={cx("image")}>
              <a href="/instructor-dash-board">
                <img src={Cursus} alt="Cursus" />
              </a>
            </div>
          </div>
          <div className={cx("col-8")} style={{ padding: "0" }}>
            <div className={cx("row")} style={{ marginLeft: "-16px" }}>
              <div className={cx("col-3")}>
                <div className={cx("achieve")}>
                  <div className={cx("image")}>
                    <img src={achieve1} alt="achieve1" />
                  </div>
                  <div className={cx("info")}>
                    <h2>1000+</h2>
                    <p>Student</p>
                  </div>
                </div>
              </div>
              <div className={cx("col-3")}>
                <div className={cx("achieve")}>
                  <div className={cx("image")}>
                    <img src={achieve2} alt="achieve1" />
                  </div>
                  <div className={cx("info")}>
                    <h2>50+</h2>
                    <p>Courses</p>
                  </div>
                </div>
              </div>
              <div className={cx("col-3")}>
                <div className={cx("achieve")}>
                  <div className={cx("image")}>
                    <img src={achieve3} alt="achieve1" />
                  </div>
                  <div className={cx("info")}>
                    <h2>$10,000</h2>
                    <p>Revenue</p>
                  </div>
                </div>
              </div>
              <div className={cx("col-3")}>
                <div className={cx("achieve")}>
                  <div className={cx("image")}>
                    <img src={achieve4} alt="achieve1" />
                  </div>
                  <div className={cx("info")}>
                    <h2>99+</h2>
                    <p>Enrolled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("col-2")}>
            <div className={cx("user-controls")}>
              <div className={cx("notifications")}>
                <button>
                  <FaBell onClick={handleClickNotifications} />
                </button>
                <span className={cx("badge")}>{notifications.length}</span>
                <div
                  className={cx("notification-dropdown", {
                    show: clickNotifications,
                  })}
                >
                  <ul>
                    {notifications.map((notification, index) => (
                      <li key={index}>
                        {index + 1}. {notification}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={cx("user-menu")}>
                <FaUserCircle className={cx("user-avatar")} />
                <span>Giảng viên</span>
                <div className={cx("dropdown-menu")}>
                  <ul>
                    <li>
                      <a href="/login">Đăng xuất</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default InstructorHeader;
