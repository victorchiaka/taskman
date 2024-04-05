import { jwtDecode } from "jwt-decode";
import { refreshAccessTokenRequest } from "../../services/api";
import { useState, useEffect } from "react";

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.exp < Math.floor(Date.now() / 1000);
};

export default function createTokenProvider() {
  let _tokens = JSON.parse(localStorage.getItem("TOKENS"));

  let observers = [];

  const subscribe = (observer) => {
    observer.push(observer);
  };

  const unsubscribe = (observer) => {
    observers.filter((_observer) => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach((observer) => observer(isLogged));
  };

  const setToken = (tokens) => {
    if (tokens === null || tokens === undefined || tokens === "") {
      localStorage.removeItem("TOKENS");
    } else {
      localStorage.setItem("TOKENS", JSON.stringify(tokens));
    }
    _tokens = tokens;
    notify();
  };

  const getToken = async () => {
    if (!_tokens || _tokens === undefined) {
      return null;
    }
    if (isTokenExpired(_tokens.access)) {
      await refreshAccessTokenRequest({
        refresh_token: _tokens.refresh,
      })
        .then((res) => setToken(res.tokens))
        .catch((rej) => {
          setToken(null);
          console.error(rej.message);
        });
    }
    return _tokens && _tokens.access;
  };

  // const getAuthenticatedUser = () => {
  //   const token 
  // }

  const isLoggedIn = () => {
    return !!_tokens;
  };

  return {
    getToken,
    setToken,
    isLoggedIn,
    subscribe,
    unsubscribe,
  };
}

export const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  const useAuth = () => {
    const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

    useEffect(() => {
      const listener = (newIsLogged) => {
        setIsLogged(newIsLogged);
      };

      tokenProvider.subscribe(listener);
      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [isLogged];
  };

  const getToken = () => {
    tokenProvider.getToken();
  };

  const login = (newTokens) => {
    tokenProvider.setToken(newTokens);
  };

  const logout = () => {
    tokenProvider.setToken(null);
  };

  const getAuthenticatedUser = async () => {
    let username;
    await tokenProvider.getToken().then(res => {
      username = jwtDecode(res).username;
    });
    return username
  };

  return {
    useAuth,
    getToken,
    login,
    logout,
    getAuthenticatedUser,
  };
};
