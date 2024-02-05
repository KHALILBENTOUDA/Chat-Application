import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Emage_Profile } from "../../../Redux/Api/ApiEmage";
import profile from "../../../assets/images/profile-1.jpg";
import logo from "../../../assets/images/Creative_Chatting_App_Logo-removebg-preview.png";

const TopNotificaions = ({ topNotification }) => {
  const [sender, setsender] = useState([]);
  const AllUSERS = useSelector((state) => state.AllUsersReducer.AllUsers);

  useEffect(() => {
    if (AllUSERS !== null) {
      setsender(
        AllUSERS.filter((user) => user.id === topNotification.sender_id)
      );
    }
  }, [AllUSERS]);

  const dateObj = new Date(sender[0]?.created_at);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:${minutes} ${period}`;

  return (
    <div className="absolute  max-sm:w-full md:w-[40%]  mx-auto rounded-b-2xl md:rounded-md  backdrop-blur-lg  top-1 z-10 px-5  bg-white  shadow-md shadow-slate-300">
      <div className="flex items-center">
        <img src={logo} className="w-[60px]" alt="" />
        <p className="opacity-60 px-3 text-[11px]">{formattedTime}</p>
      </div>
      <hr />
      <div className="flex gap-4 items-center bg-white  h-[70px] relative ">
        <div className="">
          <h1 className="text-green-500 text-sm">
            New message from{" "}
            <span className="font-bold text-black">
              {sender[0]?.name} {sender[0]?.lastname}
            </span>
          </h1>
          <p className="text-[11px] opacity-50 ml-2">
            {topNotification?.image ? (
              <div className="">
                <i className="fa-solid fa-image text-[12px] text-3 max-md:text-[9px]  pr-2"></i>
                Send New Emage
              </div>
            ) : (
              <div className="">
                <span className="font-bold text-black">
                  {sender[0]?.name} {sender[0]?.lastname}
                </span>
                :{topNotification.text}
              </div>
            )}
          </p>
        </div>
        <img
          src={`${Emage_Profile}${sender[0]?.picture_url}`}
          className="w-9 h-9 rounded-full absolute right-2"
          alt=""
        />
      </div>
    </div>
  );
};

export default TopNotificaions;

// src={`${Emage_Profile}${sender[0].picutre_url}`}
