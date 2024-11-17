import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
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
  ArcElement,
} from "chart.js";
import classNames from "classnames/bind";
import style from "./Performance.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const cx = classNames.bind(style);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Hoàn Thành Khóa Học",
      data: [800, 950, 1200, 1400, 1500],
      borderColor: "#8884d8",
      backgroundColor: "rgba(136, 132, 216, 0.2)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Chưa Hoàn Thành Khóa Học",
      data: [200, 250, 300, 350, 400],
      borderColor: "#ff7300",
      backgroundColor: "rgba(255, 115, 0, 0.2)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Khóa Học Đã Mua & Hoàn Trả",
      data: [50, 60, 70, 80, 90],
      borderColor: "green",
      backgroundColor: "rgba(130, 202, 157, 0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const data2 = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Số Lượng Đánh Giá",
      data: [50, 60, 80, 90, 120],
      backgroundColor: "#8884d8",
      borderColor: "#8884d8",
      borderWidth: 1,
    },
    {
      label: "Xếp Hạng Trung Bình",
      data: [4.2, 4.5, 4.7, 4.6, 4.8],
      backgroundColor: "#82ca9d",
      borderColor: "#82ca9d",
      borderWidth: 1,
    },
  ],
};

const data3 = {
  labels: ["Hoàn Thành", "Chưa Hoàn Thành", "Đã Mua & Hoàn Trả"],
  datasets: [
    {
      data: [4000, 1200, 350],
      backgroundColor: ["#8884d8", "#ff7300", "#82ca9d"],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Biểu Đồ Hiệu Suất Khóa Học",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.raw}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const options2 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Số Lượng Đánh Giá và Xếp Hạng Trung Bình",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.raw}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const options3 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Phân Tích Tỷ Lệ Khóa Học",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.label}: ${context.raw}`;
        },
      },
    },
  },
};

const options4 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Tiến Trình Hoàn Thành Khóa Học",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.raw}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function Performance() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("col-6")}>
          <section className={cx("performance-section")}>
            <div className={cx("chart-container")}>
              <Line data={data} options={options} />
            </div>
          </section>
        </div>

        <div className={cx("col-6")}>
          <section className={cx("performance-section")}>
            <div className={cx("chart-container")}>
              <Bar data={data2} options={options2} />
            </div>
          </section>
        </div>

        <div className={cx("col-6")}>
          <section className={cx("performance-section", "pie-chart")}>
            <div className={cx("chart-container")}>
              <Pie data={data3} options={options3} />
            </div>
          </section>
        </div>

        <div className={cx("col-6")}>
          <section className={cx("performance-section")}>
            <div className={cx("chart-container")}>
              <Line data={data} options={options4} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Performance;
