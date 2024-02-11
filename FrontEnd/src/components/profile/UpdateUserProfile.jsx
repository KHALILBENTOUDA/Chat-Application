import React, { useEffect, useRef, useState } from "react";
import { UpdateUser } from "../../Redux/Api/AuthApi";
import { useNavigate } from "react-router-dom";

const UpdateUserProfile = () => {
  const profileInfo = JSON.parse(localStorage.getItem("profile"));
  const [locationAllow, setlocationAllow] = useState(false)
  const [formData, setformData] = useState({
    name:'',
    lastname:'',
    age:'',
    gender:'',
    biography:'',
    country:'',
    city:'',
    neighborhood:''
  })


const handleFillBlanks=({currentTarget:input})=>{
  setformData({...formData,[input.name]:input.value})
}


const checkLocation=()=>{
  setlocationAllow(!locationAllow)
}

const navigate=useNavigate()

const handleSubmite=async(e)=>{
  e.preventDefault()
  try{
    const res = await UpdateUser(profileInfo.id,formData)
    setformData({
      name: '',
      lastname: '',
      age: '',
      gender: '',
      biography: '',
      country: '',
      city: '',
      neighborhood: ''
    });
    navigate('/chat')
  }catch(e){
    console.log(e)
  }
}


 
  return (
    <div className="h-full">
      <h1 className="text-lg max-md:text-sm text-black max-md:h-[50px]   font-bold flex items-center  rounded-md h-[60px]  shadow-md shadow-slate-100 drop-shadow-sm relative  px-2  w-full z-10 "><i className="fa-solid fa-pen-alt px-2"></i> Edit your Information</h1>
      <form onSubmit={handleSubmite}  className="no-scrollbar max-w-md mx-auto px-4 py-6 h-full overflow-y-scroll mb-20">
        <div className="flex w-full gap-4 ">
       <div className=" w-full text-center">
       <label
          htmlFor="username"
          className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-gray-500 max-md:text-[11px]"
        >
          Username
        </label>
        <input
          onChange={handleFillBlanks}
          value={formData.name}
          type="text"
          name="name"
          className="border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none block w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn "
          placeholder="Enter new name"
        />
       </div>
      <div className=" w-full text-center">
      <label
          htmlFor="lastname"
          className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-gray-500 max-md:text-[11px]"
        >
          Lastname
        </label>
        <input
         onChange={handleFillBlanks}
         value={formData.lastname}
          type="text"
          name="lastname"
          className="border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none block w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn "
          placeholder="Enter new lastname"
        />

      </div>
      
        </div>
       
        <label
          htmlFor=""
          className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-gray-500 max-md:text-[11px]"
        >
        BirthDate:
        </label>
        <input
         onChange={handleFillBlanks}
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
          onChange={handleFillBlanks}
          value={formData.gender}
          className="border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none block w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn "
        >
          <option value="">Gender</option>
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
         onChange={handleFillBlanks}
         value={formData.biography}
          name="biography"
          className="border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none block w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn "
          placeholder="Write a short biography"
        ></textarea>

    <div className="flex items-center mb-3">
        <i
          onClick={checkLocation}
            className={` ${locationAllow?'fa-solid':'fa-regular'} fa-check-circle  ${locationAllow?'text-lgrn':''} py-4     max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none block  dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn `}
        ></i>
         <label
          htmlFor="pictures"
          className=" ml-1  text-sm   text-gray-500 max-md:text-[11px]"
        >
        access to edit your location 
        </label>
        </div>
        {
          locationAllow === true?(
            <div className="">
            <label
              htmlFor="pictures"
              className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-gray-500 max-md:text-[11px]"
            >
            Country:
            </label>
            <input
             onChange={handleFillBlanks}
             value={formData.country}
              type="text"
              name="country"
              className="border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none block w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn "
              placeholder="Enter your current country "
            />
             <label
              htmlFor="pictures"
              className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-gray-500 max-md:text-[11px]"
    
            >
            City:
            </label>
            <input
             onChange={handleFillBlanks}
             value={formData.city}
              type="text"
              name="city"
              className="border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none block w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn "
              placeholder="Enter your current city "
            />
             <label
              htmlFor="pictures"
              className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-gray-500 max-md:text-[11px]"
            >
            neighborhood:
            </label>
            <input
             onChange={handleFillBlanks}
             value={formData.neighborhood}
              type="text"
              name="neighborhood"
              className="border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none block w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn "
              placeholder="Enter your current  neighborhood "
            />
            </div>

          ):(null)}
        <div className=" mb-14">
        <button
          type="submit"

          className="mt-4 bg-lgrn text-white rounded-full w-full h-8  max-md:h-7 max-md:text-xs shadow-md drop-shadow-md  hover:bg-grn transition duration-300"
        >
          update
        </button>
        </div>
       
      </form>
    </div>
  );
};

export default UpdateUserProfile;
