import { AuthContext } from "../../Contexts";
import PropTypes from "prop-types";
import { createAuthProvider } from "../utils/tokens";

const AuthProvider = ({ children }) => {
  const { useAuth, getTokens, login, logout } = createAuthProvider();

  const authValue = {
    useAuth,
    getTokens,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
