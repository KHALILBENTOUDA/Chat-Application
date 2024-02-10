import React from 'react'

const EmailSend = () => {
  return (
      <section className="w-full flex justify-center items-center h-[80vh]">
      <div className="text-center">
        <div className="relative flex items-end justify-center">
        <i  className="fa-solid fa-envelope text-lgrn text-[80px] max-md:text-[60px]"></i>
        </div>
        <p className="text-[30px] mt-5  max-md:text-[15px]">Check Your Email Address</p>
        <a href="/" className='text-sm text-lgrn max-sm:text-xs'><i className='fa-solid fa-arrow-circle-o-right'></i> go back</a>
      </div>

    </section>
  )
}

export default EmailSend

