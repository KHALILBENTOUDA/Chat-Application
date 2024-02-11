import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/BASE_URL";

const NoticLocalisation = () => {
  const CurrentUser = useSelector((state) => state.authReducer.authData);
  const profileInfo = JSON.parse(localStorage.getItem("profile"));

  const [showNotice, setShowNotice] = useState(false);

  // Show the notice after 5 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNotice(true);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleClose = () => {
    setShowNotice(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const locaitondata = {
              user_id: profileInfo.id,
              latitude: latitude,
              longitude: longitude,
              UserShoies: 0,
            };

            const res = await axios.post(

              `${BASE_URL}/api/v1/location`,
              locaitondata
            );

            console.log(res);

            if (res.status === "success") {
            }
          } catch (axiosError) {}
        },
        (geoError) => {
          if (geoError.code === 1) {
            console.log(
              "User denied geolocation permission. Provide a user-friendly message."
            );
          }
        }
      );
    } else {
      console.log("Geolocation not supported");
    }
  }; 

  const handleAllow = async () => {
    setShowNotice(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const locaitondata = {
              user_id: profileInfo.id,
              latitude: latitude,
              longitude: longitude,
              UserShoies: 1,
            };

            const res = await axios.post(
              `${BASE_URL}/api/v1/location`,
              locaitondata
            );
            console.log(res);
            if (res.status === "success") {
            }
          } catch (axiosError) {}
        },
        (geoError) => {
          if (geoError.code === 1) {
            console.log(
              "User denied geolocation permission. Provide a user-friendly message."
            );
          }
        }
      );
    } else {
      console.log("Geolocation not supported");
    }
  };

  if (!showNotice) {
    return null;
  }

  console.log(profileInfo)
  
  return (
    <>
      {profileInfo.UserShoies === null ? (
        <div className="noticLocation h-[200px] max-sm:w-[300px]  rounded-2xl  bg-white  shadow-md shadow-slate-300 ">
          <div className="w-full  flex justify-end p-2 ">
            <i
              className="fa-solid fa-close text-lg  max-sm:text-md  rounded-full bg-slate-200 w-8 h-8 flex items-center justify-center cursor-pointer "
              onClick={handleClose}
            ></i>
          </div>
          <div className="w-full text-center">
            <h1 className="text-xl max-sm:text-lg  font-bold text-black">
              <i className="fa-solid fa-location-dot text-lgrn"></i>{" "}
              LOCALISATION
            </h1>
            <p className="text-[9px] max-sm:text-[8px]  p-3">
              To unlock the full potential of our app and enjoy all features
              seamlessly, we kindly ask for your permission to access your
              location. Rest assured, your privacy is our priority, and we will
              only use your location information to enhance your experience.
              Simply click 'Allow' to get started. Thank you for choosing our
              app!
            </p>
          </div>
          <div className="absolute bottom-0 flex gap-4 p-3 items-center justify-center w-full">
            <button
              className="bg-cardColor py-1.5 px-8 text-sm  max-sm:text-xs font-bold text-lgrn rounded-full"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="py-1.5 px-8 text-sm font-bold bg-lgrn  max-sm:text-xs  text-white  rounded-full"
              onClick={handleAllow}
            >
              Allow
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NoticLocalisation;
