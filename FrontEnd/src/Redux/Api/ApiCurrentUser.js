import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5002/api/v1/user/" });

export const CurrentUser = () =>
  API.get("currentUser", {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const GetUser = (user_id) =>
  API.get(`${user_id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
