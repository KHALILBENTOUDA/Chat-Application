import React, { useState } from "react";
import Topline from "./Topline";
import Content from "./Content";
import Right_side from "./Right_side";
import NoticLocalisation from "../NoticLocalisation";
import UserNotifications from "./UserNotifications";

const ChatGeneral = () => {
  const [handleNavigate, sethandleNavigate] = useState("leftSide");
  const [handleNavigateRigt, sethandleNavigateRigt] = useState("");
  const [CountNotif, setCountNotif] = useState(null);
  return (
    <div className=" text-tex  p-8 max-md:p-3 no-scrollbar bg-cardColor ">
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
    </div>
  );
};

export default ChatGeneral;
