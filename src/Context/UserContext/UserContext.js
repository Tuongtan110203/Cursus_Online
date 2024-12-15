import React, { createContext, useState, useContext } from "react";

// Tạo context
const UserContext = createContext();

// Tạo Provider để bọc các component
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    phoneNumber: "",
    address: "",
    fullName: "",
    referralCode: "",
    email: "",
    avatar: "",
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook để dễ sử dụng
export const useUser = () => useContext(UserContext);
