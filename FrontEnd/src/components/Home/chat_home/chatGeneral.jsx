import React, { useEffect, useState } from "react";
import Topline from "./Topline";
import Content from "./Content";
import Right_side from "./Right_side";
import NoticLocalisation from "../NoticLocalisation";
import UserNotifications from "./UserNotifications";
import { useDispatch, useSelector } from "react-redux";
import loder from "../../../assets/images/system-regular-715-spinner-horizontal-dashed-circle.gif"
import { GetCurrentUser } from "../../../Redux/Actions/ActionUser";
import { getAllUsers } from "../../../Redux/Actions/ActionAllUsers";
    

const ChatGeneral = () => {
  const [handleNavigate, sethandleNavigate] = useState("leftSide");
  const CurrentUser = useSelector((state) => state.authReducer.authData);
  const [handleNavigateRigt, sethandleNavigateRigt] = useState("");
  const [CountNotif, setCountNotif] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(GetCurrentUser(token));
  },[token]);

  useEffect(() => {
    dispatch(getAllUsers(token))
  },[token])

  return (
    <div className=" text-tex h-full w-full relative  p-8 max-md:p-3 no-scrollbar bg-cardColor  ">
          <div className="absolute top-[-10%] max-md:top-[-8%] right-[0px]   w-[22rem]  max-md:w-[8rem] h-[14rem] max-sm:[7rem] rounded-full bg-[#a6ddf0b0] filter blur-[72px] ] "></div>
          <div className="absolute top-[300px] max-md:top-[130px]  left-[-8rem] max-sm:left-[-10rem]  w-[21rem] max-md:w-[12rem]  max-sm:[7rem]  h-[14rem] rounded-full bg-notifi2 filter blur-[72px]  "></div>
      {
        CurrentUser?.is_verified?(
      <div className=" mx-auto my-auto  rounded-2xl bg-cardColor  overflow-hidden relative  ">
        <Topline
          sethandleNavigateRigt={sethandleNavigateRigt}
          navigate={sethandleNavigate}
        />
        <Content
          setCountNotif={setCountNotif}
          sethandleNavigateRigt={sethandleNavigateRigt}
          handleNavigateRigt={handleNavigateRigt}
          handleNavigate={handleNavigate}
          sethandleNavigate={sethandleNavigate}
        />
        <NoticLocalisation />
      </div>

        ):( 
          <div className="w-full h-[80vh]   bg-white flex items-center justify-center rounded-3xl ">
            <img src={loder} className="w-11 max-sm:w-7" alt="" />
          </div>
        )
      }
    </div>
  );
};

export default ChatGeneral;
