import { Link } from 'react-router-dom'
import icon from '../../assets/images/icon-any-file.svg'
import im from '../../assets/images/lsd.png'

const Provider = () => {
  return (
    <div className=' w-full   mx-auto mt-[100px]'>
      <div className="flex max-md:flex-col max-md:full  max-md:px-3  ">
            <div className="w-[50%] pl-10 max-md:pl-0  font-medium  max-md:w-full text-center  ">
                  <h1 className='text-black text-[50px] w-[99%] max-md:text-[20px]  max-md:text-center'>
                        Create Communities &  Manage Communities  Easily <span className='text-[50px]  max-md:text-[20px]'> &#129395;</span>
                  </h1>
                  <p className=' font-light w-[70%] my-6 text-black  max-md:text-[9px]  max-md:w-full text-center'>
                        Matcha offers instant messaging, allowing you to communicate with others in real-time. Stay connected and have meaningful conversations without any delays.
                  </p>

                  <div className="rounded-full mt-10  px-3 text-black  w-[50%] py-2.5 my-5 shadow-md shadow-gray-300 drop-shadow-lg text-xs font-semibold flex items-center justify-between  max-md:w-full  max-md:text-[10px]  ">
                        Seamless Communication <i className='fa-solid fa-arrow-right '></i>
                  </div>
                  <div className="rounded-full  px-3 text-black  w-[50%] py-1.5 my-5 opacity-30   text-xs font-semibold flex items-center justify-between  max-md:w-full  max-md:text-[10px]  ">
                        Easy File Sharing To Your Friend  <i className='fa-solid fa-arrow-right'></i>
                  </div>

                  <div className="transition  border-[1.5px] border-black  hover:bg-lgrn  text-black text-sm h-9 mt-10  w-[120px] flex items-center justify-center   rounded-full  hover:border-white  hover:text-white max-md:h-7  mb-5   max-md:text-[10px] ">
                  <Link className=''  to='/auth/login'>Get Started</Link>
                  </div>

            </div>
            <div className="w-[50%]  max-md:w-full">
                  <img src={im} alt="" />
            </div>


      </div>
    </div>
  )
}

export default Provider