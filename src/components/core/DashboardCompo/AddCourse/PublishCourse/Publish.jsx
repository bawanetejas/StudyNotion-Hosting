import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../commen/IconBtn'
import {resetCourseState , setStep} from '../../../../../slices/courseSlice'
import {COURSE_STATUS} from '../../../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editCourseDetails } from '../../../../../servicess/operations/CourseDetailApi'
function Publish() {


  const {course} = useSelector((state)=>state.course)
  const {token} = useSelector((state)=>state.auth)
  const [loading ,setLoading] = useState(false)

 
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState:{errors}
    } = useForm()
    
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(()=>{
      if(course.status === COURSE_STATUS.PUBLISHED){
        setValue("public",true)
      }
    },[])

    const goBack =()=>{
      dispatch(setStep(2))
    }

    const goToCourses =()=>{
      dispatch(resetCourseState())
      navigate("/dashboard/my-courses")
    }
  const handleCourseSubmit =async ()=>{
    //check form is updated or not
    if((course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues('public') === false)){
          // form not updated 
          goToCourses()
          return
        }

    const formData = new FormData();
    formData.append("courseId",course._id)

    const courseStatus = getValues('public') 
          ? COURSE_STATUS.PUBLISHED
          : COURSE_STATUS.DRAFT
    
    formData.append("status",courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData,token)

    if(result){
      goToCourses();
    }

    setLoading(false);

  }

  const onSubmit = (data)=>{
    handleCourseSubmit();
  }
  return (
    <div className='rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
        <p className='text-richblack-5 text-2xl font-semibold'>Publish Setting</p>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='my-6 mb-8'>
                <label htmlFor='public' className='inline-flexx items-center text-lg'>
                    <input 
                    type='checkbox'
                    id='public'
                    {...register("public")}
                    className='border-richblack-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5'
                      />
                      <span className='ml-2 text-richblack-400'>
                        Make this course as a public
                      </span>
                </label>
            </div>
           {/* next and previous button */}
           <div className='max-w-max flex items-center gap-x-4 '>
            <button
            disabled={loading}
            type='button'
            onClick={goBack}
            className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
            >
                Back
            </button>

            <IconBtn type={"submit"}
            text={"Save changes"} />
           </div>
        </form>
    </div>
  )
}

export default Publish