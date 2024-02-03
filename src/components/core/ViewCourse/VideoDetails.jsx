import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react';
import {markAsLectureCompleted} from '../../../servicess/operations/CourseDetailApi'
import 'video-react/dist/video-react.css';
import IconBtn from '../../commen/IconBtn';

function VideoDetails() {

  const{courseId,sectionId,subSectionId}=useParams();
  const {token} = useSelector((state)=>state.auth)

  const playRef = useRef('')
  const navigate = useNavigate()
  const [videoDetail,setVideoDetail] = useState('')
  const [firstVideo,setFirstVideo] = useState(false);
  const [lastVideo,setLastVideo] = useState(false);
  const [videoEnd,setVideoEnd] = useState(false)
  const location = useLocation()
  const{courseEntireData,courseSectionData,
       totalNoOfLectures,completedLectures} = useSelector((state)=>state.viewCourse)

  useEffect(()=>{
    const setVideo = ()=>{
      const currentSec = courseSectionData.findIndex((sec)=>sec._id === sectionId)
      const currentSubSec = courseSectionData?.[currentSec]?.subsection?.filter((subsec)=>subsec._id === subSectionId)
      setVideoDetail(currentSubSec?.[0]);
    }

    setVideo();
    isLastVideo();
    isFirstVideo();
  },[location.pathname,courseSectionData,courseEntireData])

  const isFirstVideo = ()=>{
    const fVideo = courseSectionData?.[0]?.subsection?.[0]?._id
    const currentSection = courseSectionData.findIndex((sec)=>sec?._id === sectionId)

    const currentSubSec = courseSectionData?.[currentSection]?.subsection?.filter((subsec)=>subsec?._id === subSectionId);

    if(currentSubSec?.[0]?._id === fVideo){
      setFirstVideo(true);
      return 
    }
    else {
       setFirstVideo(false);
       return
    }
  }

  const isLastVideo = ()=>{
    const lastSubSecLength = courseSectionData?.[courseSectionData?.length -1]?.subsection?.length

    const lVideo = courseSectionData?.[courseSectionData?.length -1]?.subsection?.[lastSubSecLength-1]?._id
    const currentSection = courseSectionData.findIndex((sec)=>sec?._id === sectionId)

    const lastSubSec = courseSectionData?.[currentSection]?.subsection?.filter((subsec)=>subsec?._id === subSectionId);

    if(lastSubSec?.[0]?._id === lVideo){
       setLastVideo(true);
       return 
    }
    else {
     setLastVideo(false);
     return 
    }
  }


  const nextVideo = () =>{
 
    const currentSection = courseSectionData.findIndex((sec)=>sec?._id === sectionId)
    const currentSubSec = courseSectionData?.[currentSection]?.subsection?.findIndex((subsec)=>subsec?._id === subSectionId);

    const noOfSubSection = courseSectionData?.[currentSection]?.subsection?.length
    console.log("subsec -->",currentSubSec)
    if(currentSubSec !== noOfSubSection-1){
      navigate(`/view-course/${courseId}/section/${courseSectionData?.[currentSection]?._id}/sub-section/${courseSectionData?.[currentSection]?.subsection?.[currentSubSec+1]?._id}`)
    }
    else{
      navigate(`/view-course/${courseId}/section/${courseSectionData?.[currentSection + 1]?._id}/sub-section/${courseSectionData?.[currentSection + 1]?.subsection?.[0]?._id}`)

    }
  }

  const previousVideo = () =>{
 
    const currentSection = courseSectionData.findIndex((sec)=>sec?._id === sectionId)
    const currentSubSec = courseSectionData?.[currentSection]?.subsection?.findIndex((subsec)=>subsec?._id === subSectionId);

    
    console.log("subsec -->",currentSubSec)
    if(currentSubSec !== 0){
      navigate(`/view-course/${courseId}/section/${courseSectionData?.[currentSection]?._id}/sub-section/${courseSectionData?.[currentSection]?.subsection?.[currentSubSec -1]?._id}`)
    }
    else{
      const preSubSeclength = courseSectionData?.[currentSection-1]?.subsection?.length
      const preSubSec = courseSectionData?.[currentSection - 1]?.subsection?.[preSubSeclength-1]
      navigate(`/view-course/${courseId}/section/${courseSectionData?.[currentSection - 1]?._id}/sub-section/${preSubSec?._id}`)

    }
  }
  
  const lectureCompletion =async(subsectionId)=>{
    const res = await markAsLectureCompleted(courseId,subsectionId,token)
  }

  return (
    <>

    <div className='md:absolute relative w-full z-10 pb-9 h-[600] md:h-full bg-richblack-900'>
    <div className='flex gap-x-2 items-center'> 
     {!firstVideo && <p className='p-3 cursor-pointer rounded-md bg-pink-400 text-richblack-900'
      onClick={()=>previousVideo()}>Previous</p>}
     {!lastVideo && <p className=' p-3 cursor-pointer rounded-md bg-pink-400 text-richblack-900'
      onClick={nextVideo}>Next</p>}
    </div>
      <div>
        {
          videoDetail ? (
            <div className='text-white mt-8'>
            <Player
            aspectRatio="16:9"
            playsInline
            ref={playRef}
            onEnded ={()=> setVideoEnd(true)}
            src={videoDetail?.videoUrl}
            className='relative flex items-center justify-center'
            >
            {
              videoEnd && (
               <div className='w-full inset-0 absolute backdrop-blur-sm z-[1000]  flex flex-col items-center justify-center'>
               <div className='absolute top-[50%]  flex flex-col items-center justify-center gap-y-3'>
                  
                  <IconBtn
                    onclick={()=>{
                      if(playRef?.current){
                        playRef.current?.seek(0)
                        setVideoEnd(false);
                        
                      }
                  
                    }}

                    text={'Rewatch'}
                  />

                  <IconBtn

                  onclick={()=>lectureCompletion(videoDetail?._id)}
                  text={"Mark lecture as completed"}

                  />
               
              </div>
               </div>
              )
            }
            </Player>

            <div className='flex flex-col gap-y-2 mt-3 pb-3'> 
              <p className='text-2xl text-richblack-5 font-semibold'>{videoDetail?.title}</p>
              <p className='text-sm font-medium text-richblack-50'>{videoDetail?.description}</p>
            </div>
          </div>
          ) :
          (<div className='text-4xl text-richblack-5 font-semibold'>NO Video found</div>)
        }
      </div>
    </div>
    </>
  )
}

export default VideoDetails