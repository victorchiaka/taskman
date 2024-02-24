import { AuthContext } from "../../Contexts";
import PropTypes from "prop-types";
import { useState } from "react";

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jwtToken, setJwtToken] = useState(null);

  const authValue = {
    authUser,
    setAuthUser,
    isAuthenticated,
    setIsAuthenticated,
    jwtToken,
    setJwtToken,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
