import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import IconBtn from '../../commen/IconBtn';
import { useForm } from 'react-hook-form';
import { createRating } from '../../../servicess/operations/CourseDetailApi';
import { RxCross2 } from "react-icons/rx";
function CourseReviewModal({setReviewModal}) {

  const {user} = useSelector((state)=> state.profile)

  const {token} = useSelector((state)=>state.auth)
  const {courseEntireData} = useSelector((state)=>state.viewCourse)

  useEffect(()=>{

    setValue("review",'')
    setValue("rating",0)
  },[])
  const{
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  } = useForm()
 
  const ratingChanged =(newRating)=>{
    setValue('rating',newRating);
  }

  const onSubmitForm = async(data)=>{
     await createRating(data.review,data.rating,courseEntireData?._id,token)
     setReviewModal(false)
  }
  return (
    <div className='fixed z-[2000] flex items-center justify-center inset-0 backdrop-blur-sm '>
      <div className=' w-11/12 md:w-[665px]  rounded-lg'>

        <div className='flex w-full justify-between items-center py-4 px-6 border-b-richblack-25 border-b-[1px] bg-richblack-700 rounded-t-lg'>
          <p className='text-lg font-semibold text-richblack-5'>Add Review</p>
          <p onClick={()=>{setReviewModal(false)}} className='text-richblack-50'><RxCross2/></p>
        </div>

        {/* user detail and rating */}

     
     <div className='w-full p-8 bg-richblack-800 rounded-b-lg'>
     <div className='flex w-full items-center justify-center gap-2'>
          <img src={user.image} className='w-[53px] aspect-square rounded-full'/>
          <div className='flex flex-col  gap-2 items-center'>
            <p className='font-semibold text-md text-richblack-5'>{user.firstName} {user.lastName}</p>
            <p className='font-normal text-md text-richblack-50'>Posting Publicaly</p>
          </div>
        </div>

      {/* star component */}
      <form onSubmit={handleSubmit(onSubmitForm)}
       className='flex flex-col gap-3 justify-center items-center'
      >
      
        <ReactStars
          count={5}
          size={24}
          edit={true}
          onChange={ratingChanged}
          activeColor="#ffd700"
        />
  
      <div className='w-full '>
        <label htmlFor='review' className='text-richblack-5 font-medium '>Add your Experience<sup className='text-[red] text-xl pb-2'>*</sup></label>
        <textarea 
        className='form-style min-h-[130px] w-full'
        id='review'
        name='review'
        
        rows={8}
        {...register("review",{required:true})}
        placeholder='Share Details of your experience for this course'
        />
        {
          errors.review && (
            <span>
              Please add your experience
            </span>
          )
        }
      </div>

      <div className='w-full flex justify-end'>
      <div className='w-full flex items-center justify-end gap-4'>
        <button
        className='bg-richblack-600 py-2 px-4 rounded-lg text-richblack-5 font-medium'
        onClick={()=>{setReviewModal(false)}}
        >
          Cancel
        </button>
        <IconBtn
          type={'submit'}
          text={'Save Changes'}
        />
      </div>
      </div>
      </form>
     </div>
      </div>
    </div>
  )
}

export default CourseReviewModal