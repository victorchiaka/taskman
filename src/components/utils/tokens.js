import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp < Math.floor(Date.now() / 1000);
  } catch (error) {
    return true;
  }
};
