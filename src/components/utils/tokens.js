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

  const setTokens = (tokens) => {
    if (tokens === null || tokens === undefined || tokens === "") {
      localStorage.removeItem("TOKENS");
    } else {
      localStorage.setItem("TOKENS", JSON.stringify(tokens));
    }
    _tokens = tokens;
    notify();
  };

  const getTokens = async () => {
    if (!_tokens || _tokens === undefined) {
      return null;
    }
    if (isTokenExpired(_tokens.access)) {
      await refreshAccessTokenRequest({
        refresh_token: _tokens.refresh,
      })
        .then((res) => setTokens(res.tokens))
        .catch((rej) => {
          setTokens(null);
          console.error(rej.message);
        });
    }
    return _tokens && _tokens.access;
  };

  const isLoggedIn = () => {
    return !!_tokens;
  };

  return {
    getTokens,
    setTokens,
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

  const getTokens = () => {
    tokenProvider.getTokens();
  };

  const login = (newTokens) => {
    tokenProvider.setTokens(newTokens);
  };

  const logout = () => {
    tokenProvider.setTokens(null);
  };

  return {
    useAuth,
    getTokens,
    login,
    logout,
  };
};
