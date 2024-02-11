import ChatGeneral from "./chat_home/chatGeneral";
import { GetCurrentUser } from "../../Redux/Actions/ActionUser";
import { logout } from "../../Redux/Actions/ActionAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllUsers } from "../../Redux/Actions/ActionAllUsers";
import LandingUser from "./landingUser";
import loder from "../../assets/images/system-regular-715-spinner-horizontal-dashed-circle.gif"

const Landing = () => {
  const profileInfo = JSON.parse(localStorage.getItem("profile"));
  const CurrentUser = useSelector((state) => state.authReducer.authData);
  const [location, setlocation] = useState(null)
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(GetCurrentUser(token));
  },[]);
  useEffect(() => {
    dispatch(getAllUsers(token))
  },[token])
  return (
    <div className="relative">
      {
      token?(
        CurrentUser || profileInfo?(
        <ChatGeneral/> 
          ):(
          <div className="w-full h-[80vh] bg-white flex items-center justify-center rounded-3xl">
             <img src={loder} className="w-11 max-sm:w-7" alt="" />
        </div>
            )
        ):(
          <LandingUser/>
        )
          }
    </div>
  );
};

export default Landing;
