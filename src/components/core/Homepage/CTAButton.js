import React from 'react'
import { Link } from 'react-router-dom'
function CTAButton({children , linkto ,yellowflag}) {
  return (
    <Link to={linkto}>
    <div className={`px-[24px] py-[12px] rounded-md font-medium
        ${yellowflag ? "bg-yellow-50 text-black": "bg-richblack-800 text-white"} 
        hover:scale-95 transition-all duration-200
        border-b-[1px] border-r-[1px] border-[richblack-800]`}>
        {children}
    </div>

    </Link>
  )
}

export default CTAButton