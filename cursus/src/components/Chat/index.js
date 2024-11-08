// import React, { useEffect, useState, useRef } from "react";
// import * as signalR from "@microsoft/signalr";

// const Chat = () => {
//   const [connection, setConnection] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [message, setMessage] = useState("");
//   const userName = sessionStorage.getItem("userName");
//   const role = sessionStorage.getItem("role");
//   const token = sessionStorage.getItem("token");
//   const isConnected = useRef(false); // Sử dụng useRef để theo dõi trạng thái kết nối

//   useEffect(() => {
//     // Kiểm tra xem có kết nối chưa
//     if (connection) return;

//     const connect = async () => {
//       const newConnection = new signalR.HubConnectionBuilder()
//         .withUrl("https://localhost:7269/chatHub", {
//           accessTokenFactory: () => token,
//         })
//         .withAutomaticReconnect()
//         .build();

//       // Đăng ký sự kiện chỉ một lần
//       newConnection.on("ReceiveMessage", (sender, recipient, message) => {
//         setMessages((prevMessages) => {
//           const updatedMessages = { ...prevMessages };

//           // Nếu sender chưa có trong messages, khởi tạo nó
//           if (!updatedMessages[sender]) {
//             updatedMessages[sender] = [];
//           }

//           // Kiểm tra xem tin nhắn đã tồn tại chưa
//           const messageExists = updatedMessages[sender].some(
//             (msg) => msg.message === message && msg.sender === sender
//           );

//           // Nếu chưa tồn tại thì thêm vào
//           if (!messageExists) {
//             updatedMessages[sender].push({ sender, recipient, message });
//           }

//           return updatedMessages; // Trả về danh sách tin nhắn đã cập nhật
//         });
//       });

//       try {
//         await newConnection.start();
//         setConnection(newConnection); // Cập nhật kết nối vào state
//         console.log("Connected to chat hub");
//       } catch (error) {
//         console.error("Connection failed: ", error);
//       }
//     };

//     connect();

//     return () => {
//       // Dừng kết nối khi component bị hủy
//       if (connection) {
//         connection.stop().then(() => {
//           console.log("Connection stopped");
//         });
//       }
//     };
//   }, [connection, token]); // Chỉ chạy khi token thay đổi

//   const handleSendMessage = async () => {
//     if (message && connection) {
//       try {
//         if (role === "Admin") {
//           const studentName = prompt("Nhập tên sinh viên để gửi tin nhắn:");
//           if (studentName) {
//             await connection.invoke(
//               "SendMessageToStudent",
//               studentName,
//               message
//             );
//           }
//         } else {
//           await connection.invoke("SendMessageToAdmin", message);
//         }
//         setMessage(""); // Xóa input sau khi gửi
//       } catch (error) {
//         console.error("Error sending message:", error);
//         alert("Có lỗi xảy ra khi gửi tin nhắn."); // Thông báo cho người dùng
//       }
//     }
//   };

//   return (
//     <div>
//       <h3>Chat</h3>
//       <div
//         style={{
//           maxHeight: "300px",
//           overflowY: "auto",
//           border: "1px solid #ccc",
//           padding: "10px",
//         }}
//       >
//         {Object.keys(messages).map((student, index) => (
//           <div key={index}>
//             {/* // <h4>{student}:11</h4> */}
//             {messages[student]?.map((msg, idx) => (
//               <div key={idx}>
//                 <strong>{msg.sender}:</strong> {msg.message}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//         style={{ width: "70%", marginRight: "10px" }} // Thêm kiểu dáng
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;
