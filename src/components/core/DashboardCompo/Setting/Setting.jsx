import React from 'react'
import ChangeProfileImage from './ChangeProfileImage'
import PersonalDetail from './PersonalDetail'
import ChangePassword from './ChangePassword'
import DeleteAcount from './DeleteAcount'
export const Setting = () => {
  return (
    <div className='flex flex-col gap-y-6 absolute z-10 w-full pb-10'>
    <p className='text-[36px] font-semibold text-richblack-5 '>Setting</p>

   {/* upload image */}
   <ChangeProfileImage/>

    {/* Personal detail */}
    <PersonalDetail/>

    {/* change password */}

    <ChangePassword/>

    {/* Delet account  */}
    <DeleteAcount/>
    </div>
  )
}
