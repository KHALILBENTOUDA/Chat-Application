import axios from "axios"
import { BASE_URL } from "../../utils/BASE_URL"

const API= axios.create({baseURL:`${BASE_URL}/api/v1/`})

export const interests=()=> API.get('intrestes',{withCredentials:true})
