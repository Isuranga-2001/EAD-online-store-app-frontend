import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingScreen: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <ClipLoader color="#3066be" loading={true} size={50} />
    </div>
  );
};

export default LoadingScreen;
