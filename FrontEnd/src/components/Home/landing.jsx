
import ChatGeneral from "./chat_home/chatGeneral";
import { GetCurrentUser } from "../../Redux/Actions/ActionUser";
import { logout } from "../../Redux/Actions/ActionAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllUsers } from "../../Redux/Actions/ActionAllUsers";
import LandingUser from "./landingUser";

const Landing = () => {
  const profileInfo = JSON.parse(localStorage.getItem("profile"));
  const CurrentUser = useSelector((state) => state.authReducer.authData);
  const [location, setlocation] = useState(null)
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(GetCurrentUser(token));
  }, []);

  useEffect(() => {
    dispatch(getAllUsers(token))
  }, [])


  return (
    <div className="">
      {
      token?(
        CurrentUser?(
        <ChatGeneral/> 
          ):(
          <div className="w-full h-[90vh] bg-white flex items-center justify-center">
          <div class="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-lgrn rounded-full dark:text-lgrn" role="status" aria-label="loading">
            <span class="sr-only">Loading...</span>
          </div>
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
