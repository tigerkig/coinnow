import axios from "axios";
import { SERVER_URL } from "../config";

const baseURL = SERVER_URL;

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 1000,
    headers: { "Content-Type": "application/json" },
  });
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("_token");
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    return config;
  });
  return instance;
};

export const API = createAxiosInstance(baseURL ?? "");
