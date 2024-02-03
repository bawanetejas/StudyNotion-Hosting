import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../commen/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../../servicess/operations/Settingsapi';
import { FaEyeSlash ,FaEye} from "react-icons/fa6";
import { useState } from 'react';
function ChangePassword() {
    const [showPass ,setShowPass] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth)
    const{
         register,
         handleSubmit,
         reset,
         formState:{errors,isSubmitSuccessful}
    }   = useForm();

    function resetHandler(){
        reset({
            confirmPassword:"",
            newPassword:"",
        })
    }

    function submitHandler(data){
        // console.log(data)
        dispatch(changePassword(token,data))
    }
  return (
    <div className='p-[30px] mt-[100px] bg-richblack-800 border-[1px] rounded-md border-richblack-700 flex flex-col gap-y-3'>
        <h1 className='text-xl text-richblack-5 font-semibold'>Change Password</h1>
        <form 
        onSubmit={handleSubmit(submitHandler)}
        className='relative flex md:flex-row flex-col gap-y-3 w-full justify-between items-center'>
            <div className='relative w-full md:w-[45%] flex flex-col gap-2'>
                <lable htmlFor="newPassword" className="text-[14px] text-richblack-5 font-semibold" >New Password</lable>
                <input
                    type={`${showPass ? "text":"password"}`}
                    id='newPassword'
                    placeholder='Enter current password'
                    className='form-style'
                    {...register("newPassword",{required:true})}
                />
                {
                    errors.newPassword &&(
                        <span className='absolute text-[12px] text-richblack-300  -bottom-4 left-0'>Enter Password</span>
                    )
                }
                <div onClick={()=>setShowPass(!showPass)}
                 className='absolute right-4 top-[40%] translate-y-[50%]'>
                    {
                        !showPass ? <FaEyeSlash size={24} className='text-richblack-400'/> : <FaEye size={24} className='text-richblack-400' />
                    }
                </div>
            </div>
            <div className='relative w-full md:w-[45%] flex flex-col gap-2 '>
                <lable htmlFor="confirmPassword" className="text-[14px] text-richblack-5 font-semibold" >Confirm Password</lable>
                <input
                    type={`${showPass ? "text":"password"}`}
                    id='confirmPassword'
                    placeholder='Enter new password'
                    className='form-style'
                    {...register("confirmPassword",{required:true})}
                />
                {
                    errors.confirmPassword &&(
                        <span className='absolute text-[12px] text-richblack-300 -bottom-4 left-0'>Enter Password</span>
                    )
                }
                <div onClick={()=>setShowPass(!showPass)}
                 className='absolute right-4 top-[40%] translate-y-[50%]'>
                    {
                        !showPass ? <FaEyeSlash size={24} className='text-richblack-400'/> : <FaEye size={24} className='text-richblack-400' />
                    }
                </div>
            </div>

            <div className='absolute -bottom-[110px] flex -right-[26px] gap-x-4'>
            <IconBtn type={'submit'} text={"Update"}></IconBtn>
            <button onClick={resetHandler}
              className='px-[24px] py-[8px] rounded-md font-medium bg-richblack-700 text-richblack-100
              border-[1px] border-richblack-600'>Cancel</button>
        </div>
        </form>
    </div>
  )
}

export default ChangePassword