import axios from 'axios';
import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../../Redux/Actions/ActionAuth';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/1-removebg-preview.png'





const SignIn = () => {
  

  const [error, seterror] = useState("")
  const [isLogined,setisLogined] = useState()
  const loading = useSelector((state) => state.authReducer.loading);
  const errorMessage = useSelector((state) => state.authReducer.message);
  const status = useSelector((state) => state.authReducer.status);
  const userData = useSelector((state) => state.authReducer.authData);  
  const [data, setdata] = useState({
    email:"",
    password:"",
  })

  const inputs=[
    {lable:'Email' ,palce:'example@gmail.com',type:'email',name:'email' ,value:data.email},
    {lable:'Password' ,palce:'••••••••',type:'password',name:'password' ,value:data.password},
    ];

  const handleChange = ({currentTarget:input})=>{
   setdata({...data,[input.name]:input.value})
  } 

   


const navigate=useNavigate()
const dispatch = useDispatch();

  const handleSubmit = async(e)=>{
  e.preventDefault()
   dispatch(login(data,navigate))
}



  return (
    <div>
      <section className="bg-white  text-tex max-sm:py-20  ">
      <div className="absolute top-[-4%] max-md:top-[-8%] right-[0px]   w-[22rem]  max-md:w-[8rem] h-[14rem] max-sm:[7rem] rounded-full bg-[#a6ddf0d8] filter blur-[72px] max-sm:blur-[50px]  "></div>
      <div className="absolute top-[300px] max-md:top-[130px]  left-[-8rem] max-sm:left-[-10rem]  w-[21rem] max-md:w-[12rem]  max-sm:[7rem]  h-[14rem] rounded-full bg-notifi2 filter blur-[72px]"></div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <div className="w-full flex justify-center pr-5 max-md:pr-0">

              <img src={logo} className='w-[70px] max-md:w-[60px]  '  alt="" />
              </div>
              <h1 className="text-xl font-bold  tracking-tight text-gray-900 md:text-2xl text-center max-md:text-md ">
                Sign in to your account
              </h1>
              {
                isLogined == true ?  (
                  <div className="bg-green-300 ">login seccessfely</div>
                ):""
              }
              <form  className="space-y-4 md:space-y-6 pt-8 max-md:pt-2" action="" onSubmit={handleSubmit}  >
                {
                   status === 'success'?(
                    <h1 className={`  text-green-400 bg-green-100 w-full mt-5 pl-6 text-[11px] ${errorMessage?'pl-7 py-2':'null'}  max-md:text-[10px]   rounded-3xl `}>{errorMessage}</h1>
                    ):(
                      <h1 className={`text-red-400 bg-red-100 w-full mt-5 pl-6 text-[11px] ${errorMessage ? 'pl-7 py-2' : 'null'} max-md:text-[10px] rounded-3xl`}>
                      {Array.isArray(errorMessage) ? errorMessage.map(erro => (<span className="text-start">{erro.msg}<br/></span>)) : errorMessage}
                     </h1>
                    
                    )
                }
              {
                  inputs.map((inp)=>{
                    return (
                      <>
                      <div>
                        <label className="block mb-2 max-md:mb-1 ml-1  text-sm font-bold  text-gray-500 max-md:text-[12px]" >{inp.lable}</label>
                        <input onChange={handleChange}  type={inp.type} name={inp.name} id={inp.name} value={inp.value}  className="flex items-center  border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[10px] max-md:p-2   max-md:text-xs max-sm:text-[12px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none  w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn " placeholder={inp.palce} required="" />
                      </div>
                      
                      </>
                    )
                  })
                 }
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                  </div>
                  <Link href="/change_password" className="text-sm font-medium text-lgrn hover:underline dark:text-primary-500 max-md:text-[10px]">Forgot password?</Link>
                </div>
                <button  type="submit" className="mt-4 bg-lgrn text-white rounded-full w-full h-9  max-md:h-8 max-md:text-sm shadow-md drop-shadow-md  hover:bg-grn transition duration-300">Sign In</button>
                <p className="text-sm  max-sm:text-[10px]  font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <Link to="/auth/register" className="font-medium text-lgrn hover:underline dark:text-primary-500 pl-1">Create an account</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignIn;