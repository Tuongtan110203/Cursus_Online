import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./Feedback.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([
    {
      FeedbackId: 1,
      Star: 5,
      Attachment: "file1.pdf",
      Content: "Great course, really helpful!",
      CreatedDate: "2024-11-01T12:00:00Z",
      CourseId: 101,
      UserName: "john_doe",
    },
    {
      FeedbackId: 2,
      Star: 4,
      Attachment: "file2.pdf",
      Content: "Good course but could be better.",
      CreatedDate: "2024-11-02T14:00:00Z",
      CourseId: 102,
      UserName: "jane_doe",
    },
    {
      FeedbackId: 3,
      Star: 3,
      Attachment: "file3.pdf",
      Content: "The course was okay, but lacked depth.",
      CreatedDate: "2024-11-03T16:00:00Z",
      CourseId: 103,
      UserName: "sam_smith",
    },
    {
      FeedbackId: 4,
      Star: 3,
      Attachment: "file3.pdf",
      Content: "The course was okay, but lacked depth.",
      CreatedDate: "2024-11-03T16:00:00Z",
      CourseId: 103,
      UserName: "sam_smith",
    },
    {
      FeedbackId: 5,
      Star: 3,
      Attachment: "file3.pdf",
      Content: "The course was okay, but lacked depth.",
      CreatedDate: "2024-11-03T16:00:00Z",
      CourseId: 103,
      UserName: "sam_smith",
    },
    {
      FeedbackId: 6,
      Star: 3,
      Attachment: "file3.pdf",
      Content: "The course was okay, but lacked depth.",
      CreatedDate: "2024-11-03T16:00:00Z",
      CourseId: 103,
      UserName: "sam_smith",
    },
    {
      FeedbackId: 7,
      Star: 3,
      Attachment: "file3.pdf",
      Content: "The course was okay, but lacked depth.",
      CreatedDate: "2024-11-03T16:00:00Z",
      CourseId: 103,
      UserName: "sam_smith",
    },
    {
      FeedbackId: 8,
      Star: 3,
      Attachment: "file3.pdf",
      Content: "The course was okay, but lacked depth.",
      CreatedDate: "2024-11-03T16:00:00Z",
      CourseId: 103,
      UserName: "sam_smith",
    },
    {
      FeedbackId: 9,
      Star: 3,
      Attachment: "file3.pdf",
      Content: "The course was okay, but lacked depth.",
      CreatedDate: "2024-11-03T16:00:00Z",
      CourseId: 103,
      UserName: "sam_smith",
    },
    {
      FeedbackId: 10,
      Star: 3,
      Attachment: "file3.pdf",
      Content: "The course was okay, but lacked depth.",
      CreatedDate: "2024-11-03T16:00:00Z",
      CourseId: 103,
      UserName: "sam_smith",
    },
    {
      FeedbackId: 11,
      Star: 3,
      Attachment: "file3.pdf",
      Content: "The course was okay, but lacked depth.",
      CreatedDate: "2024-11-03T16:00:00Z",
      CourseId: 103,
      UserName: "sam_smith",
    },
  ]);

  return (
    <div className={cx("feedback-table-container")}>
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

      <table className={cx("feedback-table")}>
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Course ID</th>
            <th>User Name</th>
            <th>Star Rating</th>
            <th>Attachment</th>
            <th>Content</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.FeedbackId}>
              <td>{feedback.FeedbackId}</td>
              <td>{feedback.CourseId}</td>
              <td>{feedback.UserName}</td>
              <td>{feedback.Star}</td>
              <td>{feedback.Attachment}</td>
              <td>{feedback.Content}</td>
              <td>{new Date(feedback.CreatedDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Feedback;
