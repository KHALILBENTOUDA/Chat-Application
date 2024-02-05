const ChatReducer=(state={ChatUsers:[],loading:false,error:false,message:null},action)=>{
      switch(action.type){
            case "SAVE_USER_CHAT":         
                  return {...state,ChatUsers:[action.data,...state.ChatUsers]}
             default:
                  return state;
          
      }
}
export default ChatReducer 
