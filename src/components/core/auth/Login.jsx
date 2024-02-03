
import React from 'react'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import {login} from '../../../servicess/operations/authApi'
import { useDispatch } from 'react-redux';
export const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass,setShowPass] = useState(false);
  
  const [formData,setFormData] =useState({
    email:'',
    password:''
  })
  const {email ,password} =formData

  function changeHandler(e){
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value,
    }))
   }

   function handleOnSubmit (e){
    e.preventDefault();
    dispatch(login(email,password,navigate))
   }

  return (
    <form className='flex flex-col gap-7 w-full mt-[36px]'
    onSubmit={handleOnSubmit}
    >
        
        <label>
          <p  className='text-[14px] font-inter font-normal text-richblack-5'
          >Email Address<sup className='text-[red]'>*</sup></p>
          <input
            placeholder='Enter Email Address'
            type='text'
            required
            name='email'
            value={email}
            onChange={changeHandler}
             style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
            className='p-[12px] bg-richblack-800  border-none rounded-md text-richblack-5 w-full'
          />
        </label>
        <label className='relative'>
          <p className='text-[14px] font-inter font-normal text-richblack-5'
          >Password<sup className='text-[red]'>*</sup></p>
          <input
            placeholder='Enter Password'
            type={showPass === false ? ("password") :("text")}
            required
            name='password'
            value={password}
            onChange={changeHandler}
              style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
            className='p-[12px] bg-richblack-800  border-none rounded-md text-richblack-5 w-full'
          />
          <div className='absolute top-9 right-4'
          onClick={()=>{setShowPass(!showPass)}}>
            {
               showPass === false ?( <FaEye color='white'/>) : (<FaEyeSlash color='white' />)
            }
          </div>
          <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
        </label>
        <button className='mt-8 w-full p-[12px] text-[16px] font-inter font-medium bg-yellow-50
        rounded-md'> Sign in</button>
    </form>
  )
}
