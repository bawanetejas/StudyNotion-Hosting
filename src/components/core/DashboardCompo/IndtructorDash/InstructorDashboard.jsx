import React, { useEffect, useState } from 'react'
import { instDashboard } from '../../../../servicess/operations/ProfileApi'
import { useSelector } from 'react-redux'
import Chart from './Chart'
import { getAllInstructorCourses } from '../../../../servicess/operations/CourseDetailApi'
import { useNavigate } from 'react-router-dom'

function InstructorDashboard() {

    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const [courseData,setCourseData] = useState([])
    const [courseCardData,setCourseCardData] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{

        const courseDetail = async()=>{
            const res = await instDashboard(token);
           
            const result = await getAllInstructorCourses(token)

            if(result.length > 3){
              console.log("hey this is the best -->",result.length)
              result.splice(0,2)
            }
            console.log("result --->",result)
             setCourseCardData(result)
            setCourseData(res)
        }
        courseDetail()
    },[])
    const totalStudent = courseData?.reduce((acc,curr) =>acc+curr.totalEnrolledStudent,0)
    const totalAmount = courseData?.reduce((acc,curr) =>acc+curr.totalAmount,0)
    
  return (
    <div className='absolute z-[10] w-full'>

      <div>
        {/* name and heading */}
        <div className='space-y-2'>
         <p className='text-richblack-5 text-xl font-medium'>Hi {user.firstName} 👋</p>
         <p className='text-lg font-medium text-richblack-400'>Let's start something new</p>
        </div>

        {/* chart section  */}

        <div className='flex md:flex-row flex-col gap-3 w-full  '>
        <Chart  courseData={courseData}/>

          <div className='bg-richblack-800 flex flex-col h-fit gap-2 rounded-md mt-3 p-4 w-full md:w-[30%]'>

            <p className='text-richblack-5 font-semibold text-xl'>Statistics</p>

            <div className='text-richblack-5 font-semibold text-lg'>
              <p>Total Courses</p>
              <p>{courseData?.length}</p>
            </div>

            <div  className='text-richblack-5 font-semibold text-lg'>
              <p>Total Student</p>
              <p>{totalStudent}</p>
            </div>
            
            <div  className='text-richblack-5 font-semibold text-lg'>
              <p>Total Income</p>
              <p>{totalAmount}</p>
            </div>
          </div>

        </div>

        {/* course section */}

        <div className='w-full p-4 bg-richblack-800 rounded-md mt-5'>
          <div className='flex justify-between mb-3'>
            <p className='text-richblack-5 font-medium text-lg '>Your Courses</p>
            <p
            className='text-yellow-200 font-medium text-lg cursor-pointer'
            onClick={()=> navigate("/dashboard/my-courses")}
            >View All</p>
          </div>

          <div className='flex md:flex-row flex-col justify-between items-center'>
            {
              courseCardData?.slice(0,3)?.map((course,index)=>{
                return <div key={index}
                className='flex flex-col gap-2 w-full md:w-[30%] '>
                  <img src={course.thumbNail}
                    className='w-full aspect-square rounded-md'
                  />
                  <p className='text-richblack-5 font-semibold text-lg'
                  >{course.courseName}</p>
                  <p
                  className='text-richblack-400 font-medium text-md'
                  >{course.studentsEnrolled.length} Student | Rs.{course.price}</p>
                </div>
              })

            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorDashboard