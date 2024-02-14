import React, { useState } from "react";
import profile from "../../../assets/images/profile-1.jpg";
import Conversation from "./Conversation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Emage_Profile } from "../../../Redux/Api/ApiEmage";
import { CurrentUser } from "../../../Redux/Api/ApiCurrentUser";
import pror from "../../../assets/images/user (1).png";

const Left_side = ({
  Chats,
  currentUser,
  OnlineUsers,
  setcurrentChat,
  sethandleNavigate,
  CurrentNotification,
  notification_m,
  setnotification_m,
  handleNavigate,
  settopNotification,
  reciveToSocketMSG,
  ChatNot
}) => {
  const dispatch = useDispatch();
  const CurrentUser = JSON.parse(localStorage.getItem("profile"));
  const newEmage = useSelector((state) => state.EmageReducer.emageProfile);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = Chats.filter((chat) =>
    `${chat.name} ${chat.lastname}`.includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: "GET_USERS_DATA", data: CurrentUser });
    navigate("profile");
    sethandleNavigate("profile");
  };




  return (
    <div
      className={`${
        handleNavigate === "leftSide" ? "max-md:show" : "max-md:hidden"
      } ${
        handleNavigate === "contentChat" ||
        handleNavigate === "leftSide" ||
        handleNavigate === "content" ||
        handleNavigate === "friends" ||
        handleNavigate === "profile"
        ? "xl:show"
        : "max-xl:hidden"
      }  max-xl:w-[50%]  w-[26%] max-md:w-[100%]  h-[83vh] max-sm:h-[86vh]  max-md:h-[90vh]    rounded-xl   shadow-sm no-scrollbar  `}
    >
      <div
        onClick={handleClick}
        className="no-scrollbar h-[57px] max-md:h-[40px]   m-0.5 mr-1  rounded-md bg-white  px-4 shadow-md shadow-slate-100 max-md:mx-0 drop-shadow-sm flex items-center cursor-pointer  "
      >
        <img
          src={CurrentUser?.picture_url?`${Emage_Profile}${newEmage || CurrentUser.picture_url}`:pror}
          className="w-10 h-10  max-md:w-9  max-md:h-9   rounded-full border-[2px] border-white "
          alt=""
        />
        <h1 className="font-bold text-sm max-md:text-xs  px-3">
          {CurrentUser.name + " " + CurrentUser.lastname}
        </h1>
      </div>

      <h2 className="font-bold text-black  text-xl max-md:text-sm p-2 px-4 ">
        Chats
      </h2>
      <div className="flex items-center  w-[95%] mx-auto rounded-xl  my-1 shadow-sm shadow-slate-200  border  bg-white text-[13px] max-sm:text-[10px]  ">
        <i className="fa-solid fa-search   text-slate-400 pl-3"></i>
        <input
          className="outline-none p-2"
          type="text"
          name=""
          id=""
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <h1 className="text-tex py-2.5 ml-4 text-sm opacity-50 max-md:text-xs">
        Messages
      </h1>
      <hr className=" shadow-md shadow-slate-200 drop-shadow-xl" />
      <div className="no-scrollbar h-[420px]  max-md:h-[400px]   overflow-y-auto ">
        <div className="h-full">
          <ul className="transition duration-200 ease-in-out ">
            {
              /* {

            !filteredChats?
              Chats.map((chat) => (
                <div key={chat.id} onClick={() => setcurrentChat(chat)}>
                  <Conversation
                    CurrentNotification={CurrentNotification}
                    chat={chat}
                    currentUser={currentUser}
                    OnlineUsers={OnlineUsers(chat)}
                    sethandleNavigate={sethandleNavigate}
                    notification_m={notification_m}
                    setnotification_m={setnotification_m}
                    handleNavigate={handleNavigate}
                    settopNotification={settopNotification}
                  />
                </div>
              ))
            :
            ''
            
            } */

            filteredChats?(

              filteredChats.map((chat) => (
                <div key={chat.id} onClick={() => setcurrentChat(chat)}>
                  <Conversation
                    CurrentNotification={CurrentNotification}
                    chat={chat}
                    currentUser={currentUser}
                    OnlineUsers={OnlineUsers(chat)}
                    sethandleNavigate={sethandleNavigate}
                    notification_m={notification_m}
                    setnotification_m={setnotification_m}
                    handleNavigate={handleNavigate}
                    settopNotification={settopNotification}
                    ChatNot={ChatNot}
                  />
                </div>
              ))

            ):(
              <div class=" rounded-md p-4 max-w-sm w-full mx-auto">
              <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-200 h-12 w-12"></div>
                <div class="flex-1 space-y-6 py-1">
                  <div class="space-y-3">
                  <div class="grid grid-cols-5 gap-4">
                      <div class="h-3 bg-slate-200 rounded-3xl col-span-3"></div>
                      <div class="h-2 bg-white rounded-3xl col-span-1"></div>
            
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Left_side;
