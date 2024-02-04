import { useState } from "react";
import { useContext } from "react";
import { ToastContext } from "../../ui/toast/ToastProvider";

/**
 * Custom hook for managing input state.
 *
 * @param {*} initialValue - The initial value for the input state.
 * @returns {Array} - An array containing the input value and a function to update the input value.
 */
export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
};

export const useToast = () => {
  const showToast = useContext(ToastContext);
  const toast = {
    info(message) {
      showToast(message, "info");
    },

    success(message) {
      showToast(message, "success");
    },
    
    warning(message) {
      showToast(message, "warning");
    },

    error(message) {
      showToast(message, "error");
    }
  };

  return showToast ? toast : "useToast must be inside a ToastProvider";
};