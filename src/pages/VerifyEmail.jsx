import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp,signUp } from '../servicess/operations/authApi';

export const VerifyEmail = () => {
  const [otp,setOtp] = useState("");
  const dispatch = useDispatch();
  const {signupData} = useSelector((state)=>state.auth)
  const navigate = useNavigate()

  const {
    firstName ,
     lastName,
     email,
     
     password,
     confirmPassword,
     accountType,
     contactNumber,
} = signupData

  const handleOnSubmit =(e)=>{
    e.preventDefault();
    
    dispatch(signUp(
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      contactNumber,
      navigate
    ));
  }

  return (
    <div className='flex justify-center items-center'>
        <div className='w-11/12 max-w-[444px] mt-[100px] flex flex-col gap-4'>
            <h1 className='text-[30px] text-richblack-5 font-semibold'>Verify Email</h1>
            <p className='text-[14px] font-inter font-semibold text-richblack-5'>
            A verification code has been sent to you. Enter the code below</p>

           <form onSubmit={handleOnSubmit}>
           <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className='px-[10px]'>-</span>}
            renderInput={(props) => <input {...props}    style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
            className='p-[12px] bg-richblack-800  border-none rounded-md text-[20px] text-richblack-25 text-center w-full'
          />}
            />

            <button className='mt-8 w-full p-[12px] text-[16px] font-inter font-medium bg-yellow-50 rounded-md'
            type='submit'
            >
              Verify Email
            </button>
           </form>
            <div className='flex flex-row justify-between items-center'>
              <Link to={'/login'} className='flex flex-row items-center justify-center gap-2 text-richblack-25' > <FaArrowLeftLong/>Back to Login</Link>
              <button className='flex flex-row items-center justify-center gap-2 text-blue-300' 
              onClick={()=>{dispatch(sendOtp(signupData.email,navigate))}}
              > <GiAnticlockwiseRotation/>Resend it</button>
            </div>
        </div>
    </div>
  )
}
