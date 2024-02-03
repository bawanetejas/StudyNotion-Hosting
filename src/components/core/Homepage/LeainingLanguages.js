import React from 'react'
import CTAButton from './CTAButton'
import HighlightText from './HighlightText'

import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import compair_with_others from "../../../assets/Images/Compare_with_others.png"

function LeainingLanguages() {
  return (
    <div className='max-w-maxContent w-11/12 mx-auto flex flex-col items-center gap-6 mt-20 pb-16'>
       
       <div className='text-4xl font-semibold text-richblack-900'>
        Your swiss knife for 
        <HighlightText  text={"learning any languages"} />
            
       </div>
       <p className='text-center text-[16px] font-medium text-richblack-700 md:w-[750px]'>
       Using spin making learning multiple languages easy. 
       with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
       </p>

       <div className='flex flex-col  md:flex-row justify-center items-center'>
       <img src={know_your_progress} alt='know your progress ' className='object-cover  w-fit md:-mr-[7rem]'/>
       <img src={compair_with_others} alt='compair with others' />
       <img src={Plan_your_lessons} alt='plan your lessons' className='object-cover w-fit md:-ml-[8rem]'/>
       
        
       </div>

       <CTAButton linkto={"/signup"} yellowflag={true}>
        Learn More
       </CTAButton>

    </div>
  )
}

export default LeainingLanguages