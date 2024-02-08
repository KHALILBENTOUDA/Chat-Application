import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../Redux/Actions/ActionAuth";
import { useDispatch, useSelector } from "react-redux";
import logo from '../../assets/images/1-removebg-preview.png' 



function Register() {
  
  const errorMessage = useSelector((state) => state.authReducer.message);
  const status = useSelector((state) => state.authReducer.status);

  const [data, setdata] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
})

const [error, seterror] = useState("")
  const inputs=[
  
    {lable:'FirstName' ,palce:'name',type:'text',name:'name' ,value:data.UserName},
    {lable:'LirstName' ,palce:'lastname',type:'text',name:'lastname' ,value:data.lastname},
    {lable:'Email' ,palce:'example@gmail.com',type:'email',name:'email' ,value:data.email},
    {lable:'Password' ,palce:'••••••••',type:'password',name:'password' ,value:data.password},
    {lable:'Confirm password',palce:'••••••••',type:'password',name:'confirmPassword' ,value:data.confirmPassword},
  ];

  const handleChange = (e)=>{
    const {name,value} = e.target
    setdata({...data,[name]:value})
  }
  
const navigate=useNavigate()
const dispatch=useDispatch()

const handleSubmit = async(e)=>{
  e.preventDefault()
  dispatch(register(data,navigate))
 
}


  

  return (
    <div>
      <section className="bg-white my-10  text-tex flex   flex-col items-center h-[120vh] max-md:h-[90vh]  justify-center   ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full w-full ">
         
          <div className="w-full bg-white rounded-3xl   shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 h-full  sm:p-8">
            <div className="w-full flex justify-center pr-5 max-md:pr-0 ">

              <img src={logo} className='w-[70px] max-md:w-[60px] pb-5  '  alt="" />
              </div>
              <h1 className="text-xl font-bold  tracking-tight text-gray-900 md:text-2xl text-center max-md:text-md ">
              Create your account
              </h1>

              {
                errorMessage === 'success'?(
                <h1 className={`  text-green-400 bg-green-100 w-full mt-5 pl-6 text-[11px] ${errorMessage?'pl-7 py-2':'null'}  max-md:text-[10px]   rounded-3xl `}>{errorMessage}</h1>
                ):(
                  <h1 className={`text-red-400 bg-red-100 w-full mt-5 pl-6 text-[11px] ${errorMessage ? 'pl-7 py-2' : 'null'} max-md:text-[10px] rounded-3xl`}>
                  {Array.isArray(errorMessage) ? errorMessage.map(erro => (<span className="text-start">{erro.msg}<br/></span>)) : errorMessage}
                 </h1>
                
                )
              }
              <form className=" pt-5 h-full " action="#" onSubmit={handleSubmit} method="post">
               {
                
                inputs.map((inp)=>{
                  
                  return (
                    <>
                    <div>
                      
                      <label htmlFor={inp.lable} className="block mb-2 max-md:mb-1 ml-1  text-sm font-bold  text-gray-500 max-md:text-[11px] ">{inp.lable}</label>
                      <input onChange={handleChange} type={inp.type} name={inp.name} id="email" value={inp.value} className="flex items-center  border mb-3  shadow-sm drop-shadow-sm max-md:placeholder:text-[10px] max-md:p-2   max-md:text-xs max-sm:text-[12px]  placeholder:text-xs  shadow-slate-100  text-gray-700 sm:text-sm rounded-xl  outline-none  w-full p-2.5 dark:placeholder-gray-300  dark:focus:ring-lgrn dark:focus:border-lgrn " placeholder={inp.palce}  />
                    </div>
                    
                    </>
                  )
                })
               }
                
                <div className="flex items-center">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 borde max-md:w-3 max-md:h-3  " required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-tex text-[10px]  max-sm:text-[9px] ">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-lgrn" href="#">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" className=" mt-4 bg-lgrn text-white rounded-full w-full h-9 mb-4  max-md:h-8 max-md:text-xs shadow-md drop-shadow-md  hover:bg-grn transition duration-300">Create New Acount</button>
                <p className="text-sm  max-sm:text-[11px]   font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <Link to="/auth/login" className="font-medium text-primary-600 hover:underline text-lgrn ">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
