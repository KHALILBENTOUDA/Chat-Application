
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
        CurrentUser?(
          <ChatGeneral /> 
        ):(
          <LandingUser/>
        )
      }
       
    </div>
  );
};

export default Landing;
