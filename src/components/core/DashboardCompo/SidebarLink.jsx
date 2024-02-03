import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom'

function SidebarLink({link ,iconName}) {
    const Icon = Icons[iconName]
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname)
    }
  return (
    <NavLink
    to={link.path} 
    className={`relative px-5 md:px-8 py-2  md:text-sm font-medium
     ${
        matchRoute(link.path) ? "bg-yellow-800 text-yellow-50":" bg-opacity-0 text-richblack-300"
     }
     transition-all duration-200
     `}
    >
     {/* left side border type  */}
     <span className={`h-full absolute left-0 top-0 bg-yellow-50 w-[3px]
                   ${matchRoute(link.path) ? "opacity-100":"opacity-0"}
                   `}></span>

                   <div className='flex items-center gap-x-2'>
                    <Icon className='text-xl md:text-lg'/>
                    <p className='text-richblack-300 md:block hidden text-[14px] font-medium'>{link.name}</p>
                   </div>
    </NavLink>
  )
}

export default SidebarLink