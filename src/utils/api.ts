import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // sample base URL will be changed as per actual API
  headers: {
    "Content-Type": "application/json",
  },
});