import { useState, useEffect, useRef } from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faRocketchat,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
//import zalo
import Zalo from "~/images/zalo.png";
import Phone from "~/images/phone.png";
import { Link } from "react-router-dom";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Footer() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const inputRef = useRef(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const smoothScrollToTop = () => {
    const scrollDuration = 500;
    const scrollStep = -window.scrollY / (scrollDuration / 15);

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: "user", text: message }]);
      setMessage("");
    }
  };

  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className={cx("wrapper-footer")}>
      <div className={cx("load-animation")}>
        <div className={cx("effect-animation")}></div>
        <div className={cx("container")}>
          <div className="row">
            <div className={cx("col")}>
              <h2 className={cx("footer-information")}>Contact Information</h2>
              <ul>
                <li>
                  <strong>Địa chỉ:</strong>&nbsp;Đường XYZ Quận A Tỉnh B
                </li>
                <li>
                  <strong>Điện thoại:</strong>&nbsp;123.456.xxx
                </li>
                <li>
                  <strong>Email:</strong>&nbsp;cskh@webdemo.com
                </li>
                <li>
                  <strong>Thời gian:</strong>&nbsp;8:00h - 18h:00
                </li>
                <li>
                  <strong>Website:</strong> www.webdemo.com
                </li>
              </ul>
              <div className={cx("social-icon")}>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    className={cx("icon", "facebook-icon")}
                    icon={faFacebook}
                  />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    className={cx("icon", "instagram-icon")}
                    icon={faInstagram}
                  />
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    className={cx("icon", "tiktok-icon")}
                    icon={faTiktok}
                  />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    className={cx("icon", "youtube-icon")}
                    icon={faYoutube}
                  />
                </a>
              </div>
            </div>
            <div className={cx("col")}>
              <h2 className={cx("footer-information")}>Contact Information</h2>
              <ul>
                <li>
                  <strong>Địa chỉ:</strong>&nbsp;Đường XYZ Quận A Tỉnh B
                </li>
                <li>
                  <strong>Điện thoại:</strong>&nbsp;123.456.xxx
                </li>
                <li>
                  <strong>Email:</strong>&nbsp;cskh@webdemo.com
                </li>
                <li>
                  <strong>Thời gian:</strong>&nbsp;8:00h - 18h:00
                </li>
                <li>
                  <strong>Website:</strong> www.webdemo.com
                </li>
              </ul>
            </div>
            <div className={cx("col")}>
              <h2 className={cx("footer-information")}>Contact Information</h2>
              <ul>
                <li>
                  <strong>Địa chỉ:</strong>&nbsp;Đường XYZ Quận A Tỉnh B
                </li>
                <li>
                  <strong>Điện thoại:</strong>&nbsp;123.456.xxx
                </li>
                <li>
                  <strong>Email:</strong>&nbsp;cskh@webdemo.com
                </li>
                <li>
                  <strong>Thời gian:</strong>&nbsp;8:00h - 18h:00
                </li>
                <li>
                  <strong>Website:</strong> www.webdemo.com
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={cx("footer-extra")}>
          <p>© 2024 Cursus Online By Nguyen Tan Tuong. All rights reserved.</p>
        </div>
        <div className={cx("button-contact")}>
          <div
            className={cx("button-zalo")}
            onClick={() => window.open("https://zalo.me/0865429351", "_blank")}
          >
            <img src={Zalo} alt="Zalo" />
          </div>
          <div
            className={cx("button-phone")}
            onClick={() => window.open("https://zalo.me/0865429351", "_blank")}
          >
            <img src={Phone} alt="Phone" />
          </div>
        </div>

        <div className={cx("button-angle-up")} onClick={smoothScrollToTop}>
          <div className={cx("icon-angle-up")}>
            <FontAwesomeIcon icon={faAngleUp} />
          </div>
        </div>

        {isChatOpen && (
          <div className={cx("chat-box")}>
            <div className={cx("chat-header")}>
              <h4>Chat with Admin</h4>
              <button onClick={toggleChat} className={cx("close-chat")}>
                X
              </button>
            </div>
            <div className={cx("chat-body")}>
              {chatHistory.map((chat, index) => (
                <p key={index}>
                  <strong>{chat.sender}:</strong> {chat.text}
                </p>
              ))}
            </div>
            <div className={cx("chat-input")}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={handleKeyPress}
                ref={inputRef}
              />
              <button
                className={cx("send-message")}
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        )}
        <div className={cx("button-chat")}>
          <div className={cx("icon-chat")} onClick={toggleChat}>
            <a>
              <FontAwesomeIcon icon={faRocketchat} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
