import React, { useState } from "react";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import AllUsersYouLiked from "./AllUsersYouLiked";

const Seggentions = ({
  sethandleNavigate,
  isLiked,
  handlelike,
  handleUnlike,
  typeOfUsers,
}) => {
  const CurrentUser = JSON.parse(localStorage.getItem("profile"));
  const AllUSERS = useSelector((state) => state.AllUsersReducer.AllUsers);
  return (
    <>
      <ul className="">
        {AllUSERS ? (
          AllUSERS.map((user) => (
            <>
              {typeOfUsers ? (
                <User
                  sethandleNavigate={sethandleNavigate}
                  userinfo={user}
                  handleUnlike={handleUnlike}
                  handlelike={handlelike}
                />
              ) : (
                <AllUsersYouLiked
                  sethandleNavigate={sethandleNavigate}
                  userinfo={user}
                  handleUnlike={handleUnlike}
                  handlelike={handlelike}
                />
              )}
            </>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </>
  );
};

export default Seggentions;
