import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5002/api/v1/user/" });

export const allUsers = () => API.get('all', { withCredentials: true });
export const like = (likeData) => API.put('like', likeData,{ withCredentials: true });
export const unlike = (likeData) => API.put('unlike', likeData,{ withCredentials: true });
export const UserLikesCount = (likeData) => API.post('getlikes', likeData,{ withCredentials: true })
export const getInputChat=(likeData)=> API.post(`/chowinputchat`,likeData,{withCredentials:true})
export const searchApi=(searchData)=> API.post(`/search`,searchData,{withCredentials:true})