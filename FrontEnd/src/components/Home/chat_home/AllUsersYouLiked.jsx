import React, { useEffect, useState } from "react";
import profile from "../../../assets/images/profile-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { UserLikesCount, like, unlike } from "../../../Redux/Api/ApiAllusers";
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
      {isLiked ? (
        <div key={user.id} className="py-3 flex items-center w-full ">
          <div className="flex items-center gap-4 cursor-pointer">
            <img
              onClick={() => handleClick(user)}
              src={`${Emage_Profile}${user.picture_url}`}
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
        </div>
      ) : null}
    </>
  );
};

export default AllUsersYouLiked;
