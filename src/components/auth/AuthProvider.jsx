import { AuthContext } from "../../Contexts";
import PropTypes from "prop-types";
import { createAuthProvider } from "../utils/tokens";

const AuthProvider = ({ children }) => {
  const { useAuth, getToken, login, logout, getAuthenticatedUser } = createAuthProvider();

  const authValue = {
    useAuth,
    getToken,
    login,
    logout,
    getAuthenticatedUser,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
