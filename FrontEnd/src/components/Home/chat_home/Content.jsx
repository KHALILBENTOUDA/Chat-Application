import React, { useEffect, useRef, useState } from "react";
import Right_side from "./Right_side";
import Chate from "./Chate";
import Conversation from "./Conversation";
import { useDispatch, useSelector } from "react-redux";
import { userChats } from "../../../Redux/Api/ApiChat";
import { io } from "socket.io-client";
import UserProfile from "./UserProfile";
import Left_side from "./Left_side";
import UpdateUserProfile from "../../profile/UpdateUserProfile";
import { Route, Routes } from "react-router-dom";
import PageFriends from "./Friends/PageFriends";
import TopNotificaions from "./TopNotificaions";
import choseChat from "../../../assets/images/start-2.jpeg";

const Content = ({
  handleNavigate,
  sethandleNavigate,
  handleNavigateRigt,
  sethandleNavigateRigt,
  setCountNotif,
}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.authData);
  const message_notifications = useSelector(
    (state) => state.MessageNotifications.notificaions
  );
  const [Chats, setChats] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [OnlineUsers, setOnlineUsers] = useState([]);
  const [sendToSocketMSG, setsendToSocketMSG] = useState(null);
  const [reciveToSocketMSG, setreciveToSocketMSG] = useState(null);
  const [CurrentNotification, setCurrentNotification] = useState(null);
  const [notification_m, setnotification_m] = useState([]);
  const [topNotification, settopNotification] = useState(null);
  const [ShowTopNotification, setShowTopNotification] = useState(false);
  const [typing, settyping] = useState(false);
  const [lastOnline, setlastOnline] = useState("");
  const [ChatNot, setChatNot] = useState(null)

  const socket = useRef();
  if (userData === null) {
    return <div>Loading...</div>;
  }
  const CurrentUserId = userData.id;

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(CurrentUserId);
        setChats(data.chat);
      } catch (err) {
      }
    };
    getChats();
  }, [userData]);


  useEffect(() => {
    socket.current = io("https://matcha-api-szde.onrender.com");

    socket.current.emit("new_user", CurrentUserId);
    socket.current.on("get_users", (users) => {
      setOnlineUsers(users);
    });
  }, [userData]);

  // send messag to socket server
  useEffect(() => {
    if (sendToSocketMSG !== null) {
      socket.current.emit("sendMessage", sendToSocketMSG);
      settyping(false);
    }
  }, [sendToSocketMSG]);

  // reseve message socket
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      settyping(false);
      setCurrentNotification(data);
      setreciveToSocketMSG(data);
    });
  }, [dispatch]);

  const handleOnline = (chats) => {
    const chatte = JSON.parse(chats.members);
    const chatMember = chatte.find((id) => id !== CurrentUserId);
    const online = OnlineUsers.find((user) => user.userId === chatMember);

    return online ? true : false;
  };

  // is tipping
  const debounce = (func, delay) => {
    let timeoutId;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, arguments), delay);
    };
  };

  const isTyping = debounce((id) => {
    socket.current.emit("typing", id);
  }, 1000);

  useEffect(() => {
    const handleTyping = (data) => {
      settyping(data);
      setTimeout(() => {
        settyping(false);
      }, 8000);
    };

    socket.current.on("typin_status", handleTyping);

    return () => {
      // Cleanup the event listener when the component unmounts
      socket.current.off("typin_status", handleTyping);
    };
  }, []);

  useEffect(() => {
    if (topNotification !== null) {
      setShowTopNotification(true);
      const timeoutId = setTimeout(() => {
        setShowTopNotification(false);
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [topNotification]);

  return (
    <section className="md:flex items-center justify-center no-scrollbar z-50 ">
      {userData ? (
        <>
          <Left_side
            reciveToSocketMSG={reciveToSocketMSG}
            settopNotification={settopNotification}
            notification_m={notification_m}
            setnotification_m={setnotification_m}
            Chats={Chats}
            currentUser={CurrentUserId}
            OnlineUsers={handleOnline}
            setcurrentChat={setcurrentChat}
            sethandleNavigate={sethandleNavigate}
            CurrentNotification={CurrentNotification}
            handleNavigate={handleNavigate}
            ChatNot={ChatNot}
          />
          <div
            className={`${
              handleNavigate === "contentChat" ||
              handleNavigate === "content" ||
              handleNavigate === "friends" ||
              handleNavigate === "profile"
                ? "max-md:show"
                : "max-md:hidden"
            } max-lg:show max-xl:w-full   max-md:w-[100%]  bg-white w-[48%] h-[83vh] mt-1 max-sm:h-[86vh]  max-md:h-[90vh]  relative flex flex-col justify-between rounded-md   `}
          >
            <Routes>
              <Route
                path="profile"
                element={
                  <UserProfile
                    sethandleNavigate={sethandleNavigate}
                    setcurrentChat={setcurrentChat}
                    OnlineUsers={handleOnline}
                  />
                }
              />
              <Route
                path="friends"
                element={
                  <PageFriends
                    sethandleNavigate={sethandleNavigate}
                    setcurrentChat={setcurrentChat}
                  />
                }
              />
              <Route
                path="chat"
                element={
                  <Chate
                    chat={currentChat}
                    currentUser={CurrentUserId}
                    setsendToSocketMSG={setsendToSocketMSG}
                    reciveToSocketMSG={reciveToSocketMSG}
                    OnlineUsers={handleOnline}
                    sethandleNavigate={sethandleNavigate}
                    CurrentNotification={CurrentNotification}
                    isTyping={isTyping}
                    typing={typing}
                    settyping={settyping}
                    setChatNot={setChatNot}
                  />
                }
              />
              <Route path="edit_profile" element={<UpdateUserProfile />} />
            </Routes>
          </div>

          <Right_side
            handleNavigate={handleNavigate}
            handleNavigateRigt={handleNavigateRigt}
            sethandleNavigateRigt={sethandleNavigateRigt}
            sethandleNavigate={sethandleNavigate}
            setCountNotif={setCountNotif}
          />
          {ShowTopNotification ? (
            <TopNotificaions topNotification={topNotification} />
          ) : null}
        </>
      ) : (
        <div className="">Loading...</div>
      )}
    </section>
  );
};

export default Content;
