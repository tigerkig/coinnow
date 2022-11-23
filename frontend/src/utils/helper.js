import axios from "axios";
import { serverUrl } from "./config";

export const apiCaller = ({ method, url, body }) => {
  const baseURL = `${serverUrl}${url}`;
  if (method === "get") {
    axios.get(baseURL).then((res) => {
      return res.data;
    });
  } else if (method === "post") {
    axios.post();
  }
};
