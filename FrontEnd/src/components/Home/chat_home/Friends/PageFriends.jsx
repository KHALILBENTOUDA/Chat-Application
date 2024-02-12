import React, { useEffect, useRef, useState } from "react";
import Seggentions from "../Seggentions";
import { UserLikesCount, searchApi } from "../../../../Redux/Api/ApiAllusers";
import UserSearch from "./UserSearch";
import User from "../User";

const PageFriends = () => {
  const [chosepase, setchosepase] = useState("");
  const [searchType, setsearchType] = useState("");
  const profileInfo = JSON.parse(localStorage.getItem("profile"));
  const [shoe, setshoe] = useState(false);
  const inputRef = useRef();
  const openDropdown = useRef();
  const [users, setusers] = useState([]);
  const [searchData, setsearchData] = useState({
    name: "",
    age: "",
    location: "",
    interests: "",
  });

  const handleFriends = (e) => {
    setchosepase(e);
  };

  const handleChangeSearches = (e) => {
    setsearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleshow = () => {
    setshoe(!shoe);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!openDropdown.current.contains(event.target)) {
        setshoe(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    try {
        const { data } = await searchApi(searchData);
        // Create a set to store unique user IDs
        const uniqueUserIds = new Set();
        // Filter out duplicate users and add only unique users to the array
        const uniqueUsers = data.data.filter(user => {
            if (!uniqueUserIds.has(user.id)) {
                uniqueUserIds.add(user.id);
                return true;
            }
            return false;
        });
        setusers(uniqueUsers);
    } catch (e) {
        console.log(e);
    }
};

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      handleSubmitSearch(event);
    }
  };

  return (
    <div className="">
      <h1 className="text-lg max-md:text-sm text-black max-md:h-[50px]   font-bold flex items-center  rounded-md h-[60px]  shadow-md shadow-slate-100 drop-shadow-sm relative  px-2  w-full z-10 ">
        <i className="fa-solid fa-user-friends px-2"></i> Friends
      </h1>
      <div className="w-[70%] max-md:w-[90%]  mx-auto h-full">
        <div className="flex relative  items-center  w-full mx-auto rounded-xl  mt-8 shadow-sm shadow-slate-200   border  bg-white text-[13px]  ">
          <i className="fa-solid fa-search opacity-50 text-slate-700 pl-3"></i>
          <input
            onChange={handleChangeSearches}
            onKeyPress={handleEnterKey}
            className="outline-none w-full placeholder:text-xs max-md:placeholder:text-[10px] max-md:text-xs max-sm:text-[10px]   p-2 placeholder:w-[140%] placeholder:pl-1 placeholder:text-slate-700 placeholder:opacity-50 rounded-xl"
            type="text"
            name="name" // Set the name directly here
            value={searchData.name}
            id=""
            placeholder="Search new for friends..."
          />
          <span
            onClick={handleshow}
            className=" absolute right-0 max-md:text-[8px] max-md:p-1.5 max-md:mx-0.5  mx-1 opacity-50 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer bg-slate-200 p-1 rounded-lg px-2"
          >
            {`${searchType ? searchType : "Search by"}`}{" "}
            <i
              className={`fa-solid fa-angle-${
                shoe ? "up" : "down"
              } text-sm max-md:text-xs`}
            ></i>
          </span>
        </div>
        {shoe ? (
          <div className="flex gap-2 ">
            <input
              onChange={handleChangeSearches}
              onKeyPress={handleEnterKey}
              className="outline-none placeholder:text-[10px] max-sm:placeholder:text-[7px]  placeholder:flex flex placeholder:items-center max-sm:text-[9px]  placeholder:pl-1 max-sm:placeholder:pl-1  text-[12px] max-md:p-1     p-2 placeholder:w-[140%]  placeholder:text-slate-700 placeholder:opacity-50  items-center  w-full mx-auto rounded-lg  mt-8 shadow-sm shadow-slate-200  border  bg-white "
              type="text"
              name="age"
              value={searchData.age}
              id=""
              placeholder="Enter age..."
            />
            <input
              onChange={handleChangeSearches}
              onKeyPress={handleEnterKey}
              className="outline-none placeholder:text-[10px] max-sm:placeholder:text-[7px]  placeholder:flex flex placeholder:items-center max-sm:text-[9px]   placeholder:pl-1 max-sm:placeholder:pl-1  text-[12px] max-md:p-1     p-2 placeholder:w-[140%]  placeholder:text-slate-700 placeholder:opacity-50  items-center  w-full mx-auto rounded-lg  mt-8 shadow-sm shadow-slate-200  border  bg-white"
              type="text"
              name="location"
              value={searchData.location}
              id=""
              placeholder="Enter location"
            />
            <input
              onChange={handleChangeSearches}
              onKeyPress={handleEnterKey}
              className="outline-none placeholder:text-[10px] max-sm:placeholder:text-[7px]  placeholder:flex flex placeholder:items-center max-sm:text-[9px]   placeholder:pl-1 max-sm:placeholder:pl-1  text-[12px] max-md:p-1.5   p-2  placeholder:w-[140%]  placeholder:text-slate-700 placeholder:opacity-50  items-center  w-full mx-auto rounded-lg  mt-8 shadow-sm shadow-slate-200  border  bg-white"
              type="text"
              name="interests"
              value={searchData.interests}
              id=""
              placeholder="Enter interests tags #"
            />
          </div>
        ) : null}
        <div className=" ">
          <div className=" flex items-start justify-start mt-6">
            <h1
              onClick={() => handleFriends("newFrined")}
              className=" p-2 max-md:py-1.5  max-md:text-[9px]  rounded-full text-slate-400 px-4 mr-2 cursor-pointer bg-kfif font-bold text-xs"
            >
              Friends Requests{" "}
            </h1>
            <h1
              onClick={() => handleFriends("friends")}
              className=" p-2 max-md:py-1.5  max-md:text-[9px]    rounded-full text-slate-400 px-4 mr-2 cursor-pointer bg-kfif font-bold text-xs"
            >
              Your Friends{" "}
            </h1>
          </div>
          <hr className="my-3" />
          {chosepase === "friends" ? (
            <div className="no-scrollbar h-[calc(100vh-320px)]  overflow-y-scroll ">
              <h1 className="font-bold text-[16px] text-slate-400 max-md:text-[13px]  mx-1 mb-5 ">
                Your Friends
              </h1>
              <Seggentions />
            </div>
          ) : (
            <div className="no-scrollbar h-[calc(100vh-320px)]  overflow-y-scroll">
              <h1 className="font-bold text-[16px] text-slate-400 max-md:text-[13px]   mx-1 mb-5 ">
                Poeple you may know
              </h1>
              {users.length > 0 ? (
                    <div className="no-scrollbar h-[calc(100vh-320px)] overflow-y-scroll">
                        {users.map((user) =>
                            user.id === profileInfo.id ? null : (
                                <UserSearch key={user.id} userinfo={user} /> // Add a unique key prop here
                            )
                        )}
                        {users.length === 0 && <p>There are no users with this name!</p>} {/* Render this only if there are no users */}
                        <h1 className="font-bold text-sm text-slate-400 ml-1 py-4 max-md:text-[13px] ">
                            Other people
                        </h1>
                        <Seggentions typeOfUsers={true} />
                    </div>
                ) : (
                    <div className="no-scrollbar h-[calc(100vh-320px)] overflow-y-scroll">
                        <Seggentions typeOfUsers={true} />
                    </div>
                )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageFriends;
