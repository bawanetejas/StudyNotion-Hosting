
import React, { useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { resetPassword } from '../servicess/operations/authApi';

function UpdatePassword() {

  const dispatch = useDispatch();
  const [showPass,setShowPass] = useState(false);
  const [email,setEmail]= useState("");
  const {loading}= useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const loacation = useLocation();
  const token = loacation.pathname.split("/").at(-1);
  
  const [formData,setFormData] = useState({
    password:'',
    confirmPassword:'',
  })

  const {password,confirmPassword} = formData;                                    

  const changeHandler =(e)=>{
    setFormData((pre)=>({
      ...pre,
      [e.target.name]:e.target.value,
    }))
  }
   
   const onSubmitHandler =(e)=>{
    e.preventDefault();
    dispatch(resetPassword(setEmail,password,confirmPassword,token))
   }

  return (
    <div className='w-11/12 md:w-[500px] p-[32px] flex flex-col gap-[24px] mx-auto mt-[100px]'>
    {
      loading ? (
        <div className='loading'></div>
      ):(
        email ?(<div>
           <h1 className='text-[36px] font-semibold text-richblack-5'>Reset complete!</h1>
           <p className='text-[14px] font-inter font-normal text-richblack-5'>{`All done! We have sent an email to ${email} to confirm`}</p>
           <Link to={'/login'}>
           <button className='mt-8 w-full p-[12px] text-[16px] font-inter font-medium bg-yellow-50
        rounded-md'>Back to login</button>
           </Link>
        </div>
        ):(
          <div className='flex flex-col gap-[10px]'>
              <h1 className='text-[36px] font-semibold text-richblack-5'>Choose  new password</h1>
              <p className='text-[18px] text-richblack-100 font-normal'>Almost done. Enter your new password and you are all set.</p>
              <form onSubmit={onSubmitHandler} className='flex flex-col gap-[24px]'>
                <label className='relative'>
                  <p className='text-[14px] font-inter font-normal text-richblack-5'>New Password <sup className='text-[red]'>*</sup></p>
                  <input
                    required
                    name='password'
                    value={password}
                    type={!showPass ? "password":"text"}
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
                  <p className='text-[14px] font-inter font-normal text-richblack-5'>Confirm New Password <sup className='text-[red]'>*</sup></p>
                  <input
                    required
                    name='confirmPassword'
                    value={confirmPassword}
                    type={!showPass ? "password":"text"}
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

                <div className='flex flex-row flex-wrap gap-x-4 gap-y-2'>
                  <p className='flex flex-row gap-2 items-center text-caribeangreen-300'><IoIosCheckmarkCircle  width={24}/>one lowercase character</p>
                  <p className='flex flex-row gap-2 items-center text-caribeangreen-300'><IoIosCheckmarkCircle/>one upper character</p>
                  <p className='flex flex-row gap-2 items-center text-caribeangreen-300'><IoIosCheckmarkCircle/>one special character</p>
                  <p className='flex flex-row gap-2 items-center text-caribeangreen-300'><IoIosCheckmarkCircle/>one Number</p>
                  <p className='flex flex-row gap-2 items-center text-caribeangreen-300'><IoIosCheckmarkCircle/>8 character minimum</p>
                  
                </div>
                <button
                type='submit'
                className='mt-8 w-full p-[12px] text-[16px] font-inter font-medium bg-yellow-50 rounded-md'
                > Reset Password</button>
              </form>
          </div>
        )
      )
    }
        
    </div>
  )
}

export default UpdatePassword