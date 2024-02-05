
import axios from "axios";
const API= axios.create({baseURL:"http://localhost:5002/api/v1/"})

export const createNotification=(notification)=> API.post(`notification`,notification,{withCredentials:true})
export const getNotifications = (receiver_id) => API.post('notification/getAll',  receiver_id, { withCredentials: true });
export const siReadApi = (id) => API.post('notification/isread',id, { withCredentials: true });

