import React from 'react'
import img1 from '../../assets/images/Image 2-2-2024 at 21.33.jpg'
import img2 from '../../assets/images/Image 2-2-2024 at 21.52.jpg'

const IntroEmage = () => {
  return (
    <section className='bg-notifi2 pt-20 max-md:pt-10 '>
      <div className=" w-[80%] mx-auto relative max-md:w-[90%] bg-transparent ">
       <img src={img2} className='rounded-t-2xl w-full '   alt="" />
      <div className=" absolute z-50 w-full h-full top-0 bg-gradient-to-b from-transparent from-60% to-notifi2">
      </div>
      </div>
    </section>
  )
}

export default IntroEmage