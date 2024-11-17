import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./Payout.module.scss";
import Button from "@mui/material/Button";

const cx = classNames.bind(style);

function Payout() {
  const [payouts, setPayouts] = useState([]);
  const [selectedPayouts, setSelectedPayouts] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSelectPayout = (id) => {
    setSelectedPayouts(!selectedPayouts);
  };
  const handleSubmit = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSelectedPayouts(false);
    setEmail("");
  };
  useEffect(() => {
    const mockData = [
      {
        payoutId: 1,
        amount: 500.0,
        payoutDate: "2024-11-15",
        status: "Success",
        reason: "Monthly Payout",
        responses: [
          {
            payoutResponseId: 1,
            isApproved: true,
            responseDate: "2024-11-16",
            comment: "Approved by admin",
          },
        ],
      },
      {
        payoutId: 2,
        amount: 300.0,
        payoutDate: "2024-11-10",
        status: "Pending",
        reason: "Ad-hoc Payout",
        responses: [],
      },
    ];
    setPayouts(mockData);
  }, []);

  return (
    <section className={cx("section-payout")}>
      <div className={cx("content-payout")}>
        <h2>Payout Information</h2>
        <table className={cx("payout-table")}>
          <thead>
            <tr>
              <th>Payout ID</th>
              <th>Amount</th>
              <th>Payout Date</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Responses</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout) => (
              <tr key={payout.payoutId}>
                <td>{payout.payoutId}</td>
                <td>{payout.amount.toLocaleString()}</td>
                <td>{payout.payoutDate}</td>
                <td>{payout.status}</td>
                <td>{payout.reason}</td>
                <td>
                  {payout.responses.length > 0 ? (
                    <ul>
                      {payout.responses.map((response) => (
                        <li key={response.payoutResponseId}>
                          <b>Approved:</b> {response.isApproved ? "Yes" : "No"}{" "}
                          | <b>Date:</b> {response.responseDate} |{" "}
                          <b>Comment:</b> {response.comment}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <b>No Responses</b>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={cx("button-wrapper")}>
          <Button variant="contained" onClick={handleSelectPayout}>
            Payouts
          </Button>
        </div>
      </div>
      {selectedPayouts && (
        <div className={cx("dialog-payout")}>
          <h2>Enter Account Paypal</h2>
          <input
            type="email"
            placeholder="Enter account"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className={cx("error")}>{error}</p>}
          <div className={cx("dialog-buttons")}>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setSelectedPayouts(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Payout;
