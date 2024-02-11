const authReducer=(state={authData:null,loading:false,error:false,message:null,status:null,token:null},action)=>{
      switch(action.type){
            case "AUTH_START":
                  return {...state,loading:true,error:false}
            case 'AUTH_SUCCESS':
                  localStorage.setItem("profile", JSON.stringify({...action.data}))
                  return {...state,authData:action.data,loading:false,error:false,status:action.status ,message:action.message ,token:action.token}
            case "AUTH_ERROR":
                  return {...state,message:action.message,loading:false,error:true ,status:action.status}
            case "STOPLOADING":
                  return {...state,loading:action.loading}
            case "LOG_OUT":
                  localStorage.clear()
                  return {...state,authData:null,loading:false,error:false,message:null}
             default:
                  return state;
      }
}
export default authReducer 
