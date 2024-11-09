import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
//import className và scss
import classNames from "classnames/bind";
import styles from "./ForgotPassword.module.scss";

const cx = classNames.bind(styles);

function ForgotPassword() {
  return (
    <div>
      <Header />
      <div className={cx("forgot-password", "margin-bottom-footer")}>
        <div className={cx("container")}>
          <p>
            Forgot your password? Please enter your username or email address.
            You will receive a link to create a new password via email.
          </p>
          <b>
            <p>Please Input Email or Username</p>
          </b>
          <input
            type="text"
            placeholder="Please input email or username"
            className={cx("input-forgot")}
          />
          <button type="button" className={cx("btn btn-primary")}>
            Forgot Password
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
