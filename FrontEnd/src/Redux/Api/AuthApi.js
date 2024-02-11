import axios from "axios";
import { BASE_URL } from "../../utils/BASE_URL";

const API= axios.create({baseURL:`${BASE_URL}/api/v1/`})
export const login=(formData)=>API.post('login',formData,{withCredentials:true})
export const register=(formData)=>API.post('register',formData,{withCredentials:true})
export const logout=()=>API.get('logout',{withCredentials:true})
export const profileComplate=(userId,formData)=>{
      return  API.post(`compalte_profile/${userId}`,formData,{withCredentials:true})
}
export const userInterestsAPI = (userID, sendData) => {
    
      // Send formData in the request body
      return API.post(`userInterest/${userID}`, sendData, { withCredentials: true, headers: {
                    "Content-Type": "application/json",
      }, });
    };

export const UpdateUser=(userId,formData)=>API.put(`update/${userId}`,formData)
