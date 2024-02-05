const MessageNotifications = (state = { notificaions:null }, action) => {
      switch (action.type) {
        case 'MESSAGE_NOTIFICATIONS':
          return { ...state, notificaions:action.data };
        default:
          return state;
      }
    };
    
export default MessageNotifications;
    