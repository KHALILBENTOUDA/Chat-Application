import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <footer className='w-full mx-auto  text-black bg-cardColor pt-14 max-md:w-full  '>
          <div className=" w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  max-md:text-center max-md:w-[90%]  ">
           <div className="">
           <h1 className=' font-semibold text-black text-[30px] max-md:text-[25px]'>
            Subscribe to news <span className='text-lgrn'>&</span> resources
            </h1>
            <ul className='flex items-center gap-3 opacity-60 mt-3 w-full max-md:justify-center  '>
             <li><i className='fa-brands fa-facebook'></i></li>
             <li><i className='fa-brands fa-pinterest'></i></li>
             <li><i className='fa-brands fa-twitter'></i></li>
             <li><i className='fa-brands fa-instagram'></i></li>
            
            </ul>
           </div>
           <div className="w-full  flex justify-end pt-1  max-md:mt-4 items-center">
            <div className=" border border-black  w-[70%] max-md:w-full  h-11  max-md:h-9  text-gray-700   sm:text-sm  max-md:text-xs rounded-3xl focus:ring-1   font-bold dark:focus:ring-lgrn dark:focus:border-lgrn flex items-center justify-between">

            <input className=' placeholder:text-black placeholder:font-light w-full h-full rounded-3xl px-4  max-md:px-2  max-md:placeholder:text-[11px]   outline-none block '  type="text"   placeholder='Your Email Here'/>

            <i className='fa-solid fa-arrow-alt-circle-right text-3xl mr-2 text-lgrn  max-md:text-2xl'></i>

            </div>
           </div>
          </div>
          <hr className='mt-5 mb-10' />
      <div className=" w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5   opacity-70 text-[12px] text-center">
       
         <div className="flex flex-col text-start max-md:text-center mb-10  ">
           <h3 className='text-[15px] font-semibold pb-[15px] text-black'>Company</h3>
           <Link className='hover:text-lgrn hover:opacity-100 text-[11px] opacity-60 mb-2' href="">Home</Link>
           <Link className='hover:text-lgrn hover:opacity-100 text-[11px] opacity-60 mb-2' href="">Center_Help</Link>
           <Link className='hover:text-lgrn hover:opacity-100 text-[11px] opacity-60 mb-2' href="">About_US</Link>
         </div>
         <div className="flex flex-col text-start  max-md:text-center   ">
         <h3 className='text-[15px] font-semibold pb-[15px] text-black'>Product</h3>
           <Link className='hover:text-lgrn hover:opacity-100 text-[11px] opacity-60 mb-2' href="">Workbench</Link>
           <Link className='hover:text-lgrn hover:opacity-100 text-[11px] opacity-60 mb-2' href="">Data Engineer</Link>
           <Link className='hover:text-lgrn hover:opacity-100 text-[11px] opacity-60 mb-2' href="">Customer Success</Link>
         </div>
         <div className="flex flex-col text-start  max-md:text-center    ">
         <h3 className='text-[15px] font-semibold pb-[15px]'>Legal</h3>
           <Link className='mb-2  hover:text-lgrn hover:opacity-100 text-[11px] opacity-60' href="">Privacy Policy</Link>
           <Link className='mb-2  hover:text-lgrn hover:opacity-100 text-[11px] opacity-60' href="">Terms of Service</Link>
           <Link className='mb-2  hover:text-lgrn hover:opacity-100 text-[11px] opacity-60' href="">Cookie Policy</Link>
         </div>
         <div className=" text-start  max-md:text-center    ">
         <h3 className='text-[15px] font-semibold pb-[15px]'>Contact_Us</h3>
           <span className='flex pb-[15px] items-center'> <i className='fa-solid fa-phone  max-md:ml-[0px] text-md mr-3  text-lgrn '   alt="" /> +212 00000000</span>
           <span className='flex pb-[15px] items-center'> <i className='fa-solid fa-envelope  mr-3 max-md:ml-[0px] text-md text-lgrn '  alt="" /> Matcha@support.com</span>
         </div>
         <div className=" text-start     ">
           <p className='text-[11px] flex items-start '> <i className='text-lgrn fa-solid fa-location-dot mr-[15px]  text-xl ' alt="" srcset="" />  Experience seamless and secure remote communication with Match, the ultimate app for all your chatting . Stay connected with friends, family, and colleagues from anywhere and anytime in the world</p>
         </div>
         
      </div>
      <hr className='mt-3' />
      <div className="pt-[10px] pb-[10px] bg-slate-100 text-center text-xs font-bold ">
           <p>Copyrite © 2024</p>
         </div>
     </footer>
  )
}

export default Footer