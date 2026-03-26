 // src/components/Notification.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const notifyError = (msg) => {
  toast.error(msg, {
    position: "top-right", 
    autoClose: 3000,
  });
};

export const notifyInfo = (msg) => {
  toast.info(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const notifyWarning = (msg) => {
  toast.warning(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};

// Add ToastContainer once (usually in App.js)
export const NotificationContainer = () => (
  <ToastContainer />
);
