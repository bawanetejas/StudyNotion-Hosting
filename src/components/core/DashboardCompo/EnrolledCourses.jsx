import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnrolledCourses } from '../../../servicess/operations/ProfileApi'
import ProgressBar from '@ramonak/react-progress-bar'
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

function EnrolledCourses() {
  const [courses ,setCourses] = useState([])
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 async function getCourses(){
       const response = await getEnrolledCourses(token);
       setCourses(response)
  }
  useEffect( ()=>{
    getCourses()
  },[])
  return (
    <div className='text-white w-full absolute h-full'>
      <div className='text-[30px] text-richblack-5 font-medium'>Enrolled Courses</div>
      <div className='w-[350px] md:w-11/12  lg:w-[880px]'>
      {
        courses?.length>0 ? (<div  className='mt-6'>
            
            <div className='flex flex-row bg-richblack-700 p-4 text-richblack-50 font-medium rounded-t-md'>
              <p className='w-[50%]'>Course name</p>
              <p className='w-[22%] md:block hidden'>Duration</p>
              <p className='w-[40%] md:w-[22%] ml-6'>Progress</p>
            </div>

            <div className='w-full bg-richblack-800 rounded-b-md'>
              {
                courses.map((course , index)=>{
                 return <div key={index} className='flex flex-row gap-3 w-full border-b-richblack-600 border-b-[1px] '>
                      <div
                      onClick={()=> {navigate(`/view-course/${course._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subsection?.[0]?._id}`)}}
                       className='flex cursor-pointer flex-row w-[50%] gap-5 p-4 items-center'>
                      <img src={course.thumbNail} alt='course Thumbnail '
                        className='w-[52px] aspect-square rounded-md'
                      />
                        <div className='flex flex-col gap-2'>
                          <p className='text-richblack-5 font-medium text-sm'>{course?.courseName}</p>
                          <p className='text-richblack-300 text-sm font-normal'>{course?.courseDescription.length >50 ?(
                            course.courseDescription.split(" ").splice(0,4).join(" ")+"..."
                          ):( course.courseDescription)
                          }</p>
                        </div>
                      </div>
                      <div  className='hidden md:block md:w-[22%] p-4 text-richblack-300'>{course?.duration}</div>
                      <div className='w-[40%] md:w-[22%] text-richblack-300 p-4' >
                        <p>Completed {course?.progressPercentage || 0}%</p>
                        <ProgressBar
                          completed={course?.progressPercentage || 0}
                          height='8px'
                          isLabelVisible= "false"
                        />
                      </div>
                      <div className='p-4 mt-4'>
                       <HiDotsVertical/>
                      </div>
                  </div>
                
                })
              }
            </div>

        </div>
                              ):(
                                <p className='text-richblack-100 mt-[100px] text-center border-b-[1px] border-b-richblack-600 pb-6 text-[20px] font-medium'> You are not enrolled in any courses yet</p>)
      }
      </div>
    </div>
  )
}

export default EnrolledCourses