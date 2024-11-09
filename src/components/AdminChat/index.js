// import React, { useEffect, useState } from "react";
// import * as signalR from "@microsoft/signalr";

// const AdminChat = ({ userName, role }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [connection, setConnection] = useState(null);

//   useEffect(() => {
//     const connect = async () => {
//       const conn = new signalR.HubConnectionBuilder()
//         .withUrl("http://localhost:7269/chatHub", {
//           accessTokenFactory: () => sessionStorage.getItem("token"),
//         })
//         .build();

//       conn.on("ReceiveMessage", (sender, receivedMessage) => {
//         setMessages((prev) => [...prev, { sender, message: receivedMessage }]);
//       });

//       try {
//         await conn.start();
//         console.log("Connected to SignalR hub");
//         setConnection(conn);
//       } catch (err) {
//         console.error("Connection error: ", err);
//       }
//     };

//     connect();

//     return () => {
//       connection && connection.stop();
//     };
//   }, [connection]);

//   const sendMessage = async () => {
//     if (message && connection) {
//       await connection.invoke("SendMessageToAllStudents", message);
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Chat</h2>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.sender}:</strong> {msg.message}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Enter your message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default AdminChat;
