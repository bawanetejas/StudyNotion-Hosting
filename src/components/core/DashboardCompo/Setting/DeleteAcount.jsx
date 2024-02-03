import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../../../servicess/operations/Settingsapi';
import { useNavigate } from 'react-router-dom';
function DeleteAcount() {
    const {token}= useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    function clickHandler (){
        dispatch(deleteAccount(token,navigate));
    }
  return (
    <div className='p-[30px] mt-[100px] border-[1px] bg-pink-800 border-pink-700 rounded-md'> 
       <div className='flex flex-row gap-4 items-start justify-start'>
          <div className='flex items-center bg-pink-700 rounded-full justify-center aspect-square w-[80px]'>
            <RiDeleteBin6Line fill='pink-400' size={30}/>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-richblack-5 font-semibold text-xl'>Delete Account</p>
            <div className='text-richblack-100 text-[16px] '>
                <p>Would you like to delete account?</p>
                <p>This account may contain Paid Courses. Deleting your account is</p>
                <p>permanent and will remove all the contain associated with it.</p>
            </div>
            <div  onClick={clickHandler}
            className='text-pink-400 font-medium text-[18px] hover:cursor-pointer '>I want to delete my account.</div>
          </div>
       </div>
    </div>
  )
}

export default DeleteAcount