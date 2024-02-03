
import React, { useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import navlogo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { categories } from '../../servicess/apis';
import { apiConnector } from '../../servicess/apiConnector';
import { useDispatch, useSelector } from 'react-redux';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { ACCOUNT_TYPE } from '../../utils/constants';
import { setToken } from '../../slices/authSlice';
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { FaRegCircleUser } from "react-icons/fa6";

function Navbar() {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation();
    console.log(token)
    
    const dispatch = useDispatch()
    const matchRoute = (route) => {
        // console.log(route)
        return matchPath({path:route}, location.pathname);
    }
    const [subLinks,setSubLinks]=useState([]);
    const[loading,setLoading]=useState(false)
    const [loginModal,setLoginModal] = useState(false)
    useEffect(()=>{
         (async()=>{
            try{
                setLoading(true);
                const res = await apiConnector("GET",categories.CATEGORIES_API);
                setSubLinks(res.data.allCategory);
                console.log(res)
                
                
            }catch(error){
                console.log('error...could not fetch category')
            }
            setLoading(false)
         })()
    },[])
  return (
    <div className='flex h-14 z-[1000]  relative top-0 items-center justify-center border-b-[1px] border-b-richblack-700'>

    <div className='flex flex-row items-center justify-between w-11/12 max-w-maxContent'>
   
    <Link to={'/'}>
        <img src={navlogo} alt='logo' loading='lazy'
            className='md:w-[160px] h-[35px] md:h-[42px] w-[89px] '
        />
    </Link>
    
    <div>
        <ul className='flex flex-row gap-4'>
            {
               NavbarLinks.map((link,index)=>{
                return <li key={index} className='text-white'>
                    {
                        link.title === "Catalog" ? 
                           (<div className='relative flex items-center gap-2 group'>
                               <p>{link.title}</p>
                               <FaAngleDown  className='mt-2'/>
                               <div className='absolute bg-richblack-5 p-4 flex flex-col -top-8 right-0 lg:-right-[96px] duration-200 invisible  z-[9000]
                                translate-y-[70px]  text-black w-[140px] lg:w-[300px] group-hover:visible rounded-md'>
                                <div className='w-6 h-6 rotate-45 absolute bg-richblack-5 left-[62%] -top-3 '></div>
                                 {
                                  loading ? (
                                    <div>Loading...</div>
                                  ) : (
                                    <div className='flex flex-col'>
                                        {  subLinks.length ?
                                            (subLinks.map((link,index) =>{
                                             return   <Link key={index}
                                                to={`/category/${link.name.split(' ').join('-').toLowerCase()}`}
                                                >
                                                    <p className='hover:bg-richblack-25  font-medium p-2 rounded-md'>{link.name}</p>
                                                </Link>
                                            })) : (<></>)
                                        }
                                    </div>
                                  )
                                 }
                                
                                

                               </div>

                           </div>
                           )  : (
                             <Link to={link?.path}>
                                <p className={` md:block hidden ${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                    {link.title}
                                </p>
                                
                            </Link>
                           )
                    }
                </li>
               })
            }
        </ul>
    </div>

   <div className='flex flex-row items-center gap-x-3'>
    {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR &&(
            <Link to={'/dashboard/cart'} className='text-richblack-5 relative'>
                <AiOutlineShoppingCart size={28}/>
                {
                    totalItems > 0 &&( <span className=' flex items-center  justify-center absolute -top-3 left-1 bg-caribeangreen-300
                     font-bold text-richblack-900 rounded-full w-4 h-4'>
                    {totalItems} </span>)
                }
                
            </Link>
        ) }
   
   { (token === null) && (
            <Link to={'/login'}>
                <button className="rounded-[8px] hidden md:block border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">Log In</button>
            </Link>
        ) }
  

    {token === null && (
            <Link to={'/signup'}>
                <button className="rounded-[8px] hidden md:block border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">Sign Up</button>
            </Link>
        ) }

        {
            !token && (
                <div className='block md:hidden'
                onClick={()=>setLoginModal(!loginModal)}
                >
                        <FaRegCircleUser className='text-richblack-5 text-xl'/>
                        {
                            loginModal && (
                                <div className='flex flex-col gap-2 p-3 absolute top-8 rounded-lg bg-richblack-800 right-7'>
                                <Link to={'/login'}>
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">Log In</button>
                                </Link>
                                <Link to={'/signup'}>
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">Sign Up</button>
                                </Link>
                                <Link to={'/about'}>
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">About Us</button>
                                </Link>
                                <Link to={'/contact'}>
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">Contact Us</button>
                                </Link>
                                </div>
                            )
                        }
                </div>
            )
        }

    {
        user &&( <ProfileDropDown/>)
    }
   </div>

   
    </div>
    
    </div>
  )
}

export default Navbar