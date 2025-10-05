// utils/jhSweetAlert.js
import Swal from "sweetalert2";

// Image crop function__
export const getCroppedImg = (imageSrc, croppedAreaPixels) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = "cropped.jpeg";
        resolve({
          file: blob,
          url: URL.createObjectURL(blob),
        });
      }, "image/jpeg");
    };
    image.onerror = (err) => reject(err);
  });
};

// JH Theme Configuration
const JH_SWAL_CONFIG = {
  background: "#ffffff",
  color: "#1f2937",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  confirmButtonColor: "#3C8F63",
  cancelButtonColor: "#6b7280",
  buttonsStyling: true,
  customClass: {
    container: "jh-swal-container",
    popup: "jh-swal-popup",
    header: "jh-swal-header",
    title: "jh-swal-title",
    closeButton: "jh-swal-close",
    icon: "jh-swal-icon",
    image: "jh-swal-image",
    content: "jh-swal-content",
    input: "jh-swal-input",
    actions: "jh-swal-actions",
    confirmButton: "jh-swal-confirm-btn",
    cancelButton: "jh-swal-cancel-btn",
    footer: "jh-swal-footer",
  },
};

// JH Theme Toast Configuration
const JH_TOAST_CONFIG = {
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: "#ffffff",
  color: "#1f2937",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(60, 143, 99, 0.1)",
  customClass: {
    popup: "jh-toast-popup",
    timerProgressBar: "jh-toast-progress-bar",
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
};

// Create JH Theme Toast instance
export const jhToast = Swal.mixin({
  ...JH_SWAL_CONFIG,
  ...JH_TOAST_CONFIG,
});

// Custom JH Theme Toast Functions
export const jhToastSuccess = (title, text = "") => {
  return jhToast.fire({
    icon: "success",
    title,
    text,
  });
};

export const jhToastError = (title, text = "") => {
  return jhToast.fire({
    icon: "error",
    title,
    text,
  });
};

export const jhToastWarning = (title, text = "") => {
  return jhToast.fire({
    icon: "warning",
    title,
    text,
  });
};

export const jhToastInfo = (title, text = "") => {
  return jhToast.fire({
    icon: "info",
    title,
    text,
  });
};

// Your existing alert functions...
export const jhConfirm = (options) => {
  return Swal.fire({
    ...JH_SWAL_CONFIG,
    ...options,
    showCancelButton: true,
    confirmButtonText: options.confirmButtonText || "Confirm",
    cancelButtonText: options.cancelButtonText || "Cancel",
    icon: options.icon || "warning",
  });
};

export const jhSuccess = (options) => {
  return Swal.fire({
    ...JH_SWAL_CONFIG,
    ...options,
    icon: "success",
    showConfirmButton: true,
    timer: options.timer || 2000,
  });
};

export const jhError = (options) => {
  return Swal.fire({
    ...JH_SWAL_CONFIG,
    ...options,
    icon: "error",
    confirmButtonColor: "#ef4444",
  });
};

export const jhInfo = (options) => {
  return Swal.fire({
    ...JH_SWAL_CONFIG,
    ...options,
    icon: "info",
    confirmButtonColor: "#3b82f6", // Blue color for info
    showConfirmButton: true,
  });
};

export const jhWarning = (options) => {
  return Swal.fire({
    ...JH_SWAL_CONFIG,
    ...options,
    icon: "warning",
    confirmButtonColor: "#f59e0b",
  });
};

export default JH_SWAL_CONFIG;