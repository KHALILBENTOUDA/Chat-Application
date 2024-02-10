import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPfile } from "../../Redux/Actions/ActionAuth";
import profi from '../../assets/images/user (1).png'
import elec from '../../assets/images/start-2.jpeg';

const UserForm = () => {
  // const userData = useSelector((state) => state.authReducer.authData);
  const userData = JSON.parse(localStorage.getItem("profile"));
  const [message, setmessage] = useState("");
  const [error, seterror] = useState("");
  const [interests, setinterests] = useState([]);
  const [formData, setFormData] = useState({
    gender: "",
    age:"",
    biography: "",
    pictures: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePicturesChange = ({ currentTarget: input }) => {
    const file = input.files[0];
    if (file) {
      setFormData({ ...formData, [input.name]: file });
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.gender || !formData.age || !formData.biography || !formData.gender || !formData.pictures){
      setmessage('you forgot to fill all the information in the form')
    }
    const sendData = new FormData();
    sendData.append("gender", formData.gender);
    sendData.append("biography", formData.biography);
    sendData.append("pictures", formData.pictures);
    const userID = userData.user;
    dispatch(updateUserPfile(sendData, userID, navigate));
  };

  return (
    <div>
      {userData ? (
        <section className="h-[100vh] flex items-center relative  ">
                <div className="absolute top-[-4%] max-md:top-[-8%] right-[0px]   w-[22rem]  max-md:w-[8rem] h-[14rem] max-sm:[7rem] rounded-full bg-[#a6ddf0d8] filter blur-[72px] max-sm:blur-[50px]  "></div>
      <div className="absolute top-[300px] max-md:top-[130px]  left-[-8rem] max-sm:left-[-10rem]  w-[21rem] max-md:w-[12rem]  max-sm:[7rem]  h-[14rem] rounded-full bg-notifi2 filter blur-[72px]"></div>
          <div className=" w-[90%] mx-auto  shadow-md  drop-shadow-sm  rounded-3xl flex justify-center items-center ">

          <div className="w-[50%] max-lg:hidden">
            <img src={elec} className="w-full rounded-3xl pl-3" alt="" />
          </div>
          <form onSubmit={handleSubmit} className="max-w-md  mx-auto p-6   ">
            <label htmlFor="dropzone-file-profile-compate">
                <div class=" flex flex-col items-center">
                  <div className="w-[22%] relative">
                <img src={profi} className=" cursor-pointer"  alt="" />
                <i className="fa-solid fa-plus absolute w-6 h-6 max-md:h-4 max-md:w-4 max-md:bottom-0  rounded-full bg-white flex items-center justify-center text-lgrn right-0 bottom-1 cursor-pointer"></i>
                  </div>
                </div>
                <input
              type="file"
              id="dropzone-file-profile-compate"
              name="pictures"
              onChange={handlePicturesChange}
              className="border shadow hidden  text-gray-700 sm:text-sm rounded-3xl focus:ring-1 outline-none  w-full p-2.5 dark:placeholder-gray-400 font-bold dark:focus:ring-grn dark:focus:border-grn"
            />
              </label>

       {
        formData.pictures?(
          <label
          htmlFor=""
          className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-green-500 max-md:text-[11px] text-center w-full mt-3 "
        >
        Profile Emage Added Successfuly
        </label>
        ):(
          <label
          htmlFor=""
          className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-orange-500 max-md:text-[11px] text-center w-full mt-3 "
        >
        </label>
        )
       }

    <h1 className={`text-red-400 bg-red-100 w-full mt-5 my-5  pl-6 text-[11px] ${message ? 'pl-7 py-2' : 'null'} max-md:text-[10px] rounded-3xl`}>{message}</h1>


        <label
          htmlFor=""
          className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-gray-500 max-md:text-[11px] mt-10"
        >
        BirthDate:
        </label>
        <input
         onChange={handleChange}
         value={formData.age}
          type="date"
          name="age"
          className="border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none block w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn "
          placeholder="0000-00-00 "
        />

            <label
              htmlFor="gender"
              className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-gray-500 max-md:text-[11px]"
            >
              Gender:
            </label>
            <select
              name="gender"
              onChange={handleChange}
               className="border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none block w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn " value={formData.gender}
            >
              <option value="">--</option>
              <option value="1">Male</option>
              <option value="2">Femal</option>
            </select>

            <label
              htmlFor="biography"
              className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-gray-500 max-md:text-[11px]"
            >
              Biography:
            </label>
            <textarea
              name="biography"
              onChange={handleChange}
              value={formData.biography}
              className="border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none block w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn "
              placeholder="Write a short biography"
            ></textarea>

            <div className="w-[99%] flex justify-end">
            <button
              type="submit"
              className="mt-10   bg-lgrn text-white rounded-full py-2 px-7 text-sm font-bold  hover:bg-grn transition duration-300"
            >
              Next 
              <i className="fa-solid fa-angle-double-right ml-2"></i>
            </button>
            </div>
          </form>
          </div>
        </section>
      ) : (
        <p>page not found</p>
      )}
    </div>
  );
};

export default UserForm;
