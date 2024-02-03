import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../commen/IconBtn';
import { IoArrowBack } from "react-icons/io5";
function VideoDetailSideBar({setReviewModal}) {
    const location = useLocation();
    const navigate = useNavigate()
    const{courseId,sectionId,subSectionId} = useParams();
    const{courseSectionData,courseEntireData,
        completedLectures,totalNoOfLectures} = useSelector((state)=>state.viewCourse)

        const [sectionActive,setSectionActive] = useState('');
        const [videoBarActive,setVideoBarActive]=useState('')
        useEffect(()=>{
            
            const setActiveFlags = async()=>{

                console.log('sections slice data -->',courseSectionData)
                const currentSection = courseSectionData.findIndex((sec)=>
                sec?._id === sectionId
                )

                const currentSubSection = courseSectionData?.[currentSection]?.subsection.findIndex((subsec)=>
                     subsec?._id ===  subSectionId
                );

                const activeSubSectionId = courseSectionData?.[currentSection]?.subsection?.[currentSubSection]?._id;

                //set section flag active

                setSectionActive(courseSectionData?.[currentSection]?._id)

                //set subsection flag active

                setVideoBarActive(activeSubSectionId);
            }
           
            setActiveFlags();

        },[courseSectionData,location.pathname]);

        const handleAddReview =()=>{
            setReviewModal(true)
        }

        
  return (
       <>

       
        <div className='w-full md:min-w-[220px] h-[400px] md:min-h-[calc(100vh-3.5rem)] flex flex-col absolute md:sticky overflow-auto
      gap-3 bg-richblack-800 py-[30px] border-t-[1px] border-t-richblack-700 border-r-[1px] border-r-richblack-700'>
        
        {/* for button */}

        <div className='text-yellow-200 p-4 flex justify-between items-center'>
            <button
            onClick ={()=>{navigate('/dashboard/enrolled-courses')}}
            >
              <IoArrowBack
                size={24}
              />
            </button>
            <IconBtn
                text={"Add Review"}
                onclick={()=>handleAddReview()}
            />
        </div>

        {/* course heading  */}
        <div className='py-2 px-6 border-b-[1px] border-b-richblack-700'>
            <p className='text-lg font-bold text-richblack-25'>{courseEntireData.courseName}</p>
            <p className='text-sm font-semibold text-richblack-500'>{completedLectures?.length} / {totalNoOfLectures}</p>
        </div>

        {/* section and subsection data */}
            <div>
            {
                courseSectionData?.map((section,index)=>{
                 return <div key={index}
                    className='cursor-pointer'
                    onClick={()=>setSectionActive(section?._id)}
                    >
                         <p className='bg-richblack-700 text-richblack-25 py-4 px-6 border-b-[1px] border-b-richblack-600'>{section?.sectionName}</p>

                        <div>
                        {
                           sectionActive === section._id &&
                                <div className='flex flex-col gap-2 '>
                                    {
                                        
                                        section?.subsection?.map((subsec,ind)=>{
                                          return <div 
                                                 className={`flex gap-5 px-6 py-4 cursor-pointer  ${
                                                        videoBarActive === subsec?._id
                                                        ? "bg-yellow-200 text-richblack-900"
                                                        : "bg-richblack-900 text-white"
                                                    }`}
                                                key={ind}
                                                onClick={()=> {
                                                    navigate(`view-course/${courseId}/section/${section?._id}/sub-section/${subsec?._id}`)
                                                }}
                                                >
                                                    <input
                                                        type='checkbox'
                                                        checked = {completedLectures.includes(subsec?._id)}
                                                        onChange={() => {}}
                                                    />
                                                    <p>{subsec?.title}</p>
                                                </div>
                                        })
                                    }
                                </div>
                          
                        }
                        </div>
                    </div>
             })
             }
            </div>
        </div>
       </>
  )
}

export default VideoDetailSideBar