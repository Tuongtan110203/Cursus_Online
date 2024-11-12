import { useState } from "react";
import classNames from "classnames/bind";
import style from "./Checkout.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import course1 from "~/images/course1.jpg";
import course2 from "~/images/course2.jpg";
import course3 from "~/images/course3.jpg";
import Momo from "~/images/momo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcPaypal, faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import LockIcon from "@mui/icons-material/Lock";

const cx = classNames.bind(style);

function Checkout() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "100 Days of Code: The Complete Python Pro Bootcamp",
      instructor: "Instructor A",
      newPrice: 12,
      oldPrice: 30,
      image: course1,
    },
    {
      id: 2,
      name: "Python Mega Course: Learn Python in 60 Days, Build 20 Apps",
      instructor: "Instructor A",
      newPrice: 34,
      oldPrice: 50,
      image: course2,
    },
    {
      id: 3,
      name: "Become a Certified Web Developer: HTML, CSS and JavaScript",
      instructor: "Instructor A",
      newPrice: 45,
      oldPrice: 60,
      image: course3,
    },
  ]);

  // Calculate total price
  const totalPrice = courses.reduce((acc, course) => acc + course.newPrice, 0);

  const originatePrice = courses.reduce(
    (acc, course) => acc + course.oldPrice,
    0
  );
  const discount = courses.reduce(
    (acc, course) => acc + (course.oldPrice - course.newPrice),
    0
  );
  return (
    <>
      <section className={cx("section-checkout-header")}>
        <header>
          <Header />
        </header>
      </section>
      <section className={cx("section-checkout-content")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-7", "checkout-form")}>
              <h4>Payment Information</h4>
              <form>
                <label htmlFor="fullName">Full Name*</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Input Full Name"
                />

                <label htmlFor="address">Address*</label>
                <input type="text" id="address" placeholder="Input Address" />

                <label htmlFor="phone">Phone*</label>
                <input type="tel" id="phone" placeholder="Input Phone" />

                <label htmlFor="email">Email*</label>
                <input type="email" id="email" placeholder="Input Email" />
              </form>
              <div className={cx("additional-information")}>
                <h4>Additional information</h4>
                <p>Order notes (optional)</p>
                <form>
                  <textarea placeholder="Notes about the order, e.g. more detailed delivery time or location instructions" />
                </form>
              </div>
            </div>
            <div className={cx("col-5", "checkout-summary")}>
              <h4>Your Order</h4>
              <div
                className={cx("container", "wrapper-order-details")}
                style={{ marginTop: "30px" }}
              >
                <div className={cx("row")}>
                  {courses.map((course) => (
                    <div
                      className={cx("col-12")}
                      key={course.id}
                      style={{
                        display: "flex",
                        padding: "0",
                        marginBottom: "10px",
                      }}
                    >
                      <div className={cx("col-3")} style={{ padding: "0" }}>
                        <div className={cx("image-order-details")}>
                          <img src={course.image} alt={course.name} />
                        </div>
                      </div>
                      <div className={cx("col-7")} style={{ padding: "0" }}>
                        <div className={cx("content-order-details")}>
                          <p>{course.name}</p>
                        </div>
                      </div>
                      <div
                        className={cx("col-2")}
                        style={{ padding: "0", marginLeft: "20px" }}
                      >
                        <div className={cx("price-course")}>
                          <div className={cx("new-price")}>
                            <p>{course.newPrice} USD</p>
                          </div>
                          <div className={cx("old-price")}>
                            <del>
                              <p>{course.oldPrice} USD</p>
                            </del>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={cx("total-price")}>
                  <h4>Summary</h4>
                  <div className={cx("originate-price")}>
                    <h5>
                      Original Price: <b>{originatePrice} USD</b>
                    </h5>
                  </div>
                  <div className={cx("discount")}>
                    <h5>
                      Discounts: <b>- {discount} USD</b>
                    </h5>
                  </div>
                  <div className={cx("total-price-final")}>
                    <h5>
                      Total: <b>{totalPrice} USD</b>
                    </h5>
                  </div>
                </div>
              </div>
              <div className={cx("payment-method")}>
                <h4>Payment Method</h4>
                <div className={cx("cash")}>
                  <label>Cash</label>
                  <FontAwesomeIcon icon={faWallet} />
                  <input type="radio" name="payment" value="cash" />
                </div>
                <div className={cx("paypal")}>
                  <label>Paypal</label>
                  <FontAwesomeIcon icon={faCcPaypal} />
                  <input type="radio" name="payment" value="paypal" />
                </div>
              </div>
              <section className={cx("proceed")}>
                <p>
                  By completing your purchase you agree to these{" "}
                  <a href="/term-policy">Terms of Service</a>.
                </p>
                <div className={cx("button-proceed")}>
                  <a href="/order-received">
                    <button type="button">
                      <LockIcon />
                      Proceed
                    </button>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      <section className={cx("section-checkout-footer")}>
        <Footer />
      </section>
    </>
  );
}

export default Checkout;
