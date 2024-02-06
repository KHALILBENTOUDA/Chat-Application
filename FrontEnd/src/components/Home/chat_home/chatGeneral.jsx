import React, { useState } from "react";
import Topline from "./Topline";
import Content from "./Content";
import Right_side from "./Right_side";
import NoticLocalisation from "../NoticLocalisation";
import UserNotifications from "./UserNotifications";
import { useSelector } from "react-redux";

const ChatGeneral = () => {
  const [handleNavigate, sethandleNavigate] = useState("leftSide");
  const CurrentUser = useSelector((state) => state.authReducer.authData);
  const [handleNavigateRigt, sethandleNavigateRigt] = useState("");
  const [CountNotif, setCountNotif] = useState(null);
  return (
    <div className=" text-tex h-full w-full  p-8 max-md:p-3 no-scrollbar bg-cardColor ">
      {
        CurrentUser?.is_verified?(


      <div className=" mx-auto my-auto  rounded-2xl bg-cardColor  overflow-hidden relative ">
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

          <div className="w-full h-[80vh] bg-white flex items-center justify-center">

      <div class="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-lgrn rounded-full dark:text-lgrn" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
      </div>
          </div>
        )
      }
    </div>
  );
};

export default ChatGeneral;
