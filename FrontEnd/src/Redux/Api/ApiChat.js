import axios from "axios";
import { BASE_URL } from "../../utils/BASE_URL";

const API= axios.create({baseURL:`${BASE_URL}/api/v1/`})

export const userChats=(user_id)=> API.get(`chat/${user_id}`,{withCredentials:true})
export const startChatWith=(chatData)=> API.post(`chat`,chatData,{withCredentials:true})
export const getChat=(first_id,second_id)=> API.get(`chat/find/${first_id}/${second_id}`,{withCredentials:true})

