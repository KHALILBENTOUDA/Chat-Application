import axios from "axios"

const API= axios.create({baseURL:"http://localhost:5002/api/v1/"})

export const interests=()=> API.get('intrestes',{withCredentials:true})
