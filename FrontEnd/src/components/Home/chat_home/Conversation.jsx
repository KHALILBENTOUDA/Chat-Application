import React, { useEffect, useState } from "react";
import profile from "../../../assets/images/profile-2.jpg";
import axios from "axios";
import { GetUser } from "../../../Redux/Api/ApiCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMessageNot } from "../../../Redux/Api/ApiMessages";
import { Emage_Profile } from "../../../Redux/Api/ApiEmage";
import pror from "../../../assets/images/user (1).png";
import pro from "../../../assets/images/profile-user.png";

const Conversation = ({
  chat,
  currentUser,
  OnlineUsers,
  sethandleNavigate,
  handleNavigate,
  settopNotification,
}) => {
  const [userSide, setuserSide] = useState(null);
  const Curren = useSelector((state) => state.UsersProfile.Users);
  const message_notifications = useSelector(
    (state) => state.MessageNotifications.notificaions
  );
  const profileInfo = JSON.parse(localStorage.getItem("profile") ?? "{}");
  const token = localStorage.getItem("token");
  const [notification_m, setnotification_m] = useState([]);
  const [text, settext] = useState("");
  const [time, settime] = useState("");
  const [messageEmage, setmessageEmage] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const chatUser = JSON.parse(chat.members);
      const userId = chatUser.find((id) => id !== currentUser);
      try {
        const { data } = await GetUser(userId,token);
        if (data.status === "success") {
          setuserSide(data.User);
          dispatch({ type: "SAVE_USER_CHAT", data: data.User });
        }
      } catch (err) {
      }
    };
    getData();
  }, []);


  useEffect(() => {
  const getnotifi=async()=>{
    try{
      const res = await getMessageNot(profileInfo.id,chat.chat_id);

      if(res.data.notification.length > 0 ){
          setnotification_m(res.data.notification)


        const lastMessage=res.data.notification 
        if(lastMessage.length>0){
          settext(lastMessage[0].text || "")
          setmessageEmage(lastMessage[0]?.image);
          if (lastMessage[0]) {
            const times = lastMessage[0].created_at;
            const dateObj = new Date(times);
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes() || '';
            const period = hours >= 12 ? "PM" : "AM";
            const formattedHours = hours % 12 || 12;
            const formattedTime = `${formattedHours}:${
              minutes < 10 ? `0${minutes}` : minutes
            } ${period}`;
            settime(formattedTime);
          }
        }
      }else{
        if(res.data.lastReadNotification ){
          const lastnot=res.data.lastReadNotification
          settext(lastnot.text)
          setmessageEmage(lastnot.image)
          const times = lastnot.created_at;
          const dateObj = new Date(times);
          const hours = dateObj.getHours();
          const minutes = dateObj.getMinutes() || '';
          const period = hours >= 12 ? "PM" : "AM";
          const formattedHours = hours % 12 || 12;
          const formattedTime = `${formattedHours}:${
            minutes < 10 ? `0${minutes}` : minutes
          } ${period}`;
          settime(formattedTime);
          
        }
      }
    }catch(e){
      console.log(e)
    }
  }
  getnotifi()
  }, [chat,profileInfo.id])

  

  // useEffect(() => {
  //   const getMessagesNotifications = async () => {
  //     try {
  //       const res = await getMessageNot(profileInfo.id,chat.chat_id);
  //       // dispatch({type:'MESSAGE_NOTIFICATIONS',data:res.data.notification})
  //       const noti = res.data.notification;
  //       console.log(noti)
  //       const tex = noti.filter((not) => not.chat_id === chat.chat_id);
  //       console.log(noti)
  //       const check = noti.filter(
  //         (not) => not.chat_id === chat.chat_id && not.is_Read == 0
  //       );
  //       setnotification_m(check);
  //       const lastMessage = tex[tex.length - 1];
  //       const lastMessageEmage = tex[tex.length - 1];
  //       settext(lastMessage?.text || "");
  //       setmessageEmage(lastMessageEmage?.image || "");

  //       if (lastMessage) {
  //         const times = lastMessage.created_at;
  //         const dateObj = new Date(times);
  //         const hours = dateObj.getHours();
  //         const minutes = dateObj.getMinutes();
  //         const period = hours >= 12 ? "PM" : "AM";
  //         const formattedHours = hours % 12 || 12;
  //         const formattedTime = `${formattedHours}:${
  //           minutes < 10 ? `0${minutes}` : minutes
  //         } ${period}`;
  //         settime(formattedTime);
  //       }
  //     } catch (e) {
  //       console.error("Error fetching messages notifications:", e);
  //     }
  //   };
  //   return () => getMessagesNotifications();
  // },[chat]);


  useEffect(() => {
    if (
      message_notifications !== null &&
      message_notifications.chat_id === chat.chat_id &&
      message_notifications.isRead === false
    ) {
      setnotification_m([message_notifications, ...notification_m]);
      settext(message_notifications.text);
      settopNotification(message_notifications);
      if (message_notifications) {
        const times = message_notifications.created_at;
        const dateObj = new Date(times);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedTime = `${formattedHours}:${
          minutes < 10 ? `0${minutes}` : minutes
        } ${period}`;
        settime(formattedTime);
      }
    }
  }, [message_notifications]);

  const navigate = useNavigate();

  const handleClick = (userSide) => {
    dispatch({ type: "GET_USERS_DATA", data: userSide });
    navigate("profile");
    sethandleNavigate("profile");
  };

  const handleNavigateFunciont = () => {
    dispatch({ type: "GET_USERS_DATA", data: userSide });
    navigate("chat");
    sethandleNavigate("contentChat");
  };
  

  return (
    <li
      onClick={() => setnotification_m([])}
      className=" transition duration-200 ease-in-out  cursor-pointer  flex py-2.5 max-md:py-1.5  items-center bg-cardColor  px-1.5 hover:bg-white shadow-sm drop-shadow-sm   shadow-slate-200 rounded-md hover:shadow-lg  m-2  "
    >

      {
        userSide?(

          <>
          <div className=" relative flex items-end justify-end">
          <img
             onError={(e) => { e.target.onerror = null; e.target.src = pro; }}
            src={
              userSide?.picture_url
                ? `${Emage_Profile}${userSide?.picture_url}`
                : pror
            }
            onClick={() => handleClick(userSide)}
            className="w-14 h-12  max-md:w-10  max-md:h-9    rounded-full border-[2px] border-white cursor-pointer"
            alt=""
          />
          {OnlineUsers && (
            <span className="h-3 w-3 border-2 border-white mr-0.5  absolute right  rounded-full bg-green-500"></span>
          )}
        </div>
        <div
          className="flex justify-between w-full  "
          onClick={handleNavigateFunciont}
        >
          <div className="px-3 ">
            <h1 className="font-bold text-[14px] max-md:text-[13px] ">
              {userSide ? userSide.name : "loading..."}
            </h1>
            {text ? (
              <p className="text-xs opacity-50">
                <i className="fa-solid fa-check text-[10px] text-3 max-md:text-[9px]  pr-2"></i>
                {text}
              </p>
            ) : messageEmage ? (
              <p className="text-xs opacity-50">
                <i className="fa-solid fa-image text-[12px] text-3 max-md:text-[9px]  pr-1.5"></i>{" "}
                {userSide?.name} send new Emage
              </p>
            ) : null}
          </div>
          <div className="flex flex-col  justify-start  items-end">
            <span
              className={`text-[11px] opacity-50 mt-[2px]  ${
                notification_m?.length ? "text-green-400" : ""
              }`}
            >
              {time}
            </span>
            {notification_m?.length ? (
              <div className="w-5 h-5  rounded-full bg-green-400 text-[10px] font-bold  flex text-white   justify-center items-center  mt-0.5">
                {notification_m?.length}
              </div>
            ) : null}
          </div>
        </div>
        </>

        ):(


          <div class=" rounded-md p-2 max-w-sm w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-200 h-10 w-10"></div>
            <div class="flex-1 space-y-6  items-center">
              <div class="space-y-3">
              <div class="grid grid-cols-5 gap-4">
                  <div class="h-3 bg-slate-200 rounded-3xl col-span-3"></div>
                  <div class="h-2  rounded-3xl col-span-1"></div>
                  <div class="h-2 bg-slate-200 rounded-3xl col-span-1"></div>
                </div>
                <div class="grid grid-cols-5 gap-4">
                  <div class="h-2 bg-slate-200 rounded-3xl col-span-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>




        )
      }



   
    </li>
  );
};

export default Conversation;
