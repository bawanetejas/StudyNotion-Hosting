import React from 'react'
import { FooterLink2 } from '../../data/footer-links'
import { Link } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { PiFacebookLogoFill } from "react-icons/pi";
import { PiGoogleLogoFill } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";




const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const  Plans = ["Paid memberships", "For students", "Business solutions"];

const Community = ["Forums", "Chapters", "Events"];


function Footer() {
  return (
    <div className='w-full bg-richblack-800 '>
      <div className='flex flex-col gap-3  max-w-maxContent w-11/12 items-center md:px-[120px] px-4  py-[52px] mx-auto'>
        <div className='flex flex-row flex-wrap lg:flex-nowrap gap-16 items-start justify-center w-full '>

        <div className='flex flex-row gap-4 md:gap-10'>
            
            {/* sec 1 */}
                <div className='flex flex-col gap-2 '>
                <img  src={logo} alt='logo' width={160} height={35}/>

                <div className='font-semibold text-[16px] font-inter text-richblack-100'>
                    Company
                </div>
                {

                  ['Abouts','Careers','Affiliates'].map((element ,i )=>{
                    return <Link to={element.toLowerCase()} key={i} className='text-richblack-400 font-normal text-[16px]'>{element}</Link>
                  }
                  
                  )
                }
                <div className='flex flex-row gap-2'>
                  <Link to={'www.facebook.com'}><PiFacebookLogoFill size={30}/></Link>
                  <Link to={'www.google.com'}><PiGoogleLogoFill size={30}/></Link>
                  <Link to={'www.twitter.com'}><RiTwitterXFill size={30}/></Link>
                  <Link to={'www.youtube.com'}><FaYoutube size={30}/></Link>
                </div>
                </div>
      {/* sec 2 */}
                <div className='flex flex-col gap-[36px]'>
                  <div className='font-semibold text-[16px] font-inter text-richblack-100'>
                    Company
                </div>
                <div className='flex flex-col gap-2 -mt-[1rem]'>
                  {
                    Resources.map((ele,i)=>{
                      return (
                        <div key={i} >
                          <Link to={ele.split(' ').join("-").toLowerCase()} className='text-richblack-400 font-normal text-[16px]'>{ele}</Link>
                        </div>
                      )
                    })
                  }
                </div>
                <div className='flex flex-col gap-2 '>
                  <div className='font-semibold text-[16px] font-inter text-richblack-100'>
                    Support
                  </div>
                  <p><Link to={'/help-center'} className='text-richblack-400 font-normal text-[16px]'>Help center</Link></p>
                </div>

                </div>
       
       {/* section 3 */}
        <div className='flex flex-col gap-[36px]'>
           <div className='flex flex-col gap-2'>
             <div className='font-semibold text-[16px] font-inter text-richblack-100'>Plans</div>
             <div className='flex flex-col gap-2'>
              {
                Plans.map((ele,i)=>{
                  return <Link key={i} to={ele.split(' ').join("-").toLowerCase()} 
                  className='text-richblack-400 font-normal text-[16px]'>{ele}</Link>
                })
              }
             </div>
           </div>
           
           <div className='flex flex-col gap-2'>
             <div className='font-semibold text-[16px] font-inter text-richblack-100'>Community</div>
             <div className='flex flex-col gap-2'>
              {
                Community.map((ele,i)=>{
                  return <Link key={i} to={ele.split(' ').join("-").toLowerCase()} 
                  className='text-richblack-400 font-normal text-[16px]'>{ele}</Link>
                })
              }
             </div>
           </div>

        </div>

        </div>
       {/* verticle line */}
        <div className='w-[1px] hidden lg:block h-[540px] bg-richblack-700'>
        </div>
         

        <div className='flex flex-row gap-8 md:gap-[64px] items-start'>

        {
          FooterLink2.map((element,index)=>{
            return <div key={index} className='flex flex-col gap-3'>
              <div className='font-semibold text-[16px] text-richblack-100'>
                {element.title}
              </div>
              <div className='flex flex-col gap-1'>
                {
                  element.links.map( (link ,index)=>{
                    return <div key={index} >
                      <Link to={link.link} className='text-[14px] font-medium font-inter leading-[22px] text-richblack-400'>{link.title}</Link>
                    </div>
                  }

                  )
                }
              </div>
            </div>
          })
        }

        </div>

       

        </div>
        {/* line */}
        <div className='w-full h-[1px] bg-richblack-700'>
         
        </div>
        {/* bottom */}
        <div className='flex flex-col gap-3 items-center md:justify-between w-full md:flex-row '>

        <div className='flex gap-2'>
          <p className='text-richblack-600 font-medium border-r-[1px] border-r-richblack-700 px-4'>Privacy Policy</p>
          <p className='text-richblack-600 font-medium border-r-[1px] border-r-richblack-700 px-4'>Cookie Policy</p>
          <p className='text-richblack-600 font-medium '>Terms</p>
        </div>
        <div className='text-richblack-600 font-medium flex items-center gap-2'>
          Made With <AiFillHeart color='red'/> @ 2023 Studynotion
        </div>

        </div>
      </div>
    </div>
  )
}

export default Footer