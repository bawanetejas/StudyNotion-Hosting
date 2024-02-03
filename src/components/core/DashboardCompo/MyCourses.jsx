import React, { useEffect, useState } from 'react'
import IconBtn from '../../commen/IconBtn'
import { useSelector } from 'react-redux'
import { VscAdd } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { getAllInstructorCourses } from '../../../servicess/operations/CourseDetailApi'
import { CoursesTable } from './InstructorCourses/CoursesTable'

function MyCourses() {
  const {token} = useSelector((state)=>state.auth)
  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    const fetcheAllCourses = async()=>{
       const result = await getAllInstructorCourses(token);
       if(result){
        setCourses(result);
      //  console.log('result of courses --->',result)
       }
    }
    fetcheAllCourses();
  },[])
  return (
    <div className='absolute min-h-full overflow-auto w-full '>
       <div className='mb-14 flex items-center justify-between'>
        <h1 className='text-3xl font-medium text-richblack-5'>My Courses</h1>
        <IconBtn 
        text={'Add Courses'}
        onclick={()=> navigate("/dashboard/add-course")}
        >
         <VscAdd/>
        </IconBtn>
       </div>
       {
        courses && <CoursesTable courses={courses} setCourses={setCourses} />
       }
  </div>
  )
}

export default MyCourses
