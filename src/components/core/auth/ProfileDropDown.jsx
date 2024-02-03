import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../servicess/operations/authApi';
import useOnClickOutside from '../../../hooks/useOnclickOutside';
import { VscDashboard,VscSignOut} from 'react-icons/vsc'
function ProfileDropDown() {

    const {user}=useSelector((state)=>state.profile)
    const [open,setOpen] = useState(false);
    const ref = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useOnClickOutside(ref,()=>setOpen(false))
    if(!user) return null;
  return (
   <button onClick={()=>setOpen(true)} className='relative'>
          <div className='flex flex-row items-center'>
          
                <img src={user?.image}
                      alt={`profile-${user.firstName}`}
                      className='aspect-square w-[35px] rounded-full
                      object-cover'
                  />
           
            <IoMdArrowDropdown size={24} className="text-sm  text-richblack-100" />
          </div>
          {
            open && (
                 <div
                 onClick= {(e)=>e.stopPropagation()}
                className='absolute right-4 z-[5000] top-[118%] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'
                ref={ref}
                 >
                 <Link to='/dashboard/my-profile' onClick={()=>setOpen(false)}>
                 <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-5 hover:bg-richblack-700 hover:text-richblack-25">
                 <VscDashboard className="text-lg" />
                 Dashboard</div>
                 </Link>
                 <div 
                 onClick={
                        ()=>{
                            dispatch(logout(navigate))
                            setOpen(false);
                        }
                    }
                    className="flex w-full divide-y-[1px] divide-richblack-700 items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-5 hover:bg-richblack-700 hover:text-richblack-25"
                    > <VscSignOut className="text-lg" />
                    Logout
                 </div>

                 <Link to={'/about'}>
                    <button className="md:hidden block hover:bg-richblack-700 hover:text-richblack-25  px-[12px] py-[8px] text-richblack-5 w-full">About Us</button>
                </Link>
                <Link to={'/contact'}>
                    <button className="md:hidden block hover:bg-richblack-700 hover:text-richblack-25  px-[12px] py-[8px] text-richblack-5 w-full">Contact Us</button>
                </Link>
                 </div>

            )
          }
   </button>
  )
}

export default ProfileDropDown