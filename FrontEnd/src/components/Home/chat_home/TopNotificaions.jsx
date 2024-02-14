import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Emage_Profile } from "../../../Redux/Api/ApiEmage";
import profile from "../../../assets/images/profile-1.jpg";
import pro from "../../../assets/images/profile-user.png";

import logo from '../../../assets/images/2-removebg-preview.png'
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
      <div className="flex items-center mt-2">
        <img src={logo} className="w-[80px]" alt="" />
        <p className="opacity-60 px-3 text-[11px]">{formattedTime}</p>
      </div>
      <hr className="mt-5"  />
      <div className="flex gap-4 items-center bg-white  h-[70px] relative ">
        <div className="">
          <h1 className=" text-black  text-sm">
            New message from{" "}
            <span className="ml-2 text-xs text-lgrn">
              {sender[0]?.name} {sender[0]?.lastname}
            </span>
          </h1>
          <p className="text-xs opacity-60 mt-3">
            {topNotification?.image ? (
              <div className="">
                <i className="fa-solid fa-image text-[12px] text-3 max-md:text-[9px]  pr-2"></i>
                Send New Emage
              </div>
            ) : (
              <div className="">
                <span className="font-bold text-black mr-2">
                  {sender[0]?.name} <i className=" fa-solid fa-angle-double-right"></i>
                </span>
                {topNotification.text}
              </div>
            )}
          </p>
        </div>
        <img
           onError={(e) => { e.target.onerror = null; e.target.src = pro; }}
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
