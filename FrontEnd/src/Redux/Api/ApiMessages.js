import axios from "axios"

const API= axios.create({baseURL:`http://localhost:5002/api/v1/`})

export const getSpechiatChat=(chat_id)=> API.get(`message/${chat_id}`,{withCredentials:true})
export const AddMessage=(data)=> API.post(`message`,data,{withCredentials:true})
export const sendMessageNotification=(data)=> API.post(`message/notification`,data,{withCredentials:true})
export const getMessageNot=(data)=>API.get(`message/notification/${data}`,{withCredentials:true})
export const sendIsRedMessage=(data)=>API.post(`message/notification/read`,data,{withCredentials:true})
