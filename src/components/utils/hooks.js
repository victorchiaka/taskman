import { useState, useContext } from "react";
import { ToastContext } from "../../Contexts";

/**
 * Custom hook for managing input state.
 *
 * @param {*} initialValue - The initial value for the input state.
 * @returns {Array} - An array containing the input value and a function to update the input value.
 */
export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: (e) => setValue(e.target.value) },
    () => setValue(initialValue),
  ];
};

/**
 * Custom hook for displaying toast messages.
 *
 * @returns {object|string} An object containing functions for displaying different types of toast messages,
 * or a string indicating that the hook must be used within a ToastProvider.
 */
export const useToast = () => {
  const showToast = useContext(ToastContext);
  const toast = {
    /**
     * Display an informational toast ui with the specified message.
     * @param {string} message The message to display.
     */
    info(message) {
      showToast(message, "info");
    },

    /**
     * Display a success toast ui with the specified message.
     * @param {string} message The message to display.
     */
    success(message) {
      showToast(message, "success");
    },

    /**
     * Display a warning toast ui with the specified message.
     * @param {string} message The message to display.
     */
    warning(message) {
      showToast(message, "warning");
    },

    /**
     * Display an error toast ui with the specified message.
     * @param {string} message The message to display.
     */
    error(message) {
      showToast(message, "error");
    },
  };

  return showToast ? toast : "useToast must be inside a ToastProvider";
};
