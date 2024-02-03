import React, { useEffect, useState } from 'react'
import  {sidebarLinks} from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SidebarLink from './SidebarLink'
import { logout } from '../../../servicess/operations/authApi'
import { VscSignOut } from 'react-icons/vsc'
import LogoutModal from '../../commen/LogoutModal'
function Sidebar() {

    const {user,loading:profileLoading} = useSelector((state)=> state.profile)
    const {loading:authLoading}= useSelector((state=> state.auth))

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutModal,setLogOutModal] = useState(null)
    useEffect(()=>{
        console.log(user);
    },[])
    if(profileLoading || authLoading){
        return (
            <div className='h-[calc(100vh- 3.5rem)] place-items-center min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800'>
                <div className='loader'> Loading ....</div>
            </div>
        )
    }
  return (
    <div className='min-w-[220px] md:min-h-[calc(100vh-3.5rem)] flex flex-row justify-center md:justify-start md:flex-col
      gap-3 bg-richblack-800 py-4 pr-6 md:pr-0 md:py-[30px] border-t-[1px] border-t-richblack-700'>
       <div className='flex flex-row  md:flex-col gap-[10px] '>
        {
            sidebarLinks.map((link)=>{
                if(link.type && user?.accountType !== link.type) return null;

                return (
                    <SidebarLink key={link.id} link={link} iconName = {link.icon}/>
                )
            })
        }
       </div>

       <div className='w-[190px] hidden md:block mx-auto h-[2px] bg-richblack-700'></div>

       
        <SidebarLink link={{name:"Setting", path:"/dashboard/setting"}}
        iconName="VscSettingsGear"
        />
        <button
          onClick={()=>{
            setLogOutModal({
                 text1:"Are you sure?",
                 text2:"You will be logged out of your account",
                 btn1:"Logout",
                 btn2:"cancel",
                 btn1Handler:()=> dispatch(logout(navigate)),
                 btn2Handler:()=> setLogOutModal(null),

            })
          }}
          className='flex gap-2  items-center  md:px-[30px]'
        >
        
            <VscSignOut className='text-lg text-richblack-300'/>
            <p className='text-richblack-300 md:block hidden text-[14px] font-medium'>Logout</p>
         
        </button>
        {
            logoutModal && <LogoutModal logoutModal={logoutModal}/>
        }
      
    </div>
  )
}

export default Sidebar