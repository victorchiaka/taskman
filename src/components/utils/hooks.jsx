import { useState, useContext } from "react";
import { AuthContext, ToastContext } from "../../Contexts";
import { jwtDecode } from "jwt-decode";

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
    }
  };

  return showToast ? toast : "useToast must be inside a ToastProvider";
};

/**
 * Custom hook for managing user authentication state and actions.
 * 
 * @returns {object} An object containing authentication-related state and functions.
 */
export const useAuth = () => {

  const { authUser, setAuthUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  /**
  * Function to handle user login.
  * @param {object} tokens Object containing access and refresh tokens.
  */
  const login = (tokens) => {
    const access = String(tokens["access"]);
    const refresh = String(tokens["refresh"]);
    const decodedAccessToken = jwtDecode(access);

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    setIsAuthenticated(true);
    setAuthUser(decodedAccessToken.username);
  }

  /**
   * Function to handle user logout.
   * @param{} accepts no parameter
  */
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setIsAuthenticated(false);
    setAuthUser(null);
  }

  return {
    authUser,
    isAuthenticated,
    login,
    logout,
  };
}
