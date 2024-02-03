import React from 'react'
import { useForm } from 'react-hook-form'
import countryCode from '../../../../data/countrycode.json'
import IconBtn from '../../../commen/IconBtn'
import { setLoading } from '../../../../slices/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../../servicess/operations/Settingsapi'
function PersonalDetail() { 
    const {user} = useSelector((state)=> state.profile)
    const {token} = useSelector((state)=> state.auth)
    const dispatch = useDispatch();
    const {
           register,
           handleSubmit,
           reset,
           formState:{errors,isSubmitSuccessful}
    } = useForm()

    function submitHandler(data){
      setLoading(true);
      dispatch(updateProfile(token,data));
      setLoading(false);
      console.log("user --->",user)
    }
    function resetHandler(){
      reset({
        firstName:"",
        lastName:"",
        phoneNo:"",
        about:"",
        dateOfBirth:"",

      })
    }
  return (
    <div className='flex flex-col gap-[20px] rounded-md bg-richblack-800 border-[1px] border-richblack-700 p-[30px]'>
      <h1 className='text-semibold text-[18px] text-richblack-5'>Profile Information</h1>

      <form className='flex flex-col gap-[20px] w-full relative'
      onSubmit={handleSubmit(submitHandler)}
      >
         <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col gap-1 w-[45%]'>
          <label htmlFor='firstName'
          className='font-normal text-[14px] text-richblack-5'
          >First Name</label>
          <input
            type='text'
            name='firstName'
            id='firstName'
            className='form-style'
            placeholder='Enter your First Name'
            {
              ...register("firstName",{required:{
                                        value:true,
                                        message:"Please enter your First Name"}})
            }
            
          />
          {
            errors.firstName && (
              <span className='text-[12px] font-normal text-richblack-500'>{errors.firstName.message}</span>
            )
          }

          </div>
          <div className='flex flex-col gap-1 w-[45%]'>
            <label htmlFor='lastName'
             className='font-normal text-[14px] text-richblack-5'>Last Name</label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Enter your last name'
              className='form-style'
              {
                ...register("lastName",{
                  required:{
                    value:true,
                    message:"Enter your last Name"
                  }
                })
              }
            />
            {
              errors.lastName && (
                <span className='text-[12px] font-normal text-richblack-500 '>{errors.lastName.message}</span>
              )
            }

          </div>
         </div>

         <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col gap-1 w-[45%]'>
          <label htmlFor='dob'
          className='font-normal text-[14px] text-richblack-5'
          >Date of Birth</label>
          <input
            type='date'
            name='dob'
            id='dob'
            className='form-style'
            placeholder='Enter your First Name'
            {
              ...register("dateOfBirth",{required:{
                                        value:true,
                                        message:"Please enter your First Name"}})
            }
            
          />
          {
            errors.dateOfBirth && (
              <span className='text-[12px] font-normal text-richblack-500'>{errors.dateOfBirth.message}</span>
            )
          }

          </div>
          <div className='flex flex-col gap-1 w-[45%]'>
            <label htmlFor='gender'
             className='font-normal text-[14px] text-richblack-5'>Gender</label>
           <select
           id='gender'
           name='gender'
           placeholder='Add gender'
           className='form-style'
           {...register("gender",{required:{
                                   value:true,
                                   message:"Add gender"
           }})}
           >
            <option value={"male"}>Male</option>
            <option value={"femal"}>femal</option>
            <option value={"Transgender"}>Transgender</option>
            <option value={"Prefer not to say"}>Prefer not to say</option>
            <option value={"other"}>other</option>

           </select>
          </div>
         </div>

         <div className='flex flex-col gap-y-2 md:flex-row justify-between items-center'>
          <div className='flex flex-col gap-1 w-full md:w-[45%]'>
          <label htmlFor='number'
          className='font-normal text-[14px] text-richblack-5'
          >Phone Number</label>

          <div id='number' className='flex flex-row gap-3 items-center'>
          <select
          className='form-style w-[80px]'
          {...register("country",{required:true})}

          >
           {
            countryCode.map((country , index)=>{
              return (
                <option key={index} value={country.code}>{country.code}-{country.country}</option>
              )
            })
           }
          </select>
          <input
            type='tel'
            name='phone'
            id='phone'
            className='form-style w-full'
            placeholder='12345 67890'
            {
              ...register("contactNumber",{required:{
                                        value:true,
                                        message:"Please enter your contact number"},
                                        
                                        maxLength:{value:12,message:"invalide number"},
                                        minLength:{value:10,message:"invalide number"}})
            }
            
          />
          </div>

          {
            errors.phoneNo && (
              <span className='text-[12px] font-normal text-richblack-500'>{errors.contactNumber.message}</span>
            )
          }

          </div>
          <div className='flex flex-col gap-1 w-full md:w-[45%]'>
            <label htmlFor='about'
             className='font-normal text-[14px] text-richblack-5'>About</label>
            <input
              type='text'
              id='about'
              name='about'
              placeholder='Enter about your self'
              className='form-style'
              {
                ...register("about",{
                  required:{
                    value:true,
                    message:"Enter about yourself"
                  }
                })
              }
            />
            {
              errors.lastName && (
                <span className='text-[12px] font-normal text-richblack-500'>{errors.about.message}</span>
              )
            }

          </div>
         </div>

        <div className='absolute -bottom-[110px] flex -right-[26px] gap-x-4'>
            <IconBtn type={'submit'} text={"save"}></IconBtn>
            <button onClick={resetHandler}
              className='px-[24px] py-[8px] rounded-md font-medium bg-richblack-700 text-richblack-100
              border-[1px] border-richblack-600'>Cancel</button>
        </div>
    </form>
    </div>
  )
}

export default PersonalDetail