import axios from "axios";
import * as UsersApi from "../Api/ApiAllusers";
import { BASE_URL } from "../../utils/BASE_URL";

export const getAllUsers=(token)=>async(dispatch)=>{
      try{
            const res =await axios.get(`${BASE_URL}/api/v1/user/all`,{headers: {  "Authorization": "Bearer " + token}})
            console.log(res)
            dispatch({type:'GET_ALL_USERS',data:res.data.data})

      }catch(e){
            console.log(e)
      }
}



