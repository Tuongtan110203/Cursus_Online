import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Transaction.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import TransactionAPI from "~/API/TransactionAPI";

const cx = classNames.bind(styles);

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  // get transaction by userName
  const getTransactionByUserName = async () => {
    try {
      const data = await TransactionAPI().getTransactionByUserName();
      if (Array.isArray(data)) {
        setTransactions(data); // Chỉ set nếu data là mảng
      } else {
        setTransactions([]); // Nếu không phải mảng, đặt về rỗng
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setTransactions([]); // Đặt transactions về mảng rỗng nếu 404
      } else {
        console.error("Lỗi khi lấy dữ liệu giao dịch:", error);
      }
    }
  };

  useEffect(() => {
    getTransactionByUserName();
  }, []);
  // end get transaction by user name

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className={cx("wrapper-transaction")}>
        <div className={cx("container")}>
          <h1>Transaction</h1>
          {transactions && transactions.length === 0 ? (
            <div className={cx("no-transaction")}>
              <p>😔 No Transactions for you</p>
            </div>
          ) : (
            <table className={cx("transaction-table")}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order Code</th>
                  <th>Created Date</th>
                  <th>Amount (VND)</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={transaction.transactionId}>
                    <td>{index + 1}</td>
                    <td>{transaction.orderCode}</td>
                    <td>{transaction.createdDate}</td>
                    <td>{transaction.amount.toLocaleString()}</td>
                    <td>{transaction.description}</td>
                    <td
                      className={cx("status", transaction.status.toLowerCase())}
                    >
                      {transaction.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Transaction;
