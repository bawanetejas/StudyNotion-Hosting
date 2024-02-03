import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setCourse, setEditCourse} from '../../../../slices/courseSlice'
import { useParams } from 'react-router-dom';
import { getAllCourseDetail } from '../../../../servicess/operations/CourseDetailApi';
import RenderSteps from '.././AddCourse/RenderStep'
export const EditCourse = () => {

    const{token}=useSelector((state)=>state.auth);
    const {course} = useSelector((state)=>state.course)
    const {courseId} = useParams();
    const dispatch = useDispatch();
    const[loading,setLoading] = useState()

    useEffect(()=>{
        const courseDetail=async()=>{
        setLoading(true)
        
        const result = await getAllCourseDetail(courseId,token)

        if(result){
          console.log("this is from edit course --->",result)
            dispatch(setEditCourse(true))
            dispatch(setCourse(result.courseDetails))
        }
                setLoading(false);
       }
       courseDetail()
       console.log('course',course)
    },[])

    if(loading){
      return <div className='w-screen h-screen grid place-items-center'>
        <div className='loading'></div>
      </div>
    }
  return (
    <div className='absolute overflow-auto w-full'>
       <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Edit Course</h1>
       <div>
        {
          course ?(
          <RenderSteps/>) :
          (<p className='mt-14 text-center text-3xl font-semibold text-richblack-100'>Course Not Found</p>)
        }
       </div>
    </div>
  )
}
