const NotificationReducer=(state={notificaions:null},action)=>{
      switch(action.type){
            case 'NOTIFICATIONS':
                  return { ...state, notificaions:action.data};
             default:
                  return state;
      }
}
export default NotificationReducer 


