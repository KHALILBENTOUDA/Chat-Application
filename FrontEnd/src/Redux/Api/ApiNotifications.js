
import axios from "axios";
import { BASE_URL } from "../../utils/BASE_URL";
const API= axios.create({baseURL:`${BASE_URL}/api/v1/`})

export const createNotification=(notification)=> API.post(`notification`,notification,{withCredentials:true})
export const getNotifications = (receiver_id) => API.post('notification/getAll',  receiver_id, { withCredentials: true });
export const siReadApi = (id) => API.post('notification/isread',id, { withCredentials: true });

