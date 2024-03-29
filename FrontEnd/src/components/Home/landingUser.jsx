import React from 'react'
import Homep from './Home'
import IntroAPP from './IntroAPP'
import Provider from './Provider'
import IntroEmage from './IntroEmage'
import AQI from './AQI'


const LandingUser = () => {
  return (
    <div className='text-tex  no-scrollbar'>
      <div className="absolute top-[-4%] max-md:top-[-5%] right-[0px]   w-[22rem]  max-md:w-[8rem] h-[14rem] max-sm:[7rem] rounded-full bg-[#a6ddf0d8] filter blur-[72px]  "></div>
      <div className="absolute top-[300px]  left-[-8rem] max-sm:left-[-7rem]  w-[21rem] max-md:w-[12rem]  max-sm:[7rem]  h-[14rem] rounded-full bg-notifi2 filter blur-[65px]"></div>
          <Homep />
          <IntroEmage/>
          <IntroAPP />
          <Provider />
          <AQI/>
       
    </div>
  )
}

export default LandingUser