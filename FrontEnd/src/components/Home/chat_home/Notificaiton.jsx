import React, { useEffect, useState } from "react";
import profile from "../../../assets/images/profile-1.jpg";
import Seggentions from "./Seggentions";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  siReadApi,
} from "../../../Redux/Api/ApiNotifications";
import { getAllNotifications } from "../../../Redux/Actions/ActionNotification";
import { Emage_Profile } from "../../../Redux/Api/ApiEmage";
import { useNavigate } from "react-router-dom";

const Notificaiton = ({ sethandleNavigate, setCountNotif }) => {
  const notifications = useSelector(
    (state) => state.NotificationReducer.notificaions
  );

  const profileInfo = JSON.parse(localStorage.getItem("profile"));
  const [noti_data, setnoti_data] = useState([]);
  const [sender_inforamtions, setsender_inforamtions] = useState([]);
  const AllUSERS = useSelector((state) => state.AllUsersReducer.AllUsers);
  const [IsRead, setIsRead] = useState([]);
  const [photos, setphotos] = useState(null);
  const [combinedData, setCombinedData] = useState([]);
  const dispatch = useDispatch();

  // filter current user
  useEffect(() => {
    const seseve_data = {
      receiver_id: profileInfo.id,
    };
    dispatch(getAllNotifications(seseve_data));
  }, []);

  useEffect(() => {
    // Filter and combine data when notifications or AllUSERS change
    const combinedArray = notifications?.map((notification) => {
      const senderInfo = AllUSERS.find(
        (user) => user.id === notification.sender_id
      );

      return {
        ...notification,
        senderInfo: senderInfo || null,
      };
    });

    setCombinedData(combinedArray);
  }, [notifications, AllUSERS]);

  // useEffect(() => {
  //   notifications?.filter((sender) => {
  //     if (sender.sender_id !== profileInfo.id) {
  //       setsender_inforamtions(
  //         AllUSERS.filter((user) => user.id === sender.sender_id)
  //       );
  //     }

  //     if (sender.sender_id !== profileInfo.id) {
  //       setphotos(
  //         AllUSERS.find((user) => user.id === sender.sender_id)
  //       );
  //     }

  //   });
  //   setnoti_data(
  //     notifications?.filter((sender) => sender.sender_id !== profileInfo.id)
  //   );

  // }, [notifications, AllUSERS, profileInfo.id]);

  const handleIsRead = async (id) => {
    try {
      const res = await siReadApi({ id: id });
      setIsRead((prevIds) => [...prevIds, id]);
    } catch (e) {
      console.log(e);
    }
  };

  const navigate = useNavigate();
  const handleClick = (user) => {
    navigate('/profile')
    dispatch({ type: "GET_USERS_DATA", data:user });
    handleIsRead(user.id);
  };

  const reversedData = combinedData ? [...combinedData].reverse() : [];

  return (
    <div className="">
      <h1 className="text-lg font-bold text-black  py-[15.5px]  rounded-md m-0.5 max-md:mx-0 max-md:text-sm  ml-1  bg-white  px-4 shadow-md shadow-slate-100 drop-shadow-sm ">
        <i className="fa-solid fa-bell text-black pr-3"></i>
        Notifications
      </h1>
      <ul className="w-full py-3">
        {reversedData?.length > 0 ? (
          reversedData?.map((not) => {
            const times = not.created_at;
            const dateObj = new Date(times);
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const period = hours >= 12 ? "PM" : "AM";
            const formattedHours = hours % 12 || 12;
            const formattedTime = `${formattedHours}:${minutes} ${period}`;
            if (not.receiver_id === profileInfo.id) {
              const sender = not.senderInfo || {}; // Use senderInfo from combined data
              const senderPhotos =
                AllUSERS.find((user) => user.id === not.sender_id) || {};

              return (
                <li
                  key={not.id}
                  onClick={() => handleClick(not.senderInfo)}
                  className={`flex w-full  items-center justify-between py-2 my-1 px-6 max-md:px-3 rounded-md ${
                    IsRead.includes(not.id) || not.is_Read
                      ? "opacity-40"
                      : "bg-white cursor-pointer"
                  }`}
                >
                  <div className="flex items-center ">
                  <img
                    src={`${Emage_Profile}${not.senderInfo.picture_url}`}
                    className="h-10 w-10 max-md:h-7 max-md:w-7 rounded-full"
                    alt=""
                  />
                  <h1 className="text-blue-600 text-sm font-bold px-3 max-sm:text-[10px] max-md:text-xs   items-center">
                    @{sender.name + " "}
                    <span className="text-black font-thin text-xs max-sm:text-[10px] max-md:text-xs opacity-60">
                      {not.content}
                    </span>
                  </h1>
                  </div>
                  <div className="text-xs max-sm:text-[9px] max-md:text-[10px]  font-bold text-black opacity-50 mt-1">
                    {formattedTime}
                  </div>
                </li>
              );
            } else {
              <h2 className="py-5 max-md:py-3 opacity-40 text-sm px-5 max-md:px-3">
                There's no notification right now!
              </h2>;
            }
          })
        ) : (
          <h2 className="py-5 max-md:py-3 opacity-40 text-sm px-5 max-md:px-3">
            There's no notification right now!
          </h2>
        )}
      </ul>
      <hr />
      <div className="px-6 max-md:px-3">
        <h1 className="font-bold text-xl text-black py-6 max-md:text-sm max-md:py-3">
          Seggsntion
        </h1>
        <Seggentions typeOfUsers={true} sethandleNavigate={sethandleNavigate} />
      </div>
    </div>
  );
};

export default Notificaiton;
