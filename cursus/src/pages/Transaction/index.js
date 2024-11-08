import React from "react";
import classNames from "classnames/bind";
import styles from "./Transaction.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";

const cx = classNames.bind(styles);

function Transaction() {
  const transactions = [
    {
      OrderCode: "ORD001",
      CreatedDate: "2024-11-08",
      Amount: 500000,
      Description: "Payment for course A",
      Status: "Success",
    },
    {
      OrderCode: "ORD002",
      CreatedDate: "2024-11-07",
      Amount: 300000,
      Description: "Payment for course B",
      Status: "Pending",
    },
    {
      OrderCode: "ORD003",
      CreatedDate: "2024-11-06",
      Amount: 450000,
      Description: "Payment for course C",
      Status: "Fail",
    },
    {
      OrderCode: "ORD004",
      CreatedDate: "2024-11-06",
      Amount: 450000,
      Description: "Payment for course D",
      Status: "Fail",
    },
    {
      OrderCode: "ORD005",
      CreatedDate: "2024-11-06",
      Amount: 450000,
      Description: "Payment for course E",
      Status: "Success",
    },
  ];
  var count = 1;
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className={cx("wrapper-transaction")}>
        <div className={cx("container")}>
          <h1>Transaction</h1>
          <table className={cx("transaction-table")}>
            <thead>
              <tr>
                <th></th>
                <th>Order Code</th>
                <th>Created Date</th>
                <th>Amount (VND)</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.TransactionId}>
                  <td>{count++}</td>
                  <td>{transaction.OrderCode}</td>
                  <td>{transaction.CreatedDate}</td>
                  <td>{transaction.Amount.toLocaleString()}</td>
                  <td>{transaction.Description}</td>
                  <td
                    className={cx("status", transaction.Status.toLowerCase())}
                  >
                    {transaction.Status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Transaction;
