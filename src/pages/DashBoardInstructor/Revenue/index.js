import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from "chart.js";
import classNames from "classnames/bind";
import style from "./Revenue.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement // Đăng ký BarElement để sử dụng Bar Chart
);

const cx = classNames.bind(style);

function Revenue() {
  const courses = [
    {
      name: "Khóa học A",
      totalIncome: 5000,
      monthlyIncome: [1000, 1200, 1500, 1300],
      yearlyIncome: [10000, 12000, 15000],
      buyers: [
        { name: "Nguyễn Văn A", amount: 2000 },
        { name: "Trần Thị B", amount: 3000 },
      ],
    },
    {
      name: "Khóa học B",
      totalIncome: 8000,
      monthlyIncome: [2000, 1800, 2200, 2000],
      yearlyIncome: [1000, 1200, 1500],
      buyers: [
        { name: "Nguyễn Văn A", amount: 2000 },
        { name: "Trần Thị B", amount: 3000 },
      ],
    },
    {
      name: "Khóa học C",
      totalIncome: 4500,
      monthlyIncome: [1200, 1300, 1100, 900],
      yearlyIncome: [20000, 22000, 35000],
      buyers: [
        { name: "Nguyễn Văn A", amount: 2000 },
        { name: "Trần Thị B", amount: 3000 },
      ],
    },
    {
      name: "Khóa học D",
      totalIncome: 5500,
      monthlyIncome: [1200, 1300, 1100, 1900],
      yearlyIncome: [13000, 19000, 25000],
      buyers: [
        { name: "Nguyễn Văn A", amount: 2000 },
        { name: "Trần Thị B", amount: 3000 },
      ],
    },
    {
      name: "Khóa học E",
      totalIncome: 5000,
      monthlyIncome: [1200, 1300, 1100, 1400],
      yearlyIncome: [23000, 9000, 5000],
    },
    {
      name: "Khóa học F",
      totalIncome: 3500,
      monthlyIncome: [3200, 1300, 1100, 1900],
      yearlyIncome: [2000, 9000, 5000],
      buyers: [
        { name: "Nguyễn Văn A", amount: 2000 },
        { name: "Trần Thị B", amount: 3000 },
      ],
    },
    {
      name: "Khóa học G",
      totalIncome: 8500,
      monthlyIncome: [1200, 1300, 3100, 2900],
      yearlyIncome: [200, 9000, 5000],
      buyers: [
        { name: "Nguyễn Văn A", amount: 2000 },
        { name: "Trần Thị B", amount: 3000 },
      ],
    },
  ];
  const colors = [
    "rgba(255, 99, 132, 0.7)", // Đỏ hồng
    "rgba(54, 162, 235, 0.7)", // Xanh dương
    "rgba(75, 192, 192, 0.7)", // Xanh ngọc
    "rgba(255, 206, 86, 0.7)", // Vàng
    "rgba(153, 102, 255, 0.7)", // Tím
    "rgba(255, 159, 64, 0.7)", // Cam
  ];

  const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"];
  const years = ["Năm 1", "Năm 2", "Năm 3"];

  const lineChartData = {
    labels: months,
    datasets: courses.map((course, index) => ({
      label: course.name,
      data: course.monthlyIncome,
      fill: false,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      tension: 0.4,
    })),
  };

  const barChartData = {
    labels: courses.map((course) => course.name),
    datasets: [
      {
        label: "Tổng Thu Nhập",
        data: courses.map((course) => course.totalIncome),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 206, 86, 0.7)", // Vàng
          "rgba(153, 102, 255, 0.7)", // Tím
          "rgba(255, 159, 64, 0.7)", // Cam
          "rgba(139, 69, 19, 0.7)", // Nâu
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const yearlyChartData = {
    labels: years,
    datasets: courses.map((course, index) => ({
      label: course.name,
      data: course.yearlyIncome,
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length].replace("0.7", "1"),
      borderWidth: 1,
    })),
  };

  // Cấu hình cho Line Chart
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tổng thu nhập theo từng tháng",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tháng",
        },
      },
      y: {
        title: {
          display: true,
          text: "Thu nhập (VND)",
        },
        beginAtZero: true,
      },
    },
  };

  // Cấu hình cho Bar Chart
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tổng thu nhập của từng khóa học theo tháng",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Khóa học",
        },
      },
      y: {
        title: {
          display: true,
          text: "Thu nhập (VND)",
        },
        beginAtZero: true,
      },
    },
  };
  const yearlyChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tổng thu nhập của từng khóa học theo năm",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Năm",
        },
      },
      y: {
        title: {
          display: true,
          text: "Thu nhập (VND)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={cx("wrapper")}>
      <section className={"line-chart"}>
        <div className={cx("row")}>
          {/* Line Chart */}
          <div className={cx("col-6")}>
            <section className={cx("performance-section")}>
              <div className={cx("chart-container")}>
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </section>
          </div>

          {/* Bar Chart */}
          <div className={cx("col-6")}>
            <section className={cx("performance-section")}>
              <div className={cx("chart-container")}>
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </section>
          </div>

          {/* Yearly Income Chart */}
          <div className={cx("col-6")}>
            <section className={cx("performance-section")}>
              <div className={cx("chart-container")}>
                <Bar data={yearlyChartData} options={yearlyChartOptions} />
              </div>
            </section>
          </div>
          <div className={cx("col-6")}>
            <section className={cx("performance-section")}>
              <div className={cx("chart-container")}>
                <Bar data={yearlyChartData} options={yearlyChartOptions} />
              </div>
            </section>
          </div>
        </div>
      </section>
      <section className={cx("section-content")}>
        <h2>Thông tin chi tiết các khóa học</h2>
        <table className={cx("course-table")}>
          <thead>
            <tr>
              <th>Tên khóa học</th>
              <th>Tổng thu nhập (VND)</th>
              <th>Danh sách người mua</th>
            </tr>
          </thead>
          <tbody>
            {courses && courses.length > 0 ? (
              courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.totalIncome?.toLocaleString() || "0"}</td>
                  <td>
                    <ul>
                      {course.buyers && course.buyers.length > 0 ? (
                        course.buyers.map((buyer, buyerIndex) => (
                          <li key={buyerIndex}>
                            {buyer.name} - {buyer.amount.toLocaleString()} VND
                          </li>
                        ))
                      ) : (
                        <li>Không có người mua</li>
                      )}
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>{" "}
    </div>
  );
}

export default Revenue;
