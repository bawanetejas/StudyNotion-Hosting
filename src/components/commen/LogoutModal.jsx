import React from 'react'
import IconBtn from './IconBtn'
function LogoutModal({logoutModal}) {
  return (
    <div className='fixed z-[2000] text-white inset-0 backdrop-blur-sm place-items-center flex items-center justify-center  bg-white bg-opacity-10'>
         <div className='w-11/12 max-w-[350px] border border-richblack-400 bg-richblack-800 p-6 rounded-lg'>
            <p className='"text-2xl font-semibold text-richblack-5"'>{logoutModal.text1}</p> 
            <p className="mt-3 mb-5 leading-6 text-richblack-200"
            >{logoutModal.text2}</p>
            <div className='flex items-center gap-x-4'>
                <IconBtn
                onclick={logoutModal.btn1Handler}
                >{logoutModal.btn1}</IconBtn>
                <button
                 className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
                onClick={logoutModal.btn2Handler}
                >{logoutModal.btn2}</button>
            </div>      
         </div>
    </div>
  )
}

export default LogoutModal