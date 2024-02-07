import React from 'react'
import { Link } from 'react-router-dom'
import {FiArrowRight} from "react-icons/fi"
import HighlightText from "../components/core/Homepage/HighlightText"
import CTAButton from "../components/core/Homepage/CTAButton"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import {FaArrowRightLong} from 'react-icons/fa6'
import TimeLineSection from '../components/core/Homepage/TimeLineSection'
import LeainingLanguages from '../components/core/Homepage/LeainingLanguages'
import InstructorSection from '../components/core/Homepage/InstructorSection'
import Footer from '../components/commen/Footer'
import ExploreMore from '../components/core/Homepage/ExploreMore'
import ReviewModal from '../components/commen/ReviewModal'
function Home() {
  return (
    <div className='w-full text-white font-Inter'>
     {/* section 1 */}
     <div className='text-white w-11/12 max-w-maxContent flex flex-col mx-auto items-center'>
         <Link to={"/signup"}>
         <div className='group w-fit text-center mt-16 p-1 bg-richblack-800
          text-richblack-200 animate-all duration-200 hover:scale-95 rounded-full border-b-[1px]'>
         <div className='flex flex-row items-center px-10 py-[5px] gap-2 
         group-hover:bg-richblack-900 rounded-full'>
         <p>Become an Instructor</p>
         <FiArrowRight/>
         </div>
         </div> 

         </Link>

         <div className='text-[36px] font-[600] mt-5'>
         Empower Your Future with 
         <HighlightText text={"Coding Skills"}/>
         </div>
        
        <div className='text-richblack-300 font-medium text-center text-lg mt-4 w-[90%] lg:w-[80%]'>
        With our online coding courses, you can learn at your own pace, from anywhere in the world,
        and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex flex-row gap-6 mt-8'>
          <CTAButton yellowflag={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton yellowflag={false} linkto={"/login"}>
            Book A Demo
          </CTAButton>

        </div>

        {/* video */}

        <div className='w-[90%] mx-3 my-12 videoShadow Blobshapebody relative z-10' >

          <video 
          autoPlay
          loop
         muted
         className='z-100'
          >
            <source src={Banner} type='video/mp4'/>
          </video>
        </div>

        {/* code blocks */}

        <CodeBlocks
          position ={"lg:flex-row"}
          bgshape ={true}
          title={
            <div className='text-[36px] text-richblack-5 font-bold'>
              Unlock your
              <HighlightText text={'coding potential'}/>  {' '}
              with our online courses
            </div>
          }
          subheading ={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          ctabtn1={
            {
              yellowflag:true,
              text:"Try it yourself →",
              linkto:"/signup"
            }
          }
          ctabtn2={
            {
              yellowflag:false,
              text:"Learn More",
              linkto:"/login"
            }
          }
          codeblocks ={`<!DOCTYPE html>\n<html>\nhead><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n /head>\n body>\n h1><ahref="/">Header</a> \n /h1\n nav><ahref="one/">One</a><ahref="two/">Two\n</a><ahref="three/">Three</a>\n /nav>`}

        />

        <CodeBlocks
          position ={"lg:flex-row-reverse"}
          bgshape = {false}
          title={
            <div className='text-[36px] text-richblack-5 font-bold'>
              Start
              <HighlightText text={'coding'}/>
              <br/>
              <HighlightText text={'in seconds'}/> 
            </div>
          }
          subheading ={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          ctabtn1={
            {
              yellowflag:true,
              text:"Continue Lesson →",
              linkto:"/signup"
            }
          }
          ctabtn2={
            {
              yellowflag:false,
              text:"Learn More",
              linkto:"/login"
            }
          }
          codeblocks ={`<!DOCTYPE html>\n<html>\nhead><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n /head>\n body>\n h1><ahref="/">Header</a> \n /h1\n nav><ahref="one/">One</a><ahref="two/">Two\n</a><ahref="three/">Three</a>\n /nav>`}

        />

        <div className='mt-[3rem] '>
          <div className='text-center text-[36px] font-semibold'>
            Unlock the 
            <HighlightText text={"Power of Code"}/>
          </div>
          <div className='text-center font-medium text-[16px] text-richblack-300'>
          Learn to Build Anything You Can Imagine
          </div>

          {/* explore more */}

          <ExploreMore/>
        </div>

     </div>
     
     {/* section 2 */}

     <div className='text-richblack-300 bg-pure-greys-5'>
        
        <div className='bgimage h-[320px] flex flex-col  items-center'>
        <div className='h-[150px]'>

        </div>
        <div className='flex flex-row gap-6 mx-auto w-11/12 max-w-maxContent justify-center'>
          <CTAButton yellowflag={true} linkto={"/signup"}>
            <div className='flex flex-row gap-3 items-center'>
              Explore full catlog
              <FaArrowRightLong/>
            </div>
          </CTAButton>

          <CTAButton yellowflag={false} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>

        </div>

        <div className='max-w-maxContent w-11/12 mt-16 mb-12 flex flex-col md:flex-row items-center gap-6 mx-auto'>

        <div className='text-4xl font-semibold text-richblack-900 md:w-[45%] md:ml-12'>
           Get the skills you need for A
           <HighlightText text={"job that is in demand"}/>
            
        </div>
        <div className='md:w-[45%] flex flex-col gap-12 items-start'>
            <div className='text-richblack-700 text-[16px] font-medium'>
            The modern StudyNotion is the dictates its own terms. 
            Today, to be a competitive specialist requires more than professional skills.
            </div>
            <CTAButton yellowflag={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
        </div>

        </div>
        
        <TimeLineSection/>
        <LeainingLanguages/>
     </div>

     {/* section 3 */}

     <div className='w-full bg-richblack-900'>
      <div className='max-w-maxContent w-11/12 mx-auto'>
        <InstructorSection/>
      </div>

      <div className='max-w-maxContent w-11/12 mx-auto'>
      <ReviewModal/>
      </div>
     </div>
     

     {/* footer  */}
      <Footer/>
    </div>
  )
}

export default Home