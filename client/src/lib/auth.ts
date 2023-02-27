import axios from "axios";
import { useState } from "react";

function useAuth() {
  const getToken = () => {
    const userToken = localStorage.getItem("token");
    return userToken && userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const request = async (url: string, options?: RequestInit) => {
    if (token && token.length > 0) {
      if (!options) {
        options = {
          headers: {
            Authorization: "Bearer: " + token,
          },
        };
      } else {
        options.headers = options.headers
          ? { ...options.headers, Authorization: "Bearer: " + token }
          : { Authorization: "Bearer: " + token };
      }
    }
    url = url.startsWith("/") ? url : "/" + url;
    url = import.meta.env.DEV
      ? location.origin.replace("5173", "5000") + url
      : "https://" + "domain.com" + url;
    return await fetch(url, options);
  };

  const ajax = async (url: string, data: object, method = "POST") => {
    url = url.startsWith("/") ? url : "/" + url;
    url = import.meta.env.DEV
      ? location.origin.replace("5173", "5000") + url
      : "https://" + "domain.com" + url;
    const res = await axios({
      url,
      method,
      data,
      headers: token
        ? {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer: " + token,
          }
        : {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
    });
    return res.data;
  };

  return {
    login: saveToken,
    request,
    ajax, // this is the function you should normally be using
    token,
    logout: removeToken,
    authenticated: () => {
      return token && token.length > 0;
    },
  };
}

export default useAuth;
