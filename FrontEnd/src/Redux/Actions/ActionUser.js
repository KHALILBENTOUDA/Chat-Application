import * as User from '../Api/ApiCurrentUser'

export const GetCurrentUser=(token)=>async(dispatch)=>{
      dispatch({ type: 'AUTH_START' });
      try{
           const res=await User.CurrentUser(token)
           console.log(res)
           if(res.data.status==="success"){
            dispatch({ type: "AUTH_SUCCESS", data: res.data.user });
           }
         }catch(err){
           if(err.response && err.response.status >= 400 && err.response.status<=500){
                dispatch({ type: 'AUTH_ERROR', message:err.response.data.message });
           }
      }
}

