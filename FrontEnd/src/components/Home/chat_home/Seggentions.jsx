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
          <div class=" rounded-md p-2 max-w-sm w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-slate-200 h-10 w-10"></div>
          <div class="flex-1 space-y-6  items-center">
            <div class="space-y-3">
            <div class="grid grid-cols-5 gap-4">
                <div class="h-3 bg-slate-200 rounded-3xl col-span-3"></div>
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
         
        )}
      </ul>
    </>
  );
};

export default Seggentions;
