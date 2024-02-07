import axios from "axios";
import { BASE_URL } from "../../utils/BASE_URL";

const API = axios.create({ baseURL: `${BASE_URL}/api/v1/user/` });

export const CurrentUser = (token) =>API.get("currentUser", {
    withCredentials: true,
    headers:{
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

export const GetUser = (user_id,token) =>
  API.get(`${user_id}`, {
    withCredentials: true,
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
