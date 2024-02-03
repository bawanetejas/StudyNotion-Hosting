import React from 'react'
import HighlightText from '../Homepage/HighlightText';
import { Link } from 'react-router-dom';
import    CTAButton from '../Homepage/CTAButton'


function LearningGrid() {
    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
      ];
      
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 lg:px-[120px] lg:py-[80px] text-white'>
        {
            LearningGridArray.map((data,i)=>{
                return (
                    <div
                    className={`${i === 0 && 'lg:col-span-2'}
                    ${data.order === 3 && "lg:col-start-2"}
                    ${
                        data.order % 2===0? "bg-richblack-700 h-[290px]":
                        data.order % 2 ===1? "bg-richblack-800 h-[290px]":"bg-transperant h-[290px]"
                    } p-[32px] 
                    `}
                    >
                    {
                        data.order < 0 ? (<div className='flex flex-col gap-1 items-start '>
                            <p className='text-[36px] leading-[44px] font-semibold text-richblack-5'>World Class Learning</p>
                            <p className='text-[36px] font-semibold'><HighlightText text={data.highlightText}/></p>
                            <p className='text-[16px] leading-[24px] text-richblack-300'>{data.description}</p>
                            <Link to={data.BtnLink}>
                                <CTAButton yellowflag={true}>
                                    {data.BtnText}
                                </CTAButton>
                            </Link>
                        </div>):(<div className='flex flex-col gap-[32px]'>
                            <p className='font-semibold text-[18px] text-richblack-5 leading-[26px]'>{data.heading}</p>
                            <p className='font-[400] leading-[22px] text-richblack-100 '>{data.description}</p>
                        </div>)
                    }
                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid