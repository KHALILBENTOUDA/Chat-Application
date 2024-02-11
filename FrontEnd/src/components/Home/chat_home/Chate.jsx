import React, { useEffect, useRef, useState } from "react";
import profile from "../../../assets/images/profile-2.jpg";
import choseChat from "../../../assets/images/online-dating-with-young-man-woman-are-texting-each-other-chatting-via-smartphone-illustration_138260-1015.jpeg";
import { format, render, cancel, register } from "timeago.js";
import { GetUser } from "../../../Redux/Api/ApiCurrentUser";
import pror from "../../../assets/images/user (1).png";

import {
  AddMessage,
  getSpechiatChat,
  sendIsRedMessage,
  sendMessageNotification,
} from "../../../Redux/Api/ApiMessages";
import InputEmoji from "react-input-emoji";
import attach from "../../../assets/images/paperclip.png";
import { UserLikesCount, getInputChat } from "../../../Redux/Api/ApiAllusers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Emage_Message, Emage_Profile } from "../../../Redux/Api/ApiEmage";

import RecordRTC from "recordrtc";
import { useMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
const Chate = ({
  chat,
  currentUser,
  OnlineUsers,
  setsendToSocketMSG,
  reciveToSocketMSG,
  sethandleNavigate,
  CurrentNotification,
  isTyping,
  typing,
  stopTyping,
  settyping,
}) => {
  const [ChatUser, setChatUser] = useState(null);
  const [messges, setmessges] = useState([]);
  const [sendMessage, setsendMessage] = useState("");

  const profileInfo = JSON.parse(localStorage.getItem("profile"));
  const token = localStorage.getItem("token");
  const [timed, settimed] = useState(null);
  const [IsLiked, setIsLiked] = useState("");
  const [notification, setnotification] = useState([]);
  const [startTypping, setstartTypping] = useState(false);
  const [selectedFileMessage, setSelectedFileMessage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordStartTime, setRecordStartTime] = useState(null);
  const [recordDuration, setRecordDuration] = useState(null);
  const [UserTyping, setUserTyping] = useState("");
  const [send, setsend] = useState({});

  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.NotificationReducer.notificaions
  );
  const refAudio = useRef(null);
  const recorderRef = useRef(null);

  const handleText = (newMessage) => {
    setsendMessage(newMessage);
  };

  const handleRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorderRef.current = new RecordRTC(stream, { type: "audio" });
    recorderRef.current.startRecording();
    setRecordStartTime(new Date());
    setIsRecording(true);
  };

  const handleStop = () => {
    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current.getBlob();
      setAudioBlob(blob);
      setRecordDuration(new Date() - recordStartTime);
      setIsRecording(false);
    });
  };

  useEffect(() => {
    if (audioBlob && refAudio.current) {
      refAudio.current.src = URL.createObjectURL(audioBlob);
    }
  }, [audioBlob]);

  // useEffect(() => {

  //   if (!refAudio.current) {
  //     return;
  //   }
  // }, [stream, refVideo]);

  // const { status, startRecording, stopRecording } = useReactMediaRecorder({
  //   audio: true,
  //   onStop: (blob) => {
  //     // This callback is called when the recording is stopped
  //     setAudioBlob(blob);
  //   },
  // });

  // console.log(audioBlob)

  // const handleStartRecording = () => {
  //   startRecording();
  // };

  // const handleStopRecording = () => {
  //   stopRecording();
  // };

  // Function to convert Blob to Buffer
  const convertBlobToBuffer = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(Buffer.from(reader.result));
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };

  useEffect(() => {
    scroll.current?.scrollTo({ top: scroll.current?.scrollHeight });
  }, [messges, typing]);

  useEffect(() => {
    const getChatBox = async () => {
      const chatbo = JSON.parse(chat?.members);
      const userId = chatbo.find((id) => id !== currentUser);
      setUserTyping(userId);
      try {
        const resposs = await GetUser(userId,token);
        setChatUser(resposs.data.User);
      } catch (err) {
  
      }
    };
    if (chat !== null) getChatBox();
  }, [chat]);

  // fietching data to messages

  useEffect(() => {
    const getmessages = async () => {
      try {
        const resposs = await getSpechiatChat(chat.chat_id);
        if (resposs.data.status === "success") {
          setmessges(resposs.data.messages);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    if (chat !== null) getmessages();
  }, [chat]);

  const handleFileChangeSendEmage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileMessage(file);
    }
  };


  const handelSandMessage = async () => {
    if (isRecording) {
      handleStop();
    }
    
    settyping(false);

    const messagesend = new FormData();
    messagesend.append("chat_id", chat.chat_id);
    messagesend.append("sender_id", currentUser);
    messagesend.append("text", sendMessage);
    messagesend.append("image", selectedFileMessage);
    


    const chatbo = JSON.parse(chat.members);
    const resiverId = chatbo.find((id) => id !== currentUser);
    const messagesendto = {
      chat_id: chat.chat_id,
      sender_id: currentUser,
      text: sendMessage,
      image: selectedFileMessage,
    };
    setsendToSocketMSG({ ...messagesendto, resiverId });
    const ntifMessage = {
      chat_id: chat.chat_id,
      sender_id: currentUser,
      text: sendMessage,
      receiver_id: resiverId,
      image: selectedFileMessage?.name,
    };

    try {
      const { data } = await AddMessage(messagesend);
      const newMessage = data.data[0];
      setmessges([...messges, newMessage]);
      setsendMessage("");
      sendMessageNotification(ntifMessage);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedFileMessage) {
      handelSandMessage();
      setSelectedFileMessage(null);
    }
  }, [selectedFileMessage]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setmessges([...messges,sendMessage ]);
      handelSandMessage();
      settyping(false);
    } else {
      isTyping(profileInfo.id);
    }
  };
  // send is Read Notifications
  useEffect(() => {
    const sendIsRead = async () => {
      try {
        const res = await sendIsRedMessage({
          chat_id: chat.chat_id,
          receiver_id: profileInfo.id,
        });
      } catch (err) {
        console.log(err);
      }
    };
    sendIsRead();
  }, [chat]);

  // resuce messages from socket io
  useEffect(() => {
    if (
      reciveToSocketMSG !== null &&
      chat !== null &&
      reciveToSocketMSG.chat_id === chat.chat_id
    ) {
      setmessges([...messges, reciveToSocketMSG]);
    }
  }, [reciveToSocketMSG, chat]);

  useEffect(() => {
    if (chat !== null && chat.chat_id === reciveToSocketMSG?.chat_id) {
      dispatch({
        type: "MESSAGE_NOTIFICATIONS",
        data: { ...reciveToSocketMSG, isRead: true },
      });
    } else {
      dispatch({ type: "MESSAGE_NOTIFICATIONS", data: reciveToSocketMSG });
    }
  }, [reciveToSocketMSG]);

  const scroll = useRef();

  // npm install date-fns
  // check if user like

  useEffect(() => {
    const typinf = () => {
      const chatbo = JSON.parse(chat.members);
      const userId = chatbo.find((id) => id !== currentUser);
      if (typing.chat_id === chat.chat_id && userId !== currentUser) {
        setstartTypping(true);
      }
    };
    if (chat !== null) return typinf;
  }, [typing, chat]);

  useEffect(() => {
    const fetchUser = async () => {
      const likeData = {
        liked_id: profileInfo.id,
        Currend_id: ChatUser?.id,
      };
      try {
        const inputStatus = await getInputChat(likeData);
        const inputSt = inputStatus.data.showChatInput;

        setIsLiked(inputSt);
      } catch (error) {
        console.error("Error fetching user likes:", error.message);
      }
    };
    if (chat !== null) fetchUser();
  }, [profileInfo, chat]);
  // gol to profile
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch({ type: "GET_USERS_DATA", data: ChatUser });
    navigate("/profile");
  };

  let prevMessageTime = null;
  return (
    <>
      {chat ? (
        <>
          <div className="flex py-1.5 items-center rounded-md h-[60px]  shadow-md  shadow-slate-200  relative max-md:px-1  px-2  w-full z-10   ">
            <i
              onClick={() => sethandleNavigate("leftSide")}
              className="fa-solid max-md:text-[14px] max-md:pr-2  md:hidden  fa-angle-left text-[20px] pr-3 cursor-pointer pl-1 "
            ></i>




            {
              ChatUser?(
                  <div className="flex items-end justify-end pl-2">
                    <div
                      onClick={handleClick}
                      className="w-[45px] h-[45px] max-md:w-[32px] max-md:h-[32px] relative flex items-end justify-end"
                    >
                      <img
                        src={
                          ChatUser?.picture_url
                ? `${Emage_Profile}${ChatUser?.picture_url}`
                : pror}
                        className="w-[45px] h-[45px] max-md:w-[32px] max-md:h-[32px] rounded-full border-[2px] border-white cursor-pointer"
                        alt=""
                      />
                      {OnlineUsers(chat) ? (
                        <div className="h-2.5 w-2.5 duration-300 max-md:h-2.5 max-md:w-2.5 border-[1px] border-slate-50 mr-0.5 absolute right rounded-full bg-green-500">
                          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 duration-300"></div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div
                      onClick={handleClick}
                      className="px-4 max-md:px-2 cursor-pointer"
                    >
                      <h1 className="font-bold text-[17px] max-md:text-xs mt-1">
                        {ChatUser ? ChatUser.name : "loading..."}
                      </h1>
                      {OnlineUsers(chat) === true ? (
                        <p className="text-[11px] max-md:text-[8px] opacity-50 text-green-500 font-bold">
                          Online
                        </p>
                      ) : (
                        <p className="text-[12px] max-md:text-[8px] opacity-50">
                          {format(chat.lastOnline)}
                        </p>
                      )}
                    </div>
                  </div>

              ):(
               
                <div class=" rounded-md p-2 max-w-sm w-full ">
                <div class="animate-pulse flex space-x-4 items-center">
                  <div class="rounded-full bg-slate-100 h-11 w-11"></div>
                  <div className="flex-1 space-y-6 items-center">
                          <div className="space-y-3">
                            <div className="grid grid-cols-6 gap-4">
                              <div className="h-4 bg-slate-100 rounded-3xl col-span-3"></div>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                              <div className="h-2 bg-slate-100 rounded-3xl col-span-2"></div>
                            </div>
                          </div>
                        </div>
                </div>
              </div>

              )
            }


            <div className="flex items-center justify-end  text-lgrn gap-4 max-md:gap-3  right-0 max-md:px-3  absolute px-4">
              <i className="fa-solid fa-video-camera text-2xl max-md:text-[15px]  flex items-center">
                {OnlineUsers(chat) ? (
                  <span className="h-2 w-2   m-0.5 max-md:h-1.5 max-md:w-1.5  rounded-full bg-green-500"></span>
                ) : (
                  <span className="h-2 w-2   m-0.5  max-md:h-1.5 max-md:w-1.5 rounded-full bg-slate-400"></span>
                )}
              </i>
              <i className="fa-solid text-lg fa-phone max-md:text-[13px] mr-1 "></i>
              <i className="fa-solid text-lg fa-ellipsis-v max-md:text-sm "></i>
            </div>
          </div>

          <div
            ref={scroll}
            className="no-scrollbar bgChat relative h-full overflow-y-scroll bg-white  "
          >
            <div className="text-grn bg-slate-100 text-[8px] w-[60%] max-md:text-[7px]  max-md:w-[80%] text-center  mx-auto py-1 px-4 my-3 rounded-full">
              <p>
                {" "}
                <i className="fa-solid fa-lock"></i> Messages and calls are
                encrypted.No one outside of this chat ,not even Matcha,can read
                or listen to them.
              </p>
            </div>
            {messges.map((ele) => {
              const times = ele.created_at;
              const dateObj = new Date(times);
              const hours = dateObj.getHours();
              const minutes = dateObj.getMinutes();
              const period = hours >= 12 ? "PM" : "AM";
              const formattedHours = hours;
              const messageTime = `${formattedHours}:${minutes} ${period}`;
              const shouldDisplayTime = messageTime !== prevMessageTime;
              prevMessageTime = messageTime;

              return (
                <div key={ele.messageId} className="text-center ">
                  <div
                    className={`flex  ${
                      ele?.sender_id === currentUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {/* { messageTime &&  ele?.sender_id !== profileInfo.id ?(
                           <img
                           src={`${Emage_Profile}${ChatUser?.picture_url}`}
                           onClick={handleClick}
                           className="w-[25px] h-[25px] max-md:w-[32px] max-md:h-[32px]   rounded-full border-[2px] border-white cursor-pointer "
                           alt=""
                         />
                        ):(
                            null
                        )
            } */}
                    <div className="mx-4 mb-0.5 flex  ">
                      {ele?.text ? (
                        <p
                          className={`max-w-xs py-1.5 px-6 max-sm:py-[4px] flex items-center justify-center  max-md:px-4 max-md:text-[14px]   text-md  ${
                            ele?.sender_id === currentUser
                              ? " bg-gradient-to-tr from-grn to-lgrn text-white rounded-r-md rounded-br-[100px] rounded-tr-[10px]  rounded-s-[100px]"
                              : "bg-gray-100 text-gray-700 rounded-3xl "
                          }`}
                        >
                          {ele?.text}
                        </p>
                      ) : null}
                      {ele?.image ? (
                        <img
                          className={`max-w-xs py-0.5 rounded-lg max-md:max-w-[50%] ml-auto  ${
                            ele?.sender_id === currentUser
                              ? "bg-lgrn"
                              : "bg-slate-100"
                          }`}
                          src={`${Emage_Message}${ele?.image}`}
                          alt=""
                          srcSet=""
                        />
                      ) : null}
                    </div>
                  </div>
                  {shouldDisplayTime && (
                    <p className="text-[9px] max-md:text-[8px] max-md:mx-1.5 bg-slate-200 py-1 px-3 rounded-full inline-block  opacity-40 mx-3 mb-5   font-bold max-md:mt-0.5  mt-1">
                      {messageTime}
                    </p>
                  )}
                </div>
              );
            })}

            {typing?.status === UserTyping ? (
              <div class="container py-4  bottom-0">
                <img
                  src={`${Emage_Profile}${ChatUser?.picture_url}`}
                  onClick={handleClick}
                  className="w-[35px] h-[35px] max-md:w-[30px] max-md:h-[30px] ml-2  shadow-md shadow-slate-200 drop-shadow-md rounded-full border-[2px] border-white cursor-pointer "
                  alt=""
                />
                <div className="point point1 w-2 m-[2px] ml-2   h-2 bg-lgrn  shadow-md shadow-slate-300 drop-shadow-sm "></div>
                <div className="point point2 w-2 m-[2px]  h-2 bg-lgrn  shadow-md  shadow-slate-300 drop-shadow-sm"></div>
                <div className="point point3 w-2 m-[2px]  h-2 bg-lgrn  shadow-md shadow-slate-300 drop-shadow-sm "></div>
              </div>
            ) : null}
          </div>
          {IsLiked === true ? (
            <div className="inputHeader  w-full text-center  mx-auto flex items-center  shadow-sm shadow-slate-200 drop-shadow-sm   justify-around p-3 max-md:p-1  bg-white rounded-md">
              <div className=" w-10 h-10 max-md:w-8 max-md:h-7  rounded-full  flex items-center justify-center bg-slate-100">
                <label htmlFor="dropzone-file-message">
                  <div class="">
                    <img
                      src={attach}
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      className="w-5 max-md:w-3.5 cursor-pointer "
                      alt=""
                    />
                  </div>
                  <input
                    onChange={handleFileChangeSendEmage}
                    type="file"
                    id="dropzone-file-message"
                    className="boder    text-tex  sm:text-sm rounded-xl focus:ring-1 outline-none hidden  w-full   p-2  dark:placeholder-gray-400 font-bold dark:focus:ring-grn dark:focus:border-grn"
                  />
                </label>
              </div>
              <div className=" w-10 h-10 max-md:w-8 max-md:h-7 ml-2  rounded-full  flex items-center justify-center bg-slate-100 cursor-pointer">
                <i
                  onClick={handleRecording}
                  className="fa-solid fa-microphone text-md text-lgrn"
                ></i>
              </div>
              <form className="w-full" accept-charset="UTF-8">
                <InputEmoji
                  height={25}
                  value={sendMessage}
                  onChange={handleText}
                  borderRadius={"20px"}
                  fontSize={12}
                  onKeyDown={(e) => handleKeyPress(e)}
                  cleanOnEnter
                  onBlur={stopTyping}
                />
              </form>
              <button
                onClick={() => handelSandMessage()}
                className=" w-[50px] h-[30px] max-md:w-[40px] max-md:h-[25px]   bg-lgrn rounded-3xl flex items-center justify-center"
              >
                <i className="fa-solid fa-paper-plane text-white max-md:text-xs"></i>
              </button>
            </div>
          ) : (
            ChatUser?(

            <div className=" text-[11px] text-slate-400   bg-white h-20 text-center flex flex-col  items-center justify-center px-10 max-md:px-2 max-md:text-[8px] ">
              <p className="font-bold text-slate-500">
                You Unliked <span className="text-lgrn"> {ChatUser?.name}</span>{" "}
                Or Unliked you
              </p>
              You unliked this profile so you can't message or call them in this
              that,and you won't recive their messages or calls.
            </div>
            ):(
              <div class=" rounded-md p-2  w-full text-center ">
              <div class="animate-pulse flex space-x-4 justify-center w-full">
                <div className="flex-1 space-y-3 items-center w-full ">
                            <div className="h-4 bg-slate-100 rounded-3xl col-span-3 w-[30%] mx-auto"></div>
                            <div className="h-2 bg-slate-100 rounded-3xl col-span-2 w-full mx-auto"></div>
                      </div>
              </div>
            </div>
            )
          )}
        </>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <img className="w-[80%] opacity-[0.6]" src={choseChat} alt="" />
          <div className="opacity-50">Chose one to talk with!</div>
        </div>
      )}
    </>
  );
};

export default Chate;
