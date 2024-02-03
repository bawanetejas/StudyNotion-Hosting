import React, { useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import Publish from './PublishCourse/Publish'

export default function RenderStep() {

    const {step} = useSelector((state)=> state.course)

   

    const steps = [
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder",
        },
        {
            id:3,
            title:"Publish"
        }
    ]

  return (
    <>
        <div className='flex justify-center  items-center mb-6'>
    
    {
        steps.map((item)=>{
          return   <>
                <div className='flex  items-center'
                key={item.id}>

                        <div 
                        className={`flex items-center justify-center aspect-square w-[34px] rounded-full border-[1px]
                        ${
                            step === item.id ? 
                            " border-yellow-50 bg-yellow-900 text-yellow-50":
                            "border-richblack-700 bg-richblack-800 text-richblack-300"
                        } ${step > item.id && "bg-yellow-50 text-yellow-50"} `}>
                            {
                                step > item.id ? (
                                    <FaCheck className='font-bold text-richblack-900 '/>
                                ) : (
                                    item.id
                                )
                            }
                        </div>

                </div>

                {item.id !== steps.length && 
                <>
                    <div 
                    className={`h-[1px] w-[33%] border-dashed border-t-[2px] ${
                        step > item.id ? "border-yellow-50":"border-richblack-500"
                    }`}>

                    </div>
                </>
                }

                
            </>
        })
    }
    </div>

        {/* Render specific component based on the step */}
        {step === 1 && <CourseInformationForm/>}
        {step === 2 && <CourseBuilderForm/>}
        {step === 3 && <Publish/>}
    </>
  )
}
