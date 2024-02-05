import React from "react";

const PageNotFound = () => {
  return (
    <section className="w-full flex justify-center items-center h-[50vh]">
      <div className="text-center">
        <div className="relative flex items-end justify-center">
        <i  className="fa-solid fa-cloud text-lgrn text-[80px] max-md:text-[60px]"></i>
        <span className="absolute text-white text-[30px] font-bold pb-2 max-md:text-[20px]">404</span>
        </div>
        <p className="text-[40px] mt-5 font-bold opacity-10 max-md:text-[20px]">Page Not Found!</p>
      </div>
    </section>
  );
};

export default PageNotFound;
