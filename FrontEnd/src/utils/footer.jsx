import React from "react";
import logo from "../assets/images/logo.svg";
import phone from "../assets/images/icon-phone.svg";
import email from "../assets/images/icon-email.svg";
import location from "../assets/images/icon-location.svg";
const Footer = () => {
      const links=[
            {name:'About Us' ,path:"/about"},
            {name:'Category' ,path:"/category"},
            {name:'Products' ,path:"/books"},
            {name:'Contact' ,path:"/contact"},
      ]
  return (
    <footer className=" mt-14">
      <section className="py-[50px] w-[80%] mx-auto text-white">
        <div className="max-sm:text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-20">
          <div className="mb-4">
            <img src={logo} className="w-[100px] pb-2" alt="" />
            <p className="opacity-60 text-[13px] py-4">Find Location nearest you See Our Stores</p>
            <div className="opacity-60 text-xs py-3   flex items-center  max-sm:justify-center">
              <img src={phone} className="w-[18px] pr-1.5 "  alt="" />
              <span className="text-[14px]">+(212)6-0776-0484</span>
            </div>
            <div className="opacity-60 text-xs py-1 flex items-center  max-sm:justify-center">
              <img src={email}  className="w-[18px] pr-1.5 "   alt="" />
              <span>bookstore@support.com</span>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="font-bold text-lg opacity-80 pb-6">Contact Info</h2>
            <p className="opacity-60 text-[13px] pb-4" >972 Blace,City,Town,Road location</p>
            <p className="opacity-60 text-[13px] pt-2 ">Monday - Friday: 9:00-20:00</p>
            <p className="opacity-60 text-[13px]">Saturday:11:00-15:00</p>
          </div>
          <div className="mb-4 text-center">
            <h2 className="font-bold text-lg opacity-80 pb-6">Explore</h2>
            <div className="flex flex-col opacity-60 text-[13px]  ">
                  {
                        links.map((ele)=>{
                              return(
                                    <a className="pb-3 hover:text-lgrn" href={ele.path}>{ele.name}</a>
                              )
                        })
                  }
            
            </div>
          </div>
          <div className="mb-4 ">
            <h2 className="font-bold text-lg opacity-80 pb-6">Subscribe</h2>
            <p className="opacity-60 text-[13px] pb-4">enter your email below to be the first to know about new collections and products launches.</p>
            <form action="w-full">
                  <div className="flex items-center bg-white rounded-3xl text-tex p-2 relative my-4 ">
                        <i className="fa-regular fa-envelope  px-2 "></i>
                         <input className=" outline-none text-sm bg-transparent "  type="email" name="email" id="email" placeholder="email " />
                         <button className="font-bold text-xs bg-grn p-1.5 rounded-3xl text-white mr-1 absolute right-0"  >Subscribe</button>
                  </div>

            </form>
          </div>
        </div>
      </section>
      <div className="copyrite py-5 text-white font-bold  opacity-80    text-center border-t-[0.5px] border-slate-800">
        <p>Copyrite © 2024</p>
      </div>
    </footer>
  );
};
//grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4

export default Footer;
