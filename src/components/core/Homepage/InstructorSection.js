
import React from 'react'
import instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import {FaArrowRightLong} from 'react-icons/fa6'
function InstructorSection() {
  return (
    <div className='w-full md:px-[90px] py-[120px] mx-auto'>

    <div className='flex flex-col md:flex-row gap-20 items-center justify-center'>

    <img src={instructor} alt='instructor' className='md:w-[50%] instructorshadow'/>
    <div className='md:w-[50%] flex flex-col gap-5 items-start'>
        <div className='w-[50%] text-4xl font-inter font-semibold'>
        Become an
        <HighlightText text={'Instructor'}/>
        </div>
        <p className='text-richblack-300 w-[80%] font-inter text-[16px] font-medium leading-[24px]'>Instructors from around the world teach millions of students 
        on StudyNotion. We provide the tools and skills to teach what you love.</p>
        <CTAButton linkto={"/siggnup"} yellowflag={true}>
          <div className='flex flex-row gap-4 items-center w-fit'>
            start teaching today 
            <FaArrowRightLong/>
          </div>
        </CTAButton>
    </div>

    </div>

    </div>
  )
}

export default InstructorSection