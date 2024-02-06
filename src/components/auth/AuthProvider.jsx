import { AuthContext } from "../../Contexts";
import PropTypes from "prop-types";
import { useAuth } from "../utils/hooks";

const AuthProvider = ({ children }) => {

  const { authUser, isAuthenticated, login, logout } = useAuth(); // Use the useAuth hook

  const authProviderValue = {
    authUser,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}

export default AuthProvider;