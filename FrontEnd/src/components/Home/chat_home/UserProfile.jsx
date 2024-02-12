import React, { useEffect, useRef, useState } from "react";
import profile from "../../../assets/images/user (1).png";
import star from "../../../assets/images/star.png";
import { Link, useNavigate } from "react-router-dom";
import pror from "../../../assets/images/user (1).png";
import Seggentions from "./Seggentions";
import { useDispatch, useSelector } from "react-redux";
import ageimage from "../../../assets/images/age.png";
import gender from "../../../assets/images/genders.png";
import {
  UserLikesCount,
  getInputChat,
  like,
  unlike,
} from "../../../Redux/Api/ApiAllusers";
import { getChat, startChatWith, userChats } from "../../../Redux/Api/ApiChat";
import { getSpechiatChat } from "../../../Redux/Api/ApiMessages";
import {
  NewNotification,
  getAllNotifications,
} from "../../../Redux/Actions/ActionNotification";
import { createView } from "../../../Redux/Api/ApiVew";
import {
  Emage_Cover,
  Emage_Post,
  Emage_Profile,
  allposts,
  profileApi,
} from "../../../Redux/Api/ApiEmage";
import {
  SendEmageProfile,
  SendEmageProfileCover,
  SendEmageProfilePost,
} from "../../../Redux/Actions/ActionEmage";

const UserProfile = ({ sethandleNavigate, setcurrentChat }) => {
  const CurrentUser = useSelector((state) => state.UsersProfile.Users);
  const newEmage = useSelector((state) => state.EmageReducer.emageProfile);
  const cover = useSelector((state) => state.EmageReducer.Cover);
  const post = useSelector((state) => state.EmageReducer.Post);

  const profileInfo = JSON.parse(localStorage.getItem("profile"));
  const Username = CurrentUser?.name + "_" + CurrentUser?.lastname;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilepost, setSelectedFilepost] = useState(null);
  const [selectFileCover, setselectFileCover] = useState(null);
  const [navig, setnavig] = useState(false);
  const [photos, setphotos] = useState([]);

  const [isLiked, setIsLiked] = useState(false);
  const [isLikedmessage, setIsLikedmessage] = useState(false);
  const [likesCount, setlikesCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    scroll.current?.scrollTo({ top: 0 });
  }, [CurrentUser]);

  useEffect(() => {
    const fetchUser = async () => {
      const likeData = {
        liked_id: profileInfo.id,
        Currend_id: CurrentUser.id,
      };
      try {
        const userLikes = await UserLikesCount(likeData);
        const likedUser = userLikes.data.data;
        setlikesCount(userLikes.data.data.length);
        setIsLiked(
          likedUser.some((like) => like.liked_user_id === profileInfo.id)
        );
      } catch (error) {
        console.log("Error fetching user likes:", error.message);
      }
    };
    fetchUser();
  }, [profileInfo.id, CurrentUser.id]);


