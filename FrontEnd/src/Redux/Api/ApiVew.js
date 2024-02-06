
import axios from "axios";
import { BASE_URL } from "../../utils/BASE_URL";
const API= axios.create({baseURL:`${BASE_URL}/api/v1/`})

export const createView=(ViewData)=> API.post(`view`,ViewData,{withCredentials:true})
export const getSpecificVitie = (ViewData) => API.post(`view/getall`,ViewData, { withCredentials: true });

