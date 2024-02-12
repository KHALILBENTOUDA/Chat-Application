import axios from "axios"
import { BASE_URL } from "../../utils/BASE_URL"

const API= axios.create({baseURL:`${BASE_URL}/api/v1/`})

export const getSpechiatChat=(chat_id)=> API.get(`message/${chat_id}`,{withCredentials:true})
export const AddMessage=(data)=> API.post(`message`,data,{withCredentials:true})
export const sendMessageNotification=(data)=> API.post(`message/notification`,data,{withCredentials:true})
export const getMessageNot=(resiver_id,chat_id)=>API.get(`message/notification/${resiver_id}/${chat_id}`,{withCredentials:true})
export const sendIsRedMessage=(data)=>API.post(`message/notification/read`,data,{withCredentials:true})
