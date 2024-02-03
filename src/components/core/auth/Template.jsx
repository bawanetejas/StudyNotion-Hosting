
import React, { useState } from 'react'
import {SignUp} from './SignUp'
import { Login } from './Login'
import frame from '../../../assets/Images/frame.png'
import { ACCOUNT_TYPE } from '../../../utils/constants'
function Template({title,description1,description2,formType,image}) {

  const [accountType,setaccountType] = useState("Student")

  return (
    <div >
        <div className='w-11/12 pt-[100px] max-w-maxContent mx-auto flex  flex-col-reverse items-center lg:flex-row justify-between '>
        {/* left side */}
        <div className='flex flex-col p-[32px]  md:w-[508px]'>
          <div className='font-semibold text-[30px] font-inter text-richblack-100'>{title}</div>
          <div className='text-18px font-normal font-inter text-richblack-100 w-full md:w-[444px]'>
            {description1}
          <span className='font-bold font-edu-sa text-[16px] text-blue-100'>{description2}</span>
          </div>

          <div className='flex flex-row gap-4 bg-richblack-800 p-[5px] rounded-full w-fit mt-[36px] font-medium' >
             <button onClick={()=>{setaccountType("Student")}} className={`${accountType === "Student" ?"bg-richblack-900 text-richblack-5":"text-richblack-200"}
                     py-[6px] px-[18px] rounded-full`}>Student</button>
             <button onClick={()=>{setaccountType("Instructor")}} className={`${accountType === "Instructor" ?"bg-richblack-900 text-richblack-5":"text-richblack-200"}
               py-[6px] px-[18px] rounded-full`}> Instructor </button>
          </div>

          {
            formType === "signup" ?( <SignUp accountType={accountType}/>) :(<Login/>)
          }
        </div>

        {/* image */}

        <div className='relative'>
           <img src={frame} alt='frame'
            className='relative top-6 '
           />
           <img src={image}  alt='frame'
            className='absolute top-0 -left-6'
           />
        </div>

        </div>
    </div>
  )
}

export default Template