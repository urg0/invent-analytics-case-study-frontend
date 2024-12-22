import axios from "axios";

const API_URL_LOCAL = "http://localhost:8080/api";

const request = axios.create({
  baseURL: API_URL_LOCAL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
