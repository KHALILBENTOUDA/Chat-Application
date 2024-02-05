import React from 'react'
import Seggentions from '../Seggentions'
import { useNavigate } from 'react-router-dom'

const Friends = ({sethandleNavigate,sethandleNavigateRigt}) => {
  const navigate = useNavigate()
  const handleNavigate=()=>{
    sethandleNavigateRigt('setting')
  }

  return (
    <div className='p-6 max-md:px-3 py-4 max-md:w-[70%] max-sm:w-full  mx-auto'>
      <h1 className='flex items-center text-black text-xl font-bold  max-md:text-sm'>
             <i onClick={handleNavigate}  className="fa-solid fa-angle-left text-[15px] md:hidden  flex items-center justify-center  cursor-pointer text-black   m-1  rounded-full "></i>
            <i className='fa-solid fa-user-friends px-2'></i>
             Friends you liked
      </h1>
      <hr className='my-4' />
      <Seggentions sethandleNavigate={sethandleNavigate}/>
    </div>
  )
}

export default Friends