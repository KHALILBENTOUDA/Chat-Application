import * as NotificationApi from '../Api/ApiNotifications'
export const NewNotification =(notification)=>async(dispatch)=>{
      try{
            const resposs = await NotificationApi.createNotification(notification)
            dispatch({type:'NOTIFICATIONS',data:resposs.data.notification})

      }catch(e){
            console.log(e)
      }
}

export const getAllNotifications = (seseve_data) => async(dispatch) => {
      try {
        const response = await NotificationApi.getNotifications(seseve_data);
        
        // Assuming response.data.notification is the notifications data
        dispatch({ type: 'NOTIFICATIONS', data: response.data.notification });
      } catch (error) {
        console.error(error);
        // Handle the error or throw it if needed
      }
    };
