import React, { useEffect, useState } from "react";
import profile from "../../../assets/images/profile-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { UserLikesCount, like, unlike } from "../../../Redux/Api/ApiAllusers";
import pror from "../../../assets/images/user (1).png";

import {
  NewNotification,
  getAllNotifications,
} from "../../../Redux/Actions/ActionNotification";
import { useNavigate } from "react-router-dom";

import { Emage_Profile } from "../../../Redux/Api/ApiEmage";
const AllUsersYouLiked = ({ userinfo, sethandleNavigate }) => {
  const profileInfo = JSON.parse(localStorage.getItem("profile"));
  const [isLiked, setisLiked] = useState(false);
  const user = userinfo;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const likeData = {
        liked_id: profileInfo.id,
        Currend_id: user.id,
      };
      try {
        const userLikes = await UserLikesCount(likeData);
        const likedUser = userLikes.data.data;
        setisLiked(
          likedUser.some((like) => like.liked_user_id === profileInfo.id)
        );
      } catch (error) {
        console.error("Error fetching user likes:", error.message);
      }
    };
    fetchUser();
  }, [user.id, profileInfo.id]);

  const handlelike = async () => {
    try {
      const likeData = {
        liked_id: profileInfo.id,
        Currend_id: user.id,
      };
      const res = await like(likeData);
      setisLiked(true);
      const notificaion = {
        sender_id: profileInfo.id,
        receiver_id: user.id,
        content: `has like you`,
      };
      dispatch(NewNotification(notificaion));
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnlike = async () => {
    try {
      const likeData = {
        liked_id: profileInfo.id,
        Currend_id: user.id,
      };
      const res = await unlike(likeData);
      setisLiked(false);
      const notificaion = {
        sender_id: profileInfo.id,
        receiver_id: user.id,
        content: `has Unlike you`,
      };
      dispatch(NewNotification(notificaion));
    } catch (error) {
      console.error("Error unliking user:", error.message);
    }
  };

  const navigate = useNavigate();
  const handleClick = (user) => {
    dispatch({ type: "GET_USERS_DATA", data: user });
    navigate("/profile");
    sethandleNavigate("profile");
  };


  return (
    <>
    {
      isLiked  && user.id !== profileInfo.id  ? (
        <div key={user.id} className="py-3 flex items-center w-full ">
          {
            user.name?(
            <div className="flex items-center gap-4 cursor-pointer">
              <img
                onClick={() => handleClick(user)}
                src={
                  user?.picture_url
                  ? `${Emage_Profile}${user?.picture_url}`
                  : pror
              
              }
                className="w-10 h-10 rounded-full max-md:w-8 max-md:h-8 "
                alt=""
                srcSet=""
              />
              <div
                onClick={() => handleClick(user)}
                className="w-[160px] flex flex-col justify-center"
              >
                <h1 className="text-sm font-bold text-black max-md:text-xs max-sm:text-[11px] ">
                  {user.name + "_" + user.lastname}
                </h1>
                <span className="text-xs opacity-50 max-md:text-[8px] ">
                  12 Friend{" "}
                </span>
              </div>
              <button
                onClick={isLiked ? () => handleUnlike() : () => handlelike()}
                className={`transition-all  hover:scale-105 max-sm:text-[11px]   from-40%  font-semibold shadow-md z-50  text-sm max-md:text-[12px]  text-white w-[80px] h-8 max-md:w-[70px] max-md:h-7 max-sm:w-[60px] max-sm:h-6   rounded-full ${
                  isLiked ? "bg-ble" : "bg-lgrn"
                }`}
              >
                {isLiked ? "Unlike" : "Like"}
              </button>
            </div>
            ):(
              <div class=" rounded-md p-2 max-w-sm w-full mx-auto">
              <div class="animate-pulse flex space-x-4">
              <div class="rounded-full bg-slate-200 h-10 w-10"></div>
              <div class="flex-1 space-y-6  items-center">
                <div class="space-y-3">
                <div class="grid grid-cols-5 gap-4">
                    <div class="h-3 bg-red-400 rounded-3xl col-span-3"></div>
                    <div class="h-2 bg-white rounded-3xl col-span-1"></div>
      
                    <div class="h-2 bg-slate-200 rounded-3xl col-span-1"></div>
                  </div>
                  <div class="grid grid-cols-5 gap-4">
                    <div class="h-2 bg-slate-200 rounded-3xl col-span-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
          }
          </div>
        ) : (
          null
        )
    }
      
    </>
  );
};

export default AllUsersYouLiked;
