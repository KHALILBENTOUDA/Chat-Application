

import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5002/api/v1/Emages/" });

export const profileApi=(userId,imageData)=>API.put(`profileEmage/${userId}`,imageData,{withCredentials:true})
export const coverApi=(userId,imageData)=>API.put(`profileCover/${userId}`,imageData,{withCredentials:true})
export const postApi=(userId,imageData)=>API.post(`postEmage/${userId}`,imageData,{withCredentials:true})
export const allposts=(userId)=>API.get(`getposts/${userId}`,{withCredentials:true})


export const Emage_Profile = "http://localhost:5002/uploads/Users/"
export const Emage_Cover ="http://localhost:5002/uploads/Covers/"
export const Emage_Post ="http://localhost:5002/uploads/Posts/"
export const Emage_Message ="http://localhost:5002/uploads/Messages/"
