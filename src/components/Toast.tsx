import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Toast component renders a ToastContainer with predefined settings.
 *
 * @returns {JSX.Element} The rendered Toast component.
 */
const Toast: React.FC = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      style={{ zIndex: 9999 }}
    />
  );
};

export default Toast;
