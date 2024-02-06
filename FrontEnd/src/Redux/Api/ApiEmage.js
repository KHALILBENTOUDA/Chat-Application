
import axios from "axios";
import { BASE_URL } from "../../utils/BASE_URL";
const API = axios.create({ baseURL: `${BASE_URL}/api/v1/Emages/` });

export const profileApi=(userId,imageData)=>API.put(`profileEmage/${userId}`,imageData,{withCredentials:true})
export const coverApi=(userId,imageData)=>API.put(`profileCover/${userId}`,imageData,{withCredentials:true})
export const postApi=(userId,imageData)=>API.post(`postEmage/${userId}`,imageData,{withCredentials:true})
export const allposts=(userId)=>API.get(`getposts/${userId}`,{withCredentials:true})


export const Emage_Profile = `${BASE_URL}/uploads/Users/`
export const Emage_Cover =`${BASE_URL}/uploads/Covers/`
export const Emage_Post =`${BASE_URL}/uploads/Posts/`
export const Emage_Message =`${BASE_URL}/uploads/Messages/`