const handlelike = async (idC_Liked) => {
      try {
        const likeData = {
          liked_id: profileInfo.id,
          Currend_id: idC_Liked,
        };
        const res = await like(likeData);
        setlikesCount(res.data.data);
        setIsLiked(true);
        const notificaion = {
          sender_id: profileInfo.id,
          receiver_id: idC_Liked,
          content: `has like you`,
        };
        dispatch(NewNotification(notificaion));
      } catch (e) {
        console.log(e);
      }
  };
  
  const handleUnlike = async (idC_Liked) => {
    try {
      const likeData = {
        liked_id: profileInfo.id,
        Currend_id: idC_Liked,
      };
      const res = await unlike(likeData);
      setlikesCount(res.data.data);
      setIsLiked(false);
      const notificaion = {
        sender_id: profileInfo.id,
        receiver_id: idC_Liked,
        content: `has Unlike you`,
      };
      dispatch(NewNotification(notificaion));
    } catch (error) {
      console.error("Error unliking user:", error.message);
    }
  };

  const startChat = async () => {
    const chatDat = {
      sender: profileInfo.id,
      resever: CurrentUser.id,
    };
    try {
      const first_id = profileInfo.id;
      const second_id = CurrentUser.id;
      const getchatdata = await getChat(first_id, second_id);
      if (getchatdata.data.chat[0]) {
        setcurrentChat(getchatdata.data.chat[0]);
        navigate("/chat");
      } else {
        const res = await startChatWith(chatDat);
        setcurrentChat(res.data.chat[0]);

        navigate("/chat");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleSubmit();
    }
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // update profile emage
  const handleSubmit = async () => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append("pictures", selectedFile);
    dispatch(SendEmageProfile(profileInfo.id, formData));
  };

  // getAllPosts
  useEffect(() => {
    if (selectFileCover) {
      handleSubmitConver();
    }
  }, [selectFileCover]);

  const handleFileChangeCover = (e) => {
    const file = e.target.files[0];
    if (file) {
      setselectFileCover(file);
    }
  };

  const handleSubmitConver = async () => {
    if (!selectFileCover) {
      return;
    }
    const formData = new FormData();
    formData.append("pictures", selectFileCover);
    dispatch(SendEmageProfileCover(profileInfo.id, formData));
  };

  // send Posts
  useEffect(() => {
    if (selectedFilepost) {
      handleSubmitPost();
    }
  }, [selectedFilepost]);

  const handleFileChangePost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFilepost(file);
    }
  };

  const handleSubmitPost = async () => {
    if (!selectedFilepost) {
      return;
    }
    const formData = new FormData();
    formData.append("pictures", selectedFilepost);
    dispatch(SendEmageProfilePost(profileInfo.id, formData));
  };

  // get all posts
  useEffect(() => {
    const handleGetAllposts = async () => {
      try {

        const { data } = await allposts(CurrentUser.id);
        setphotos(data.data);
      } catch (e) {
        console.log(e);
      }
    };
   handleGetAllposts();
  }, [CurrentUser.id]);

  const handleChangedtails = (status) => {
    setnavig(status);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const likeData = {
        liked_id: profileInfo.id,
        Currend_id: CurrentUser?.id,
      };
      try {
        const inputStatus = await getInputChat(likeData);

        const inputSt = inputStatus.data.showChatInput;
        setIsLikedmessage(inputSt);
      } catch (error) {
        console.error("Error fetching user likes:", error.message);
      }
    };
    if (CurrentUser !== null) fetchUser();
  }, [profileInfo, CurrentUser]);

  // useEffect(() => {
  //  const viewProfile=async()=>{
  //   const viewData = {
  //     Visiter: profileInfo.id,
  //     Viewer:CurrentUser.id,
  //   };
  //   console.log(viewData)

  //   const res = createView(viewData)
  //   console.log(res)
  //   const notificaion={
  //     sender_id: profileInfo.id,
  //     receiver_id:CurrentUser.id,
  //     content:`has Visited your profile`
  //   }
  //   dispatch(NewNotification(notificaion))
  //  }
  //  if(CurrentUser !== null  ) viewProfile()
  // }, [profileInfo,CurrentUser])

  // cul only birthdate

  const age = new Date(CurrentUser.birthdate).toISOString()?.split("T")[0];
  const scroll = useRef();
  const idC_Liked = CurrentUser.id;
  return (
    <div ref={scroll} className="overflow-y-scroll no-scrollbar ">
      <div className=" ">
        <div className=" w-full relative">
          <div className="h-10 w-full bg-white absolute opacity-20   shadow-md  "></div>
          <i
            onClick={() => sethandleNavigate("leftSide")}
            className="fa-solid md:hidden  fa-angle-left text-[20px] flex items-center justify-center  cursor-pointer text-white  absolute m-1 w-7 h-7 rounded-full "
          ></i>
          {CurrentUser.Covers || cover ? (
            <img
              src={`${Emage_Cover}${cover || CurrentUser.Covers}`}
              className="w-full rounded-md h-[300px] max-md:h-[200px] shadow-xl bg-slate-100 "
              alt=""
            />
          ) : (
            <div className="w-full rounded-md h-[300px] max-md:h-[200px] shadow-md flex items-center justify-center ">
              <i className="fa-solid fa-image opacity-10 text-[100px] max-md:text-[50px]"></i>
            </div>
          )}
          {profileInfo.id === CurrentUser.id ? (
            <label for="dropzone-file">
              <div class="">
                <i
                  id="select"
                  name="select"
                  className="transition-all fa-solid fa-camera text-black absolute  right-5 top-[80%] p-2 bg-white rounded-full cursor-pointer hover:bg-slate-100 z-10"
                  onClick={() => document.getElementById("fileInput").click()}
                ></i>
              </div>
              <input
                onChange={handleFileChangeCover}
                type="file"
                id="dropzone-file"
                className="boder    text-tex  sm:text-sm rounded-xl focus:ring-1 outline-none hidden  w-full   p-2  dark:placeholder-gray-400 font-bold dark:focus:ring-grn dark:focus:border-grn"
              />
            </label>
          ) : null}
        </div>

        <div className="text-center ">
          <div className=" relative">
            <div className="w-full  flex justify-center absolute -top-14 max-sm:-top-10 ">
              <div className=" relative rounded-full shadow-md shadow-slate-100 drop-shadow-sm  ">
                <img
                  src={
                    CurrentUser.picture_url || newEmage
                      ? `${Emage_Profile}${newEmage || CurrentUser.picture_url}`
                      : profile
                  }
                  className="w-[110px] h-[110px] lg:h-[130px]  lg:w-[130px] rounded-full  max-md:border-2 max-sm:w-[90px] max-sm:h-[90px]   border-4 border-white bg-slate-100  "
                  alt=""
                />
                {profileInfo.id === CurrentUser.id ? (
                  // profileApi
                  <label htmlFor="dropzone-file-profile">
                    <div class="">
                      <i
                        id="select"
                        name="select"
                        className="max-md:text-[10px]  max-sm:p-1 transition-all fa-solid fa-plus bottom-0 right-1 absolute p-1.5 border-2 border-white bg-lgrn text-white rounded-full cursor-pointer hover:bg-slate-300"
                        onClick={() =>
                          document.getElementById("fileInput").click()
                        }
                      ></i>
                    </div>
                    <input
                      onChange={handleFileChange}
                      type="file"
                      id="dropzone-file-profile"
                      className="boder    text-tex  sm:text-sm rounded-xl focus:ring-1 outline-none hidden  w-full   p-2  dark:placeholder-gray-400 font-bold dark:focus:ring-grn dark:focus:border-grn"
                    />
                  </label>
                ) : null}
              </div>
            </div>
          </div>
          <div className="pt-10">
            <h1 className="text-black font-bold text-xl pb-2  pt-12 max-sm:pt-10  max-md:pt-3 max-sm:text-md">
              {Username.toUpperCase()}
            </h1>
            <p className="text-sm font-bold text-grn max-sm:text-[11px] ">
              @{CurrentUser.lastname}
            </p>
            <div className=" py-5 max-sm:py-2  text-xs max-sm:text-[10px]">
              software Developper
            </div>
            <div className="flex items-center  justify-around pt-6  max-sm:pt-1   w-[60%] mx-auto">
              <div className="">
                <span className="text-black font-bold text-2xl max-sm:text-[17px] max-md:text-md ">
                  {likesCount}
                </span>
                <p className="opacity-30 text-xs font-bold max-md:text-[11px] max-sm:text-[11px] ">
                  Likers
                </p>
              </div>
              <div className="">
                <span className="text-black font-bold text-2xl max-sm:text-[17px] max-md:text-md ">{`${photos?.length}`}</span>
                <p className="opacity-30 text-xs font-bold max-md:text-[11px] max-sm:text-[11px]  ">
                  Photos
                </p>
              </div>
              <div className="text-center">
                <span className="text-black font-bold text-2xl flex items-center max-sm:text-[17px] max-md:text-md">
                  <p>4.5</p>
                  <img
                    src={star}
                    className="w-6 max-sm:w-4 max-md:w-5"
                    alt=""
                  />
                </span>
                <p className="opacity-30 text-xs font-bold max-md:text-[11px] max-sm:text-[11px]  ">
                  Reviews
                </p>
              </div>
            </div>
            <div className="m-5 w-[60%] mx-auto  flex gap-6 justify-center items-center">
              <button
                onClick={
                  isLiked
                    ? () => handleUnlike(idC_Liked)
                    : () => handlelike(idC_Liked)
                }
                className={`w-[40%] text-lg   h-8 max-sm:h-7 max-md:text-xs  rounded-full ${
                  isLiked ? " bg-ble" : " bg-lgrn"
                } text-white`}
              >
                <i
                  className={`fa-${
                    isLiked ? "solid" : "regular"
                  } fa-thumbs-up pr-2 max-md:pr-1`}
                ></i>
                {isLiked ? "Unlike" : "Like"}
              </button>

              {CurrentUser.id !== profileInfo.id ? (
                isLikedmessage ? (
                  <button
                    onClick={startChat}
                    className="w-[40%] pr-1 h-8 rounded-full  max-sm:h-7 max-md:text-xs   bg-slate-100 text-black  max-sm:text-[10px]  flex items-center justify-center "
                  >
                    <i className="fa-solid fa-paper-plane text-black text-xs pr-2"></i>
                    <h1 className="text-md">message</h1>
                  </button>
                ) : null
              ) : (
                <button
                  onClick={() => navigate("/edit_profile")}
                  className="w-[45%] pr-1 h-8 rounded-full    max-sm:h-7 max-md:text-xs max-sm:text-[10px]  bg-slate-100 text-black flex items-center justify-center "
                >
                  <i className="fa-solid fa-pencil text-black text-[10px] pr-2"></i>
                  <h1 className="text-md">Edit profile</h1>
                </button>
              )}
            </div>

            <hr className=" shadow-sm mt-8" />
            <div className="w-full text-start bg-cardColor p-2 flex items-center gap-3">
              <span
                onClick={() => handleChangedtails(false)}
                className="px-2 transition cursor-pointer  p-1.5 bg-notifi2 hover:bg-notifi  shadow-sm max-sm:text-[8px] max-sm:py-0.5  text-xs font-bold max-md:text-xs rounded-full text-white"
              >
                Information
              </span>
              <span
                onClick={() => handleChangedtails(true)}
                className="px-2 transition cursor-pointer  p-1.5 bg-notifi2  hover:bg-notifi shadow-sm max-sm:text-[8px] max-sm:py-0.5  text-xs font-bold max-md:text-xs rounded-full text-white"
              >
                Photos
              </span>
            </div>
            <div className="text-start px-5 bg-cardColor">
              {!navig ? (
                <div className="">
                  <h1 className="text-black font-bold text-lg py-3 max-md:text-[11px] max-sm:py-2">
                    Description
                  </h1>
                  <p className="opacity-70 text-sm max-sm:text-[11px]">
                    {CurrentUser.biography}
                  </p>
                  <hr className="mt-5" />
                  <h1 className="text-black font-bold text-lg py-3 max-md:text-[11px] max-sm:py-2">
                    Some Posts
                  </h1>
                  <div className="flex items-center gap-2">
                    {profileInfo.id === CurrentUser.id ? (
                      // profileApi
                      <label htmlFor="dropzone-file-post">
                        <div class="">
                          <i
                            id="select"
                            name="select"
                            className="max-md:text-[10px] max-sm:p-1 transition-all fa-solid fa-plus bottom-0 right-1 w-14 h-14  max-sm:w-8 max-sm:h-8   bg-gradient-to-tr from-lgrn to ble   flex items-center justify-center  border-[1px] border-white bg-ble text-white rounded-md cursor-pointer hover:opacity-60 "
                            onClick={() =>
                              document.getElementById("fileInput").click()
                            }
                          ></i>
                        </div>
                        <input
                          onChange={handleFileChangePost}
                          type="file"
                          id="dropzone-file-post"
                          className="boder     text-tex  sm:text-sm rounded-xl focus:ring-1 outline-none hidden  w-full   p-2  dark:placeholder-gray-400 font-bold dark:focus:ring-grn dark:focus:border-grn"
                        />
                      </label>
                    ) : null}

                    { photos.slice(0,5).map((item) => (
                      
                      <img
                        src={`${Emage_Post}${item?.Posts}`}
                        className="w-14 h-14 max-sm:w-8 max-sm:h-8 rounded-md border-[1px] border-white shadow-sm"
                        alt=""
                      />
                     
                    ))}
                     {
                        photos.length > 5 && <i   onClick={() => handleChangedtails(true)}  className="fa-solid fa-angle-double-right m-2 text-xl max-sm:text-lg max-sm:m-1 opacity-50 cursor-pointer"></i>
                      }
                  </div>
                  <hr className="mt-5" />
                  <h1 className="text-black font-bold text-lg py-3 max-md:text-sm flex items-center justify-between">
                    Details
                  <i 
                   onClick={() => navigate("/edit_profile")}
                  className="fa-solid w-10 h-10 max-sm:w-8 max-sm:h-8 flex items-center justify-center   bg-white rounded-full  fa-edit cursor-pointer"></i>
                  </h1>
                  <ul className=" flex flex-col items-start justify-center">
                    <li className="flex items-center gap-4 pb-4">
                      <i className="fa-solid fa-user-astronaut  text-black"></i>
                      <p className="text-xs text-grn  flex-col ">
                        <span className="font-bold text-sm max-md:text-[10px]">
                          {CurrentUser.name + " " + CurrentUser.lastname}
                        </span>
                      </p>
                    </li>
                    <li className="flex items-center gap-4">
                      <img src={gender} className="w-4" alt="" />
                      <p className="text-xs max-md:text-[10px] ">
                        Gender{" "}
                        <span className="font-bold text-black ">
                          {CurrentUser.gender_name}
                        </span>
                      </p>
                    </li>
                    <li className="flex items-center gap-4 py-4 ">
                      <img src={ageimage} className="w-4" alt="" />
                      <p className="text-xs max-md:text-[10px] ">
                        Age <span className="font-bold text-black">{age}</span>
                      </p>
                    </li>
                    {CurrentUser.UserShoies === 1 ? (
                      <>
                        <li className="flex items-center gap-4 pb-4">
                          <i className="fa-solid fa-location-dot  text-black  flex flex-col"></i>
                          <p className="text-xs max-md:text-[10px] ">
                            Lives in{" "}
                            <span className="font-bold text-black text-xs max-md:text-[10px]">
                              {CurrentUser?.country ? (
                                CurrentUser.country
                              ) : (
                                <span className="opacity-50 font-normal max-md:text-[10px]">
                                  Current country not Found
                                </span>
                              )}
                            </span>
                          </p>
                        </li>
                        <li className="flex items-center gap-4 pb-4">
                          <i className="fa-solid fa-map-location text-black  flex flex-col"></i>
                          <p className="text-xs max-md:text-[10px] ">
                            In{" "}
                            <span className="font-bold text-black text-xs max-md:text-[10px]">
                              {CurrentUser?.city ? (
                                CurrentUser.city
                              ) : (
                                <span className="opacity-50 font-normal max-md:text-[10px]">
                                  Current city not Found
                                </span>
                              )}
                            </span>
                          </p>
                        </li>
                        <li className="flex items-center gap-4 pb-4">
                          <i className="fa-solid fa-home text-black  flex flex-col"></i>
                          <p className="text-xs max-md:text-[10px] ">
                            At{" "}
                            <span className="font-bold text-black text-xs">
                              {CurrentUser?.neighborhood ? (
                                CurrentUser.neighborhood
                              ) : (
                                <span className="opacity-50 font-normal max-md:text-[10px]">
                                  Current neighborhood not Found
                                </span>
                              )}
                            </span>
                          </p>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              ) : (
                <div className="w-full  grid grid-cols-3 gap-1">
                  <div className="">
                  {profileInfo.id === CurrentUser.id ? (
                   <label htmlFor="dropzone-file-post">
                        <div class="w-full h-full">
                          <i
                            id="select"
                            name="select"
                            className="max-md:text-[10px] max-sm:p-1 text-2xl  transition-all fa-solid fa-plus bottom-0 right-1 w-full h-full   bg-gradient-to-tr from-lgrn to ble   flex items-center justify-center  border-[1px] border-white bg-ble text-white rounded-md cursor-pointer hover:opacity-60"
                            onClick={() =>
                              document.getElementById("fileInput").click()
                            }
                          ></i>
                        </div>
                        <input
                          onChange={handleFileChangePost}
                          type="file"
                          id="dropzone-file-post"
                          className="boder    text-tex  sm:text-sm rounded-xl focus:ring-1 outline-none hidden  w-full   p-2  dark:placeholder-gray-400 font-bold dark:focus:ring-grn dark:focus:border-grn"
                        />
                      </label>
                    ) : null}

                  </div>

                  {photos.length > 0  ? (
                    photos.map((item) => (
                      <div className="bg-slate-200  rounded-lg ">
                        <img
                          src={`${Emage_Post}${item?.Posts}`}
                          className="w-full  rounded-lg  max-md:h-full border-[1px] border-white shadow-sm"
                          alt=""
                        />
                      </div>
                    ))
                  ) : (
                    <p className="py-5 opacity-60 ">there's no photos !</p>
                  )}
                </div>
              )}

              <hr className="mt-6" />
              <h1 className="text-black font-bold text-lg py-4 max-md:text-sm">
                People may to know
              </h1>
              <Seggentions
                typeOfUsers={true}
                sethandleNavigate={sethandleNavigate}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default UserProfile;
