import React from "react";
import Settings from "./Settings";
import Notificaiton from "./Notificaiton";
import Seggentions from "./Seggentions";
import Friends from "./Friends/Friends";
import ViewsProfile from "./ViewsProfile";

const Right_side = ({
  handleNavigateRigt,
  sethandleNavigateRigt,
  sethandleNavigate,
  setCountNotif,
  handleNavigate,
}) => {
  return (
    <div
      className={`${
        handleNavigate === "rightSide" ? "max-md:show" : "max-md:hidden"
      } ${
        handleNavigate === "rightSide" || handleNavigate === "content"
          ? "xl:show"
          : "max-xl:hidden"
      }   w-[26%] max-xl:w-[50%]  max-md:w-[100%]  h-[83vh] max-sm:h-[86vh]   max-md:h-[90vh] no-scrollbar  rounded-xl   shadow-sm overflow-y-auto `}
    >
      {handleNavigateRigt === "setting" ? (
        <Settings sethandleNavigateRigt={sethandleNavigateRigt} sethandleNavigate={sethandleNavigate} />
      ) : handleNavigateRigt === "freinds" ? (
        <Friends
          sethandleNavigate={sethandleNavigate}
          sethandleNavigateRigt={sethandleNavigateRigt}
        />
      ) : handleNavigateRigt === "ViewsProfile" ? (
        <ViewsProfile sethandleNavigateRigt={sethandleNavigateRigt} />
      ) : (
        <Notificaiton
          sethandleNavigate={sethandleNavigate}
          setCountNotif={setCountNotif}
        />
      )}
    </div>
  );
};

export default Right_side;
