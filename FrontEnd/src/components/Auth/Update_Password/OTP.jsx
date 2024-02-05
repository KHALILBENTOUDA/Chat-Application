import React, { useState } from 'react';
import axios from 'axios';

const OTPVerificationForm = ({ handleSubmit,handleChange,error,value }) => {
  



  return (

      <section className='h-[100vh] flex items-center justify-center'>
    <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
        <h1 className="text-xl font-bold  tracking-tight text-gray-900 md:text-2xl text-center max-md:text-sm ">
        Verify OTP
        </h1>
        <h1 className=' absolute text-red-400 bg-red-100 w-[85%]  text-center rounded-full '>{error} </h1>
        <form className="space-y-4 md:space-y-6 pt-10" action="" onSubmit={handleSubmit}>
            <div >
              <input
                onChange={handleChange}
                type='text'
                name='otp'
                id='otp'
                value={value}
                className="flex items-center text-center font-bold  border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5 placeholder:text-center   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none  w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn "
                placeholder='000-000'
                required=""
              />
            </div>
          <button type="submit"  className="mt-4 bg-lgrn text-white rounded-full w-full h-9  max-md:h-7 max-md:text-xs shadow-md drop-shadow-md  hover:bg-grn transition duration-300l"
          >
           Verify OTP
          </button>
        </form>
      </div>
    </div>
    </section>

  );
};

export default OTPVerificationForm;
