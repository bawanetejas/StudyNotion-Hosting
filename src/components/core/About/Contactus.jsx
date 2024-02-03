import React from 'react'
import ConnectUs from './ConnectUs'
function Contactus() {
  return (
    <div className='w-full pt-[90px]  lg:px-[120px] flex flex-col gap-3 items-center'>
        <div>
        <h1 className='text-[36px] text-center text-richblack-5 -tracking-[2%] leading-[44px] font-semibold'>Get In Touch</h1>
        <p className='font-medium text-[16px] text-center text-richblack-500'>We’d love to here for you, Please fill out this form.</p>
        </div>

        <ConnectUs/>

    </div>
  )
}

export default Contactus