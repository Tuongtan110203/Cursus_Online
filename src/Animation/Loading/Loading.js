import React from "react";
import Lottie from "lottie-react";
import loading from "./loading.json";
const Loading = () => {
  return (
    <div className="loading-container">
      <Lottie animationData={loading} loop={true} />
    </div>
  );
};

export default Loading;
