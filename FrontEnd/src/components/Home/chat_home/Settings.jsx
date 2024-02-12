import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/Actions/ActionAuth";

const Settings = ({ sethandleNavigateRigt,sethandleNavigate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handle_logout = async () => {
    dispatch(logout(navigate));
  };

  const handleedit=()=>{
    navigate("/edit_profile")
    sethandleNavigate("content")
  }

  return (
    <>
      <div className=" w-full h-full  flex flex-col relative  ">
        <h1 className="text-lg max-md:text-sm  font-bold text-black h-[60px] flex items-center max-md:h-[50px]   rounded-md m-0.5 max-md:mx-0  ml-1  bg-white  px-4 shadow-md shadow-slate-50 drop-shadow-sm">
          <i className="fa-solid fa-cog mr-2"></i> Settings
        </h1>
        <ul className="my-4 max-md:my-2">
          <li
            onClick={() => sethandleNavigateRigt("freinds")}
            className="bg-white opacity-70 text-tex font-semibold  cursor-pointer transition duration-200 ease-in-out   flex py-2.5 items-center  px-4 hover:bg-white shadow-sm drop-shadow-sm  text-sm max-md:text-xs  shadow-slate-200 rounded-md hover:shadow-lg my-2 mx-1 hover:opacity-100  "
          >
            <i className="fa-solid fa-user-friends pr-3"></i>
            Friends
          </li>
          <li
            onClick={() => sethandleNavigateRigt("ViewsProfile")}
            className="bg-white opacity-70 text-tex font-semibold  cursor-pointer transition duration-200 ease-in-out   flex py-2.5 items-center  px-4 hover:bg-white shadow-sm drop-shadow-sm  text-sm max-md:text-xs  shadow-slate-200 rounded-md hover:shadow-lg my-2 mx-1 hover:opacity-100  "
          >
            <i className="fa-solid fa-eye pr-3"></i>
            Viewed
          </li>
          <li
            onClick={handleedit }
            className="bg-white opacity-70 text-tex font-semibold  cursor-pointer transition duration-200 ease-in-out   flex py-2.5 items-center  px-4 hover:bg-white shadow-sm drop-shadow-sm  text-sm max-md:text-xs  shadow-slate-200 rounded-md hover:shadow-lg my-2 mx-1 hover:opacity-100  "
          >
            <i className="fa-solid fa-edit pr-3"></i>
            Profile Edit
          </li>
          {/* <li
            // onClick={() => navigate("/edit_profile")}
            className="bg-white opacity-70 text-tex font-semibold  cursor-pointer transition duration-200 ease-in-out   flex py-2.5 items-center  px-4 hover:bg-white shadow-sm drop-shadow-sm  text-sm max-md:text-xs  shadow-slate-200 rounded-md hover:shadow-lg my-2 mx-1 hover:opacity-100  "
          >
            <i className="fa-regular  fa-moon pr-3"></i>
            Dark Mood
            
          </li> */}

        </ul>
        <div
          className="text-center absolute ml-5  w-[90%] translate-x-[50% -50%]  bg-red-500 shadow-md cursor-pointer  font-bold  p-2 my-2  rounded-full text-sm  text-white  bottom-0 "
          onClick={handle_logout}
        >
          <i className="fa-solid fa-"></i>
          Log Out
        </div>
      </div>
    </>
  );
};

export default Settings;
