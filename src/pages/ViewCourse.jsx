import React, { useEffect, useState } from 'react'
import { getAllCourseDetail } from '../servicess/operations/CourseDetailApi'
import { setCourseSectionData,setEntireCourseData,setCompletedLectures,setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import VideoDetailSideBar from '../components/core/ViewCourse/VideoDetailSideBar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
function ViewCourse() {

  const [reviewModal,setReviewModal]= useState();

  const dispatch = useDispatch();
  const {courseId}= useParams();
  const {token}=useSelector((state)=>state.auth)
  useEffect(()=>{

    const setCourseDetails = async()=>{
      const courseData = await getAllCourseDetail(courseId,token);
      console.log("course data --->",courseData)
      dispatch(setEntireCourseData(courseData?.courseDetails))
      dispatch(setCourseSectionData(courseData?.courseDetails.courseContent))
      dispatch(setCompletedLectures(courseData?.completedVideos))

      let lectures =0;
      courseData?.courseDetails?.courseContent?.forEach((sec)=>{
        lectures+=sec?.subsection.length
      })

      dispatch(setTotalNoOfLectures(lectures))
    }
   
    setCourseDetails(courseId,token)
  },[])

  return (
     <>
      <div className='relative z-[1000] flex md:flex-row flex-col-reverse min-h-[calc(100vh - 3.5rem)] '>
       <div className='relative'>
       <VideoDetailSideBar setReviewModal={setReviewModal}/>
       </div>
       <div className='mx-auto w-11/12 max-w-[1000px] py-10 relative z-[1000] h-[600px]  md:h-[calc(100vh -3.5rem)] flex-1 overflow-auto'>
        <Outlet/>
       </div>
       {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal}/>)}
      </div>
     </>
  )
}

export default ViewCourse