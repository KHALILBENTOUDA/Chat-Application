import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/2-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import item1 from "../../../assets/images/chat (2).png";
import item2 from "../../../assets/images/add-user.png";
import { useSelector } from "react-redux";

const Topline = ({ navigate, sethandleNavigate, sethandleNavigateRigt }) => {
  const [noti_count, setnoti_count] = useState([]);
  const navigateRoute = useNavigate();
  const notifications = useSelector(
    (state) => state.NotificationReducer.notificaions
  );
  const profileInfo = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    setnoti_count(
      notifications?.filter(
        (not) => not.sender_id !== profileInfo.id && !not.is_Read
      )
    );
  }, [notifications, profileInfo.id]);

  const chatNavigate = () => {
    navigateRoute("chat");
    navigate("leftSide");
  };

  const friendNavigate = () => {
    navigate("friends");
    navigateRoute("friends");
  };

  const notificaionNavigate = () => {
    sethandleNavigateRigt("noti");
    navigate("rightSide");
  };

  const settingNavigate = () => {
    sethandleNavigateRigt("setting");
    navigate("rightSide");
  };

  return (
    <nav className="bg-white shadow-lg shadow-slate-100 rounded-t-xl relative p-1.5">
      <div className="w-[98%] mx-auto flex flex-wrap items-center justify-between ">
        <a href="/" className="">
          <img src={logo} className="mr-3 w-[120px] max-md:w-[90px] " alt="" />
        </a>

        <ul className="flex items-center gap-12 max-md:justify-center max-md:gap-4">
          <li className="" onClick={chatNavigate}>
            <Link>
              <img className="w-[25px] max-md:w-[17px]" src={item1} alt="" />
            </Link>
          </li>
          <li className="flex items-center" onClick={friendNavigate}>
            <Link>
              <img
                className="w-[23px] max-md:w-[17px] mb-1"
                src={item2}
                alt=""
              />
            </Link>
          </li>
          <li onClick={notificaionNavigate}>
            <Link className="text-[23px] max-md:text-[17px]  relative" to="#">
              <i className="fa-solid fa-bell text-black"></i>
              {noti_count?.length > 0 ? (
                <div className="w-3 h-3 max-md:w-2.5 max-md:h-2.5 bg-red-500 rounded-full absolute -right-1 -top-0.5 text-[8px] max-md:text-[7px] text-white flex items-center justify-center font-bold">
                  {noti_count?.length}
                </div>
              ) : null}
            </Link>
          </li>
          <li onClick={settingNavigate}>
            <Link className="text-[23px] max-md:text-[17px] pr-1" to="#">
              <i className="fa-solid fa-cog text-black"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Topline;
