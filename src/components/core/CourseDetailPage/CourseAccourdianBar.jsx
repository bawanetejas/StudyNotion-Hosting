
import React, { useEffect, useRef, useState } from 'react'
import {AiOutlineDown} from 'react-icons/ai'

import { HiOutlineVideoCamera } from "react-icons/hi"
function CourseAccourdianBar({section,isActive,handleActive,}) {

    const content = useRef(null);

    //Accordian state
    const [active,setActive] = useState(false);

    useEffect(()=>{
        setActive(isActive?.includes(section._id))
        
    },[isActive]);
    const [sectionHeight,setSectionHeight] = useState(0)

    useEffect(()=>{
        setSectionHeight(active ? content.current.scrollHeight : 0)
    },[active])
  return (
    <div className=''>
       <div
        onClick={()=>handleActive(section._id)}
        className='flex items-center cursor-pointer  justify-between bg-opacity-20 border-solid  border bg-richblack-700 border-richblack-600 py-4 px-8 transition-[0.3s]'>
         <div className='flex items-center gap-2'>
         <i
            className={`${
                isActive.includes(section._id) ? "rotate-180 transition-[0.3s]":"rotate-0 transition-[0.3s]"
            } text-richblack-100 font-medium`}
            >
            <AiOutlineDown />
            </i>
            <p className='text-richblack-5 font-medium text-sm'>{section.sectionName}</p>
         </div>

          <div className="space-x-4">
            <span className="text-yellow-25">
              {`${section?.subsection?.length || 0} lecture(s)`}
            </span>
          </div>
       </div>

       <div
       ref={content}
       className='relative h-0 overflow-hidden  bg-richblack-900 transition-[height] duration-300 ease-out'
       style={{height:sectionHeight}}
       >

       <div className='py-4 px-8 border-x-richblack-600 border-b-richblack-600 border'>
        {
          section.subsection.map((subSec,i)=>(
              <div key={i}>
                <div className="flex justify-between py-2 text-richblack-5 font-medium text-sm">
                  <div className={`flex items-center gap-2`}>
                    <span>
                      <HiOutlineVideoCamera />
                    </span>
                    <p>{subSec?.title}</p>
                  </div>
                </div>
              </div>
          ))
        }
       </div>

       </div>

    </div>
  )
}

export default CourseAccourdianBar