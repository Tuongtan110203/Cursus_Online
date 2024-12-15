import React, { createContext, useState, useContext, useEffect } from "react";
import BookMarkAPI from "~/API/BookMarkAPI";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkItems, setBookmarkItems] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const response = await BookMarkAPI().GetBookMarkByUserName();
      setBookmarkItems(response);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <BookmarkContext.Provider value={{ bookmarkItems, fetchBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
