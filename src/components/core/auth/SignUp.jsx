import React, { useState } from 'react'
import countrycode from '../../../data/countrycode.json'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import {setSignupData} from '../../../slices/authSlice'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'

import { sendOtp } from '../../../servicess/operations/authApi';
export const SignUp = ({accountType}) => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData,setFormData]  = useState({
    firstName:"",
    lastName:"",
    email:"",
    password :"",
    confirmPassword : "",
    contactNumber:''
  })

  const[showPass,setShowPass]=useState(false)
  const {firstName,lastName,email,password,confirmPassword,contactNumber} = formData;

  function changeHandler(e){
    setFormData((prev) =>({
      ...prev,
      [e.target.name]:e.target.value,
    }))
  }

  function handleOnSubmit(e){
    e.preventDefault();

    const signupData ={
      ...formData,
      accountType,
    }
    // console.log("sighupdata..",signupData)
    dispatch(setSignupData(signupData));

    dispatch(sendOtp(formData.email,navigate))
  }

  return (
    <form className='flex flex-col gap-6 mt-[36px]'
    onSubmit={handleOnSubmit}
    > 
      <div className='flex flex-col md:flex-row justify-between'>
      <label>
        <p className='text-[14px] font-inter font-normal text-richblack-5'>First Name 
        <sup className='text-[red]'>*</sup></p>
        <input
          required
          type='text'
          placeholder='First Name'
          name="firstName"
          value={firstName}
          onChange={changeHandler}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
            className='p-[12px] bg-richblack-800  border-none rounded-md text-richblack-5 w-full'
        />
      </label>
      <label>
        <p className='text-[14px] font-inter font-normal text-richblack-5'>Last Name 
        <sup className='text-[red]'>*</sup></p>
        <input
          required
          type='text'
          placeholder='Last Name'
          name="lastName"
          value={lastName}
          onChange={changeHandler}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
            className='p-[12px] bg-richblack-800  border-none rounded-md text-richblack-5 w-full'
        />
      </label>

      </div>
      <label>
        <p className='text-[14px] font-inter font-normal text-richblack-5'>Email
         <sup className='text-[red]'>*</sup></p>
        <input
          type='text'
          required
          name='email'
          placeholder='Enter your email'
          value={email}
          onChange={changeHandler}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
            className='p-[12px] bg-richblack-800  border-none rounded-md text-richblack-5 w-full'
        />
      </label>

      <div>
         <p className='text-[14px] font-inter font-normal text-richblack-5'>Phone Number</p>
         <div className='flex flex-row justify-between w-full'>
         <select style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
            className='p-[12px] w-[100px] bg-richblack-800  border-none rounded-md text-richblack-5 '>
          {
            countrycode.map((code,index)=>{
           return    <option key={index}  
           style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
            className='p-[12px]  bg-richblack-800  border-none rounded-md text-richblack-5 '>{code.code} {code.country}</option>
            })
          }
        </select>
        <input
          type='tel'
          required
          name='contactNumber'
          value={contactNumber}
          onChange={changeHandler}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
            className='p-[12px] bg-richblack-800  border-none rounded-md text-richblack-5 w-[70%]'
        />
         </div>
        
      </div>
      <div className='flex flex-col md:flex-row w-full justify-between'>
        <label className='relative'>
          <p className='text-[14px] font-inter font-normal text-richblack-5'>Create password 
          <sup className='text-[red]'>*</sup></p>
          <input
            type={`${showPass ? ('text'):('password')}`}   
            required
            name='password'
            value={password}
            placeholder='Create password'
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
        </label>
        <label className='relative'>
          <p className='text-[14px] font-inter font-normal text-richblack-5'>Confirm password <sup className='text-[red]'>*</sup></p>
          <input
            type={`${showPass ? ('text'):('password')}`}   
            required
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Create password'
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
        </label>
      </div>

      <button className='mt-8 w-full p-[12px] text-[16px] font-inter font-medium bg-yellow-50
        rounded-md'> Create account</button>
    </form> 
  )
}

// export default SignUp
// {`${showPass ? (<FaEye/>):(<FaEyeSlash/>)}`}