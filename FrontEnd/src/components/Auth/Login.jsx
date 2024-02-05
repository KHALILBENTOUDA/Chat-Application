import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../Redux/Actions/ActionAuth';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/1-removebg-preview.png'





const SignIn = () => {
  

  const handleAuth = async () => {
    try {
      const resposs = await axios.get("http://localhost:5002", {
        withCredentials: true,
      });
      if (resposs.data.status === "success"){
       const cuurent=resposs.data.user
       localStorage.setItem("currentUser",JSON.stringify(cuurent))
      } 
    } catch (err) {
        seterror(err.message);
    }
  };
  

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


console.log(status)



  return (
    <div>
      <section className="bg-white  text-tex ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <div className="w-full flex justify-center pr-5 max-md:pr-0">

              <img src={logo} className='w-[70px] max-md:w-[40px]  '  alt="" />
              </div>
              <h1 className="text-xl font-bold  tracking-tight text-gray-900 md:text-2xl text-center max-md:text-sm ">
                Sign in to your account
              </h1>
              {
                isLogined == true ?  (
                  <div className="bg-green-300">login seccessfely</div>
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
                        <label className="block mb-2 max-md:mb-0.5 ml-1  text-sm font-bold  text-gray-500 max-md:text-[11px]" >{inp.lable}</label>
                        <input onChange={handleChange}  type={inp.type} name={inp.name} id={inp.name} value={inp.value}  className="flex items-center  border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[8px] max-md:p-1.5   max-md:text-xs max-sm:text-[10px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none  w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn " placeholder={inp.palce} required="" />
                      </div>
                      
                      </>
                    )
                  })
                 }
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                  </div>
                  <a href="/change_password" className="text-sm font-medium text-lgrn hover:underline dark:text-primary-500 max-md:text-[8px]">Forgot password?</a>
                </div>
                <button  type="submit" className="mt-4 bg-lgrn text-white rounded-full w-full h-9  max-md:h-7 max-md:text-xs shadow-md drop-shadow-md  hover:bg-grn transition duration-300">{loading?"Loading...":"Sign In"}</button>
                <p className="text-sm  max-sm:text-[9px]  font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <a href="register" className="font-medium text-lgrn hover:underline dark:text-primary-500">Sign up</a>
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