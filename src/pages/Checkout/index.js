import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./Checkout.module.scss";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcPaypal, faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import LockIcon from "@mui/icons-material/Lock";
import UserAPI from "~/API/UserAPI";
import CartAPI from "~/API/CartAPI";
import { toast } from "react-toastify"; // Import thư viện thông báo nếu cần
import "react-toastify/dist/ReactToastify.css"; // Import CSS nếu dùng react-toastify
import { useNavigate } from "react-router-dom"; // Add the useNavigate hook

const cx = classNames.bind(style);

function Checkout() {
  const [profileUser, setProfileUser] = useState({}); // profile
  const [wallet, setWallet] = useState({}); // wallet
  const [paymentMethod, setPaymentMethod] = useState("Cash"); // Manage payment method selection
  const [termsAccepted, setTermsAccepted] = useState(false); // Manage the state of the checkbox
  const [noticed, setNoticed] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate
  const [checkOut, setCheckOut] = useState({});
  //cart
  //  const { cartData, setCartData, fetchCart, isLoading } = useCart();
  const [cartData, setCartData] = useState([]);
  const fetchCart = async () => {
    try {
      const response = await CartAPI().getCart();
      setCartData(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  // get profile user
  const getProfileUser = async () => {
    try {
      const response = await UserAPI().getProfileByUserName();
      setProfileUser(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProfileUser();
  }, []);
  //end get profile user

  // get wallet by user Name
  const getWalletByUserName = async () => {
    try {
      const response = await UserAPI().getWalletByUserName();
      setWallet(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getWalletByUserName();
  }, []);
  // end get wallet by user name

  // payment method
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked); // Update state based on checkbox
  };

  const handleProceedClick = async () => {
    if (!termsAccepted) {
      toast.error("You must agree to the Terms of Service before proceeding.");
      return;
    }
    // if (!cartData || cartData.totalItems === 0) {
    //   toast.error("Your cart is empty. Please add items before proceeding.");
    //   return;
    // }
    if (paymentMethod === "Cash") {
      await checkOutItem(); // Gọi hàm checkout
    } else if (paymentMethod === "Paypal") {
      await checkoutWithPayPal();
    }
  };
  console.log("Checkout ", checkOut);
  //end payment method

  //checkout
  const referralCode = "";
  const checkOutItem = async () => {
    try {
      const response = await CartAPI().checkout(referralCode);
      setCheckOut(response); // Cập nhật statec
      if (response.status === "Success") {
        fetchCart();
        toast.success(
          "Order successful. Your order ID is: " + response.orderCode
        );
        navigate("/order-received-checkout", {
          state: { paymentMethod, noticed, profileUser, orderInfo: response },
        });
      } else if (response.status === 400) {
        toast.error("Cart is empty.");
      } else if (response.status === "Pending") {
        fetchCart();

        toast.warning(response.message); // Sử dụng message từ response
      }
    } catch (error) {
      console.error("Failed to checkout:", error);
      toast.error("Failed to checkout. Please try again.");
    }
  };
  // end checkout
  //notice
  const handleChangeNotice = (e) => {
    const { name, value } = e.target;
    setNoticed((prevState) => ({
      ...prevState,
      [name]: value, // Lưu nội dung `textarea` theo key `name`
    }));
  };
  // notice

  //paypal
  const checkoutWithPayPal = async () => {
    try {
      const response = await CartAPI().checkOutWithPayPal(
        checkOut.orderId,
        referralCode
      );
      console.log(response);
      window.location.href = response.approvalUrl;
    } catch (error) {
      console.error(error);
    }
  };
  //paypal

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
                  readOnly
                  type="text"
                  name="fullName"
                  value={profileUser.fullName || ""}
                  placeholder="Input Full Name"
                />

                <label htmlFor="address">Address*</label>
                <input
                  readOnly
                  type="text"
                  name="address"
                  value={profileUser.address || ""}
                  placeholder="Input Address"
                />

                <label htmlFor="phone">Phone*</label>
                <input
                  readOnly
                  type="tel"
                  name="phoneNumber"
                  value={profileUser.phoneNumber || ""}
                  placeholder="Input Phone"
                />

                <label htmlFor="email">Email*</label>
                <input
                  readOnly
                  type="email"
                  name="email"
                  value={profileUser.email || ""}
                  placeholder="Input Email"
                />
              </form>
              <div className={cx("additional-information")}>
                <h4>Additional information</h4>
                <p>Order notes (optional)</p>
                <textarea
                  name="additionalNotes" // Tên để quản lý trạng thái
                  value={noticed.additionalNotes || ""} // Lấy giá trị từ state
                  onChange={handleChangeNotice} // Gọi hàm xử lý khi thay đổi
                  placeholder="Write any additional notes or instructions here..."
                  rows={4} // Số dòng hiển thị mặc định
                  style={{ width: "100%", padding: "10px" }} // Style tùy chỉnh
                />
              </div>
            </div>
            <div className={cx("col-5", "checkout-summary")}>
              <h4>Your Order</h4>
              <div
                className={cx("container", "wrapper-order-details")}
                style={{ marginTop: "30px" }}
              >
                <div className={cx("row")}>
                  {cartData.cartItems && cartData.cartItems.length > 0 ? (
                    cartData.cartItems.map((item) => (
                      <div
                        className={cx("col-12")}
                        key={item.courseId}
                        style={{
                          display: "flex",
                          padding: "0",
                          marginBottom: "10px",
                        }}
                      >
                        <div className={cx("col-3")} style={{ padding: "0" }}>
                          <div className={cx("image-order-details")}>
                            <img src={item.image} alt={item.courseTitle} />
                          </div>
                        </div>
                        <div className={cx("col-7")} style={{ padding: "0" }}>
                          <div className={cx("content-order-details")}>
                            <p>{item.courseTitle}</p>
                          </div>
                        </div>
                        <div
                          className={cx("col-2")}
                          style={{ padding: "0", marginLeft: "20px" }}
                        >
                          <div className={cx("price-course")}>
                            <div className={cx("new-price")}>
                              <p>{item.newPrice} USD</p>
                            </div>
                            <div className={cx("old-price")}>
                              <del>
                                <p>{item.oldPrice} USD</p>
                              </del>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No items in the cart</p>
                  )}
                </div>
                <div className={cx("total-price")}>
                  <h4>Summary</h4>
                  <div className={cx("originate-price")}>
                    <h5>
                      Total Items: <b>{cartData.totalItems}</b>
                    </h5>
                  </div>
                  <div className={cx("originate-price")}>
                    <h5>
                      Original Price: <b>{cartData.subTotal} USD</b>
                    </h5>
                  </div>
                  <div className={cx("discount")}>
                    <h5>
                      Discounts: <b>- {cartData.totalDiscount} USD</b>
                    </h5>
                  </div>
                  <div className={cx("total-price-final")}>
                    <h5>
                      Total: <b>{cartData.totalPrice} USD</b>
                    </h5>
                  </div>
                </div>
              </div>
              <div className={cx("payment-method")}>
                <h4>Payment Method (Your wallet: ${wallet.balance})</h4>
                <div className={cx("cash")}>
                  <label>Cash</label>
                  <FontAwesomeIcon icon={faWallet} />
                  <input
                    type="radio"
                    name="payment"
                    value="Cash"
                    checked={paymentMethod === "Cash"}
                    onChange={handlePaymentMethodChange}
                  />{" "}
                </div>
                <div className={cx("paypal")}>
                  <label>Paypal</label>
                  <FontAwesomeIcon icon={faCcPaypal} />
                  <input
                    type="radio"
                    name="payment"
                    value="Paypal"
                    checked={paymentMethod === "Paypal"}
                    onChange={handlePaymentMethodChange}
                  />{" "}
                </div>
              </div>
              <section className={cx("proceed")}>
                <p>
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={handleTermsChange}
                  />
                  By completing your purchase you agree to these{" "}
                  <a href="/term-policy">Terms of Service</a>.
                </p>
                <div className={cx("button-proceed")}>
                  <button type="button" onClick={handleProceedClick}>
                    <LockIcon />
                    Proceed
                  </button>
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
