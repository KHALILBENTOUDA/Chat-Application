import React from 'react'
import Homep from './Home'
import IntroAPP from './IntroAPP'
import Provider from './Provider'
import IntroEmage from './IntroEmage'
import AQI from './AQI'


const LandingUser = () => {
  return (
    <div className='text-tex  no-scrollbar bg-white'>
          <Homep />
          <IntroEmage/>
          <IntroAPP />
          <Provider />
          <AQI/>
       
    </div>
  )
}

export default LandingUser