
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPasswordResetToken } from '../servicess/operations/authApi';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function ForgotPassword() {
    const dispatch = useDispatch()
 
    const[email,setEmail] = useState("");
    const[sentEmail,steSentEmail] = useState(false);
    const{loading} = useSelector((state)=> state.auth);
    

    const onSubmitHandler =(e)=>{
 
        e.preventDefault();
        dispatch(getPasswordResetToken(email,steSentEmail));
    }
  return (
   <div className='w-full h-full'>
     <div className='w-11/12 max-w-[500px] h-full mx-auto mt-100 items-center justify-center p-[32px] mt-[100px]'>
        {
            loading ? (
                <div className='loader mt-[100px] ml-[200px]'></div>
            ):(
                <div className='flex flex-col gap-2'>
                    <h1  className='text-[36px] font-semibold text-richblack-5'>{
                        !sentEmail ? "Reset your password":"Check Email"
                    }</h1>

                    <p className='text-[14px] font-inter font-normal text-richblack-25'>{
                        !sentEmail ?
                         "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : 
                         `We have set reset Email to ${email}`
                    }</p>

                    <form onSubmit={onSubmitHandler}>
                    {
                        !sentEmail ? (
                            <label>
                                <p className='text-[14px] font-inter font-normal text-richblack-5'>Email Address <sup>*</sup></p>
                                <input
                                    required
                                    type='email'
                                    name='email'
                                    value={email}
                                    placeholder='Enter Your Email'
                                    onChange={(e)=>setEmail(e.target.value)}
                                    style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                    className='p-[12px] bg-richblack-800  border-none rounded-md text-richblack-5 w-full'
                                />
                            </label>
                        ):('')
                    }
                    <button  className='mt-8 w-full p-[12px] text-[16px] font-inter font-medium bg-yellow-50 rounded-md'>
                        {
                            !sentEmail ? "Reset Password" : "Resend Email"
                        }
                    </button>
                    </form>
                    <Link to={'/login'} className='flex flex-row items-center gap-2'><FaArrowLeftLong/> Back To Login</Link>
                </div>
            )
        }
    </div>
   </div>
  )
}

export default ForgotPassword