
import axios from "axios";
const API= axios.create({baseURL:"http://localhost:5002/api/v1/"})

export const createView=(ViewData)=> API.post(`view`,ViewData,{withCredentials:true})
export const getSpecificVitie = (ViewData) => API.post(`view/getall`,ViewData, { withCredentials: true });

