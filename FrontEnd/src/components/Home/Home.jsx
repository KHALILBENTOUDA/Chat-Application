import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../assets/images/up-arrow.png'
import stars from '../../assets/images/Untitled_design__1_-removebg-preview.png'
import typing from '../../assets/images/output-onlinegiftools.gif'
import logo from '../../assets/images/1-removebg-preview.png'

const Homep = () => {
  return (
   <section className=' container  mx-auto  text-center   h-[80vh] max-sm:h-[65vh] relative  '>

      <div className="w-[60%] mx-auto font-PlusJakartaSans-VariableFont_wght  max-sm:w-full max-md:w-[80%] max-lg:w-[80%] relative">
                        <div className=' w-[280px] max-md:w-[160px]  mx-auto  rounded-full text-sm bg-notifi2   text-white max-md:text-[10px] max-sm:text-[8px] flex items-center justify-center'>Match the power of comunication <span className='text-ms pl-2 '>🤩</span> </div>
                        <h1 className='py-8 max-md:py-4 font-bold text-black text-[50px] xs:bg-blue-400 max-sm:text-[25px] max-sm:w-[370px] mx-auto sm:text-[32px]  md:text-[38px] lg:text-[40px]  max-lg:text-[40px] xl:text-[50px] '> Matcha Your <span className='bg-gradient-to-r from-ble  via-slate-100  to-lgrn bg-clip-text text-transparent'> Gateway</span> to Seamless Online Conversation and Meetings 🌟</h1>
                        <p className='w-[70%] mx-auto text-sm  max-md:text-[10px] max-sm:w-[280px] max-sm:text-[8px]'>  <img src={typing} className='absolute w-[12%] bottom max-sm:-bottom-10 max-sm:left-3   left-0  '  alt="" /> Experience seamless and secure remote communication with Match, the ultimate app for all your chatting . Stay connected with friends, family, and colleagues from anywhere and anytime in the world</p>
                        <div className="flex items-center gap-8 justify-center my-8">
                            <Link to='/auth/login' className='transition py-3 px-8 font-bold bg-notifi text-lgrn text-sm  rounded-full hover:bg-lgrn hover:text-kfif max-md:py-1.5 max-md:text-[12px]'>Learn more</Link>
                            <Link to='/auth/login' className='transition py-3 px-8 font-bold bg-lgrn text-cardColor text-sm rounded-full hover:bg-notifi hover:text-lgrn max-md:py-1.5 max-md:text-[12px]'>Get started</Link>
                        </div>
              </div>

   </section>
   
  )
}
export default Homep