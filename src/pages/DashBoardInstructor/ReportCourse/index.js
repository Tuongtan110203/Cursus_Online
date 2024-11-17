import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./ReportCourse.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

function ReportCourse() {
  const [reports, setReports] = useState([
    {
      ReportId: 1,
      Issue: "Missing assignment",
      Attachment: "file3.pdf",
      Content: "The student did not submit the required assignment.",
      Status: "Success",
      CourseId: 101,
      UserName: "sam_smith",
    },
    {
      ReportId: 2,
      Issue: "Missing assignment",
      Attachment: "file3.pdf",
      Content: "The student did not submit the required assignment.",
      Status: "Success",
      CourseId: 102,
      UserName: "sam_smith",
    },
    {
      ReportId: 3,
      Issue: "Missing assignment",
      Attachment: "file3.pdf",
      Content: "The student did not submit the required assignment.",
      Status: "Success",
      CourseId: 103,
      UserName: "sam_smith",
    },
    {
      ReportId: 4,
      Issue: "Missing assignment",
      Attachment: "file3.pdf",
      Content: "The student did not submit the required assignment.",
      Status: "Success",
      CourseId: 104,
      UserName: "sam_smith",
    },
    {
      ReportId: 5,
      Issue: "Missing assignment",
      Attachment: "file3.pdf",
      Content: "The student did not submit the required assignment.",
      Status: "Success",
      CourseId: 105,
      UserName: "sam_smith",
    },
    {
      ReportId: 6,
      Issue: "Missing assignment",
      Attachment: "file3.pdf",
      Content: "The student did not submit the required assignment.",
      Status: "Success",
      CourseId: 106,
      UserName: "sam_smith",
    },
  ]);

  const handleResolve = (reportId) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.ReportId === reportId ? { ...report, Status: "Resolve" } : report
      )
    );
  };

  return (
    <div className={cx("report-table-container")}>
      <div className={cx("row")}>
        <div className={cx("col-3")}>
          <div className={cx("search-feedback")}>
            <label htmlFor="search-input">Search</label>
            <div className={cx("search-input-container")}>
              <input
                id="search-input"
                type="text"
                className={cx("input-search")}
                placeholder="Enter search..."
              />
              <button type="submit" className={cx("icon-search")}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
        <div className={cx("col-4")}>
          <div className={cx("filter-container")}>
            <div className={cx("filter-row")}>
              <div className={cx("from-to")}>
                <div className={cx("from")}>
                  <label>From:</label>
                  <input type="date" />
                </div>
                <div className={cx("to")}>
                  <label>To:</label>
                  <input type="date" />
                </div>
                <button className={cx("search-button")}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className={cx("report-table")}>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Course ID</th>
            <th>User Name</th>
            <th>Issue</th>
            <th>Attachment</th>
            <th>Content</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.ReportId}>
              <td>{report.ReportId}</td>
              <td>{report.CourseId}</td>
              <td>{report.UserName}</td>
              <td>{report.Issue}</td>
              <td>{report.Attachment}</td>
              <td>{report.Content}</td>
              <td>{report.Status}</td>
              <td>
                {report.Status === "Success" && (
                  <button onClick={() => handleResolve(report.ReportId)}>
                    Resolve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportCourse;
