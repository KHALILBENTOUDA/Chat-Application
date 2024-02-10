import { avatar, button } from '@material-tailwind/react'
import { jwtDecode } from 'jwt-decode'
import React,{useEffect, useState, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/2-removebg-preview.png'


const Nav = () => {


    const [hidden, sethiden] = useState(false)
    const [scro, setscro] = useState('scrolle')
    const [tok, settok] = useState(false)
    const [userData, setuserData] = useState([])
    const [fistLater, setfistLater] = useState([])


    const logout=()=>{
        localStorage.removeItem("token")
        window.location.reload()
    }
    
    const nac=[
        {name:'Home',  link:'/'},
        {name:'Center_Help',  link:'/contact'},
        {name:'About_US',  link:'/about'}

    ]




    const hiddenhad=()=>{

        sethiden(!hidden)
    }


        const [isOpen, setIsOpen] = useState(false);
       
        const openDropdown = () => {
           setIsOpen(true);
        };
       
        const closeDropdown = () => {
           setIsOpen(false);
        };


        
  return (
    <section className='text-black w-full bg-white z-50 '>
      <nav  class="  container w-[90%] md:w-[60%] mx-auto bg-cardColor rounded-full px-4 mt-3 max-md:px-1  shadow-sm relative z-50  ">
        <div class=" max-w-screen-xl flex flex-wrap items-center justify-between  mx-auto p-2  md:px-0 md:p-3  w-full ">
        <a href="/" class="flex items-center">
            <img src={logo} class=" mr-3 w-[120px] max-md:w-[90px] max-sm:mr-0"/>
        </a>
        <div class="flex items-center justify-center  md:order-2  g:w-[35%] ">
         <div className="relative flex items-center">


                <button type="button"  data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class=" flex items-center justify-center rounded-full   bg-black text-white dark:text-gray-400rounded-lg text-xs  max-sm:text-[8px]    p-1 lg:p-2.5   " >  
                <Link class='px-1 max-sm:text-[10px]' to='auth/login'>
                    Join Us Today
                </Link>
                </button>

        </div>
            <button data-collapse-toggle="navbar-search" onClick={hiddenhad}  type="button" class="inline-flex items-center ml-3 p-1.5 w-8 h-8 justify-center   text-sm max-sm:text-xs max-sm:w-6 max-sm:h-6  text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-1 focus:ring-grn focus:bg-lgrn dark:text-gray-400  shadow shadow-slate-350 " aria-controls="navbar-search" aria-expanded="false">
                <svg class="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
         <div className={hidden==false?"items-center justify-between hidden  w-full md:flex md:w-auto md:order-1":"items-center   justify-between w-full md:flex md:w-auto md:order-1"} id="navbar-search">
            <ul class="max-md:absolute max-xs:w-[100px]   max-sm:w-[280px]  max-md:w-[500px] lg:w-full   shadow shadow-slate-200 flex flex-col p-4 md:p-0 mt-5 font-medium border border-gray-100 rounded-[20px] md:flex-row md:space-x-8 md:mt-0 md:border-0  max-md:bg-kfif md:shadow-none ">
               {
                nac.map((ele)=>{    
                    return (
                        <li className=' transition-all w-full '>
                            <Link to={ele.link} class="max-md:my-[3px]  text-xs  max-md:focus:outline-none max-md:focus:ring-1 max-md:focus:ring-gray-200 max-md:focus:text-white max-md:focus:bg-grn   block py-2 px-3  rounded-[30px]   md:hover:text-lgrn ">{ele.name}</Link>
                        </li>
                    )
                })
               }

            </ul>  
            </div>
        </div>
        </nav>

    </section>
  )
}

export default Nav
