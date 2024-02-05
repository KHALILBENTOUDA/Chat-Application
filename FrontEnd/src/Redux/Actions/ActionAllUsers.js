import axios from "axios";
import * as UsersApi from "../Api/ApiAllusers";

export const getAllUsers=()=>async(dispatch)=>{
      try{
            const res =await axios.get('http://localhost:5002/api/v1/user/all')
            dispatch({type:'GET_ALL_USERS',data:res.data.data})

      }catch(e){
            console.log(e)
      }
}



