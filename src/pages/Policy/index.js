import classNames from "classnames/bind";
import style from "./Policy.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";

const cx = classNames.bind(style);

function TermPolicy() {
  return (
    <>
      <section className={cx("section-term-policy-header")}>
        <header>
          <Header />
        </header>
      </section>
      <section className={cx("section-term-policy-content")}>
        <div className={cx("container")}>
          <h1>Terms of Service</h1>
          <p>
            Welcome to our terms of service. Please read these terms carefully
            as they outline your responsibilities and the terms you agree to
            when using our service.
          </p>

          <h2>1. Overview</h2>
          <p>
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement.
          </p>

          <h2>2. User Responsibilities</h2>
          <p>
            You agree to use the service responsibly, following all applicable
            laws and regulations. Any misuse of the service may lead to account
            suspension or termination.
          </p>

          <h2>3. Privacy Policy</h2>
          <p>
            Your privacy is important to us. Our privacy policy explains how we
            collect, use, and protect your information.
          </p>

          <h2>4. Payment Terms</h2>
          <p>
            Payments for our services must be made in a timely manner. Any
            overdue payments may incur additional fees or result in account
            restrictions. All transactions are securely processed to protect
            your information.
          </p>
          <p>
            In case of disputes or chargebacks, please contact our support team
            for assistance. We reserve the right to suspend or terminate
            services for unpaid invoices.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            We are not liable for any damages that may result from your use of
            the service.
          </p>

          <h2>6. Updates to Terms</h2>
          <p>
            We may update these terms from time to time. Please check back
            regularly to stay informed of any changes.
          </p>

          <p>Thank you for using our service!</p>
        </div>
      </section>
      <section className={cx("section-term-policy-footer")}>
        <Footer />
      </section>
    </>
  );
}

export default TermPolicy;
