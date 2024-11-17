import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./DashBoardInstructor.module.scss";
import HeaderInstructor from "~/pages/DashBoardInstructor/HeaderInstructor";
import Footer from "~/components/Layout/Footer";
import ProfileInstructor from "~/pages/DashBoardInstructor/ProfileInstructor";
import Payout from "~/pages/DashBoardInstructor/Payout";
import ReportCourse from "~/pages/DashBoardInstructor/ReportCourse";
import Feedback from "~/pages/DashBoardInstructor/Feedback";
import Performance from "~/pages/DashBoardInstructor/Performance";
import Revenue from "~/pages/DashBoardInstructor/Revenue";

const cx = classNames.bind(style);

function DashBoardInstructor() {
  const [activeMenu, setActiveMenu] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Overview" },
    { id: "courseManagement", label: "Courses Management" },
    { id: "students", label: "Students Management" },
    { id: "revenue", label: "Revenue" },
    { id: "performance", label: "Performance" },
    { id: "payouts", label: "Payouts" },
    { id: "reports", label: "Reports" },
    { id: "feedbacks", label: "Feedbacks" },
    { id: "account", label: "Account" },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "overview":
        return (
          <div>
            Tổng quan: Đây là nơi hiển thị doanh thu, số học viên, và thông báo.
          </div>
        );
      case "courseManagement":
        return (
          <div>
            Quản lý khóa học: Bạn có thể tạo hoặc chỉnh sửa khóa học ở đây.
          </div>
        );
      case "performance":
        return <Performance />;
      case "students":
        return (
          <div>Quản lý học viên: Danh sách học viên và công cụ liên lạc.</div>
        );
      case "revenue":
        return <Revenue />;
      case "payouts":
        return <Payout />;
      case "reports":
        return <ReportCourse />;
      case "feedbacks":
        return <Feedback />;
      case "account":
        return <ProfileInstructor />;

      default:
        return <div>Chọn mục từ menu bên trái.</div>;
    }
  };

  return (
    <section className={cx("section-dashboard-instructor")}>
      <section className={cx("section-header")}>
        <header>
          <HeaderInstructor />
        </header>
      </section>

      <section className={cx("section-main")}>
        <aside className={cx("sidebar")}>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={cx({ active: activeMenu === item.id })}
                onClick={() => setActiveMenu(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        <main className={cx("main-content")}>{renderContent()}</main>
      </section>

      <section className={cx("section-footer")}>
        <Footer />
      </section>
    </section>
  );
}

export default DashBoardInstructor;
